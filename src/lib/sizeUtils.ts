const W_TO_FT: Record<number, string> = {
  30: "2½'", 36: "3'", 42: "3½'", 48: "4'", 54: "4½'",
  60: "5'", 63: "5¼'", 71: "5'11\"", 72: "6'", 84: "7'",
};
const L_TO_FT: Record<number, string> = {
  75: "6'", 79: "6½'", 84: "7'",
};

export function widthFt(w: number): string { return W_TO_FT[w] ?? `${w}"`; }
export function lengthFt(l: number): string { return L_TO_FT[l] ?? `${l}"`; }
export function formatMattressSize(L: number, W: number, T: number): string {
  return `${lengthFt(L)} × ${widthFt(W)} × ${T}"`;
}

const BEDDING_NAMES: Record<string, string> = {
  "75x30": "Single", "75x36": "Standard", "75x42": "Double",
  "75x54": "Queen", "75x72": "King", "84x72": "King Long", "84x84": "Super King",
};
export function beddingSizeKey(L: number, W: number): string { return `${L}x${W}`; }
export function beddingSizeName(L: number, W: number): string {
  return BEDDING_NAMES[beddingSizeKey(L, W)] ?? `${lengthFt(L)} × ${widthFt(W)}`;
}
export function formatBeddingSize(L: number, W: number): string {
  const name = beddingSizeName(L, W);
  return `${name} (${widthFt(W)} × ${lengthFt(L)})`;
}
