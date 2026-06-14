import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CartItem, cartTotal, clearCart, getCart, removeItem, updateQty } from "@/lib/cart";
import { formatNaira, formatSize, whatsappOrderUrl } from "@/lib/products";
import { ShoppingBag, Trash2 } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const refresh = () => setItems(getCart());
    refresh();
    window.addEventListener("mbg-cart-changed", refresh);
    return () => window.removeEventListener("mbg-cart-changed", refresh);
  }, []);

  const total = cartTotal(items);
  const message = items.length === 0 ? "" :
    `Hi Vitafoam Comfort Centre, I'd like to order:\n\n` +
    items.map((i, n) => `${n + 1}. ${i.name}\n   Size: ${formatSize(i.size)}\n   Qty: ${i.qty}\n   Subtotal: ${formatNaira(i.size.price * i.qty)}`).join("\n\n") +
    `\n\nGrand Total: ${formatNaira(total)} (7.5% VAT inclusive)\n\nPlease confirm availability and delivery.`;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Orange banner */}
      <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
        <h1 className="font-display text-3xl font-bold relative z-10">Cart</h1>
        <p className="mt-2 text-white/70 text-sm relative z-10">
          <Link to="/" className="hover:text-white">Home</Link>
          {" / "}
          <span>Cart</span>
        </p>
      </section>

      <section className="py-12 flex-1 bg-white">
        <div className="container mx-auto container-px">
          {items.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-600 mb-6">Your cart is currently empty.</p>
              <Link
                to="/shop"
                className="inline-block bg-[#1a1a1a] text-white text-sm font-bold px-8 py-3 rounded hover:bg-gray-800 transition-colors uppercase tracking-wide"
              >
                RETURN TO SHOP
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
              <div className="space-y-4">
                {items.map((i) => {
                  const key = `${i.productId}-${i.size.size}`;
                  return (
                    <div key={key} className="flex flex-col sm:flex-row gap-4 border border-gray-200 rounded p-5">
                      <div className="flex-1">
                        <Link to={`/product/${i.productId}`} className="font-bold text-gray-900 hover:text-primary transition-colors text-base">{i.name}</Link>
                        <div className="mt-1 text-sm text-gray-500">{formatSize(i.size)}</div>
                        <div className="mt-2 font-semibold text-gray-900">{formatNaira(i.size.price)} <span className="text-xs font-normal text-gray-400">/ unit · VAT incl.</span></div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-3 justify-between">
                        <div className="inline-flex items-center border border-gray-300 rounded">
                          <button onClick={() => updateQty(i.productId, i.size.size, Math.max(1, i.qty - 1))} className="h-9 w-9 text-gray-700 hover:bg-gray-100 transition-colors">−</button>
                          <span className="w-9 text-center font-semibold text-gray-900 text-sm">{i.qty}</span>
                          <button onClick={() => updateQty(i.productId, i.size.size, i.qty + 1)} className="h-9 w-9 text-gray-700 hover:bg-gray-100 transition-colors">+</button>
                        </div>
                        <div className="font-bold text-gray-900">{formatNaira(i.size.price * i.qty)}</div>
                        <button onClick={() => removeItem(i.productId, i.size.size)} className="text-gray-400 hover:text-red-500 transition-colors p-1" aria-label="Remove">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between pt-2">
                  <button onClick={() => clearCart()} className="text-sm text-gray-500 hover:text-red-500 transition-colors">Clear cart</button>
                  <Link to="/shop" className="text-sm text-gray-500 hover:text-primary transition-colors">Continue shopping</Link>
                </div>
              </div>

              {/* Order summary */}
              <aside>
                <div className="sticky top-36 border border-gray-200 rounded p-6">
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-5">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-semibold text-gray-900">{formatNaira(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivery</span>
                      <span className="text-gray-600">Confirmed on WhatsApp</span>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <div className="text-right">
                      <div className="font-bold text-xl text-gray-900">{formatNaira(total)}</div>
                      <div className="text-[11px] text-gray-400">7.5% VAT inclusive</div>
                    </div>
                  </div>
                  <a
                    href={whatsappOrderUrl(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 w-full h-11 bg-[#25D366] text-white text-sm font-bold rounded hover:bg-[#1fba59] transition-colors uppercase tracking-wide"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> CHECKOUT VIA WHATSAPP
                  </a>
                  <p className="mt-2 text-center text-xs text-gray-400">Order is finalised in chat with our team.</p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Cart;
