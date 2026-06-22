export type GradeKey =
  | "Deluxe" | "Shine" | "Corona" | "Grand" | "Sizzler"
  | "Vita Haven" | "Supreme" | "Vita Galaxy Classic" | "Galaxy Orthopaedic"
  | "Vita Spring Flex" | "Vita Spring Firm" | "Twill Single" | "Twill Double"
  | "Vitaluxe" | "Vitahelix" | "Memory Topper";

export interface SizeOption {
  size: string;
  L: number;
  W: number;
  T: number;
  price: number;
}

export const W_TO_FT: Record<number, string> = {
  30: "2½'", 36: "3'", 42: "3½'", 48: "4'", 54: "4½'",
  60: "5'", 63: "5¼'", 71: "5'11\"", 72: "6'", 84: "7'",
};

export const L_TO_FT: Record<number, string> = {
  75: "6'", 79: "6½'", 84: "7'",
};

export function formatNaira(n: number): string {
  return "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatSize(s: SizeOption): string {
  const W = W_TO_FT[s.W] ?? `${s.W}"`;
  const L = L_TO_FT[s.L] ?? `${s.L}"`;
  return `${L} × ${W} × ${s.T}"`;
}

export function formatSizeShort(s: SizeOption): string {
  const W = W_TO_FT[s.W] ?? `${s.W}"`;
  return `${W} × ${s.T}"`;
}

export function calcDisplaySize(L: number, W: number, T: number): string {
  const w = W_TO_FT[W] ?? `${W}"`;
  const l = L_TO_FT[L] ?? `${L}"`;
  return `${l} × ${w} × ${T}"`;
}

export const GRADE_OPTIONS: GradeKey[] = [
  "Deluxe", "Shine", "Corona", "Grand", "Sizzler",
  "Vita Haven", "Supreme", "Vita Galaxy Classic",
  "Galaxy Orthopaedic", "Vita Spring Flex", "Vita Spring Firm",
  "Twill Single", "Twill Double", "Vitaluxe", "Vitahelix", "Memory Topper",
];

export const THICKNESS_OPTIONS = [3, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export const GRADE_SUFFIX: Record<GradeKey, string> = {
  Deluxe: "DE", Shine: "SH", Corona: "CP", Grand: "SG", Sizzler: "SS",
  "Vita Haven": "VH", Supreme: "VS", "Vita Galaxy Classic": "GS",
  "Galaxy Orthopaedic": "RQ", "Vita Spring Flex": "SX", "Vita Spring Firm": "SF",
  "Twill Single": "TS", "Twill Double": "TD", Vitaluxe: "VL", Vitahelix: "VX",
  "Memory Topper": "MT",
};

export const SUFFIX_TO_GRADE: Record<string, GradeKey> = Object.fromEntries(
  Object.entries(GRADE_SUFFIX).map(([k, v]) => [v, k as GradeKey])
) as Record<string, GradeKey>;

export const WHATSAPP_NUMBER = "2348053054348";

export function whatsappOrderUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
