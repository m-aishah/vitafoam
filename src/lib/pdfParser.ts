import * as pdfjsLib from "pdfjs-dist";
// @ts-ignore
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  CatalogFile,
  RawProduct,
  GRADE_SUFFIX,
  SUFFIX_TO_GRADE,
  GradeKey,
} from "./products";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const INCH_FT: Record<number, string> = {
  30: "2½ft", 36: "3ft", 42: "3½ft", 48: "4ft", 54: "4½ft",
  60: "5ft", 72: "6ft", 75: "6¼ft", 79: "6½ft", 84: "7ft",
};

function fmtMoney(n: number): string {
  return "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function buildDisplaySize(L: number, W: number, T: number) {
  const w = INCH_FT[W] || `${W}"`;
  const l = INCH_FT[L] || `${L}"`;
  return `${w} × ${l} × ${T} inches`;
}

const SUFFIXES = Object.values(GRADE_SUFFIX);
// Pattern: M + digits + suffix + thickness digits (e.g. M1CP8, M62DE6)
const CODE_RE = new RegExp(
  `\\b([A-Z]?\\d{1,3}(?:${SUFFIXES.join("|")})\\d{1,2})\\b`,
  "g"
);
const DIM_RE = /(\d{2,3})\s*[xX]\s*(\d{2,3})\s*[xX]\s*(\d{1,2})\s*(?:''|"|in)?/g;
const PRICE_RE = /\b(\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?|\d{4,7}(?:\.\d{1,2})?)\b/g;

export async function parsePriceListPdf(file: File): Promise<CatalogFile> {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;

  // Collect all text tokens with positions across pages
  const allTokens: { str: string; x: number; y: number; page: number }[] = [];
  const maxPages = Math.min(pdf.numPages, 5);
  for (let p = 1; p <= maxPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    for (const item of content.items as any[]) {
      const s = (item.str || "").trim();
      if (!s) continue;
      allTokens.push({
        str: s,
        x: item.transform[4],
        y: item.transform[5],
        page: p,
      });
    }
  }

  // Group tokens into lines per page (by similar y)
  const products: RawProduct[] = [];
  const seen = new Set<string>();

  const pages = new Map<number, typeof allTokens>();
  for (const t of allTokens) {
    if (!pages.has(t.page)) pages.set(t.page, []);
    pages.get(t.page)!.push(t);
  }

  // Also try a flat-text fallback
  const flatText = allTokens.map((t) => t.str).join(" ");

  // Strategy: for every code match, look for nearby dim + price in surrounding window
  const codeMatches: { code: string; idx: number }[] = [];
  let m: RegExpExecArray | null;
  const codeRe = new RegExp(CODE_RE.source, "g");
  while ((m = codeRe.exec(flatText)) !== null) {
    codeMatches.push({ code: m[1], idx: m.index });
  }

  for (const cm of codeMatches) {
    const code = cm.code;
    if (seen.has(code)) continue;

    // Determine grade suffix and thickness from code
    const suffixMatch = SUFFIXES.find((s) => code.includes(s));
    if (!suffixMatch) continue;
    const grade = SUFFIX_TO_GRADE[suffixMatch] as GradeKey;
    const tMatch = code.match(new RegExp(`${suffixMatch}(\\d{1,2})$`));
    const thickness = tMatch ? parseInt(tMatch[1], 10) : 0;

    // Look in a window around the code for a dimension and price
    const window = flatText.slice(Math.max(0, cm.idx - 80), cm.idx + 80);

    const dimRe = new RegExp(DIM_RE.source, "g");
    let dim: RegExpExecArray | null;
    let chosenDim: { L: number; W: number; T: number } | null = null;
    while ((dim = dimRe.exec(window)) !== null) {
      const L = parseInt(dim[1], 10);
      const W = parseInt(dim[2], 10);
      const T = parseInt(dim[3], 10);
      if (T === thickness || thickness === 0) {
        chosenDim = { L, W, T };
        break;
      }
    }
    if (!chosenDim) continue;

    // Find price after the code position within window
    const afterCode = flatText.slice(cm.idx + code.length, cm.idx + 120);
    const priceRe = new RegExp(PRICE_RE.source, "g");
    let priceVal = 0;
    let pm: RegExpExecArray | null;
    while ((pm = priceRe.exec(afterCode)) !== null) {
      const val = parseFloat(pm[1].replace(/,/g, ""));
      if (!isNaN(val) && val > 1000 && val < 100000000) {
        priceVal = val;
        break;
      }
    }
    if (priceVal <= 0) continue;

    seen.add(code);
    const ds = buildDisplaySize(chosenDim.L, chosenDim.W, chosenDim.T);
    products.push({
      code,
      grade,
      gradeSuffix: suffixMatch,
      dimensionRaw: `${chosenDim.L} x ${chosenDim.W} x ${chosenDim.T}''`,
      lengthInches: chosenDim.L,
      widthInches: chosenDim.W,
      thicknessInches: chosenDim.T,
      price: priceVal,
      displaySize: ds,
      displayLabel: `${ds}, ${fmtMoney(priceVal)}`,
    });
  }

  return {
    lastUpdated: new Date().toISOString(),
    uploadedFileName: file.name,
    totalProducts: products.length,
    products,
  };
}

export function formatLastUpdated(iso: string | null): string {
  if (!iso) return "Never";
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
}
