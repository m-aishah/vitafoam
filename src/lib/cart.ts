import { Product, SizeOption } from "./products";

export interface CartItem {
  productId: string;
  grade: string;
  name: string;
  size: SizeOption;
  qty: number;
}

const KEY = "mbg_cart_v1";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("mbg-cart-changed"));
}

export function getCart(): CartItem[] { return read(); }

export function addToCart(product: Product, size: SizeOption, qty = 1) {
  const items = read();
  const key = `${product.id}-${size.size}`;
  const idx = items.findIndex((i) => `${i.productId}-${i.size.size}` === key);
  if (idx >= 0) items[idx].qty += qty;
  else items.push({ productId: product.id, grade: product.grade, name: product.name, size, qty });
  write(items);
}

export function updateQty(productId: string, sizeKey: string, qty: number) {
  const items = read().map((i) => `${i.productId}-${i.size.size}` === `${productId}-${sizeKey}` ? { ...i, qty } : i).filter((i) => i.qty > 0);
  write(items);
}

export function removeItem(productId: string, sizeKey: string) {
  write(read().filter((i) => `${i.productId}-${i.size.size}` !== `${productId}-${sizeKey}`));
}

export function clearCart() { write([]); }

export function cartTotal(items: CartItem[] = read()): number {
  return items.reduce((s, i) => s + i.size.price * i.qty, 0);
}

export function cartCount(items: CartItem[] = read()): number {
  return items.reduce((s, i) => s + i.qty, 0);
}
