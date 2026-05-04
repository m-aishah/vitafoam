import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
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
    `Hi Multibiz.global Venture, I'd like to order:\n\n` +
    items.map((i, n) => `${n + 1}. ${i.name}\n   Size: ${formatSize(i.size)}\n   Qty: ${i.qty}\n   Subtotal: ${formatNaira(i.size.price * i.qty)}`).join("\n\n") +
    `\n\nGrand Total: ${formatNaira(total)} (7.5% VAT inclusive)\n\nPlease confirm availability and delivery.`;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto container-px">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Cart</span>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold">Your Cart</h1>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto container-px">
          {items.length === 0 ? (
            <div className="mx-auto max-w-md rounded-xl border border-dashed border-border p-12 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
              <h2 className="mt-4 font-display text-2xl text-primary">Your cart is empty</h2>
              <p className="mt-2 text-sm text-muted-foreground">Browse our premium mattress collection.</p>
              <Button asChild variant="navy" className="mt-6"><Link to="/shop">Shop Mattresses</Link></Button>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((i) => {
                  const key = `${i.productId}-${i.size.size}`;
                  return (
                    <div key={key} className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
                      <div className="flex-1">
                        <Link to={`/product/${i.productId}`} className="font-display text-xl font-semibold text-primary hover:text-accent transition-smooth">{i.name}</Link>
                        <div className="mt-1 text-sm text-muted-foreground">{formatSize(i.size)}</div>
                        <div className="mt-3 font-semibold text-primary">{formatNaira(i.size.price)} <span className="text-xs font-normal text-muted-foreground">/ unit · 7.5% VAT inclusive</span></div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-3 justify-between">
                        <div className="inline-flex items-center rounded-md border border-input">
                          <button onClick={() => updateQty(i.productId, i.size.size, Math.max(1, i.qty - 1))} className="h-10 w-10 text-primary hover:bg-secondary transition-smooth">−</button>
                          <span className="w-10 text-center font-semibold text-primary">{i.qty}</span>
                          <button onClick={() => updateQty(i.productId, i.size.size, i.qty + 1)} className="h-10 w-10 text-primary hover:bg-secondary transition-smooth">+</button>
                        </div>
                        <div className="font-display text-lg font-bold text-primary">{formatNaira(i.size.price * i.qty)}</div>
                        <button onClick={() => removeItem(i.productId, i.size.size)} className="text-destructive hover:text-destructive/80 transition-smooth p-2" aria-label="Remove">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => clearCart()}>Clear cart</Button>
                  <Button asChild variant="ghost"><Link to="/shop">Continue shopping</Link></Button>
                </div>
              </div>

              <aside>
                <div className="sticky top-28 rounded-xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-display text-2xl font-semibold text-primary">Order Summary</h3>
                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold text-primary">{formatNaira(total)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-primary">Calculated on WhatsApp</span></div>
                  </div>
                  <div className="mt-5 border-t border-border pt-4 flex items-end justify-between">
                    <span className="font-display text-lg text-primary">Total</span>
                    <div className="text-right">
                      <div className="font-display text-2xl font-bold text-primary">{formatNaira(total)}</div>
                      <div className="text-[11px] text-muted-foreground">7.5% VAT inclusive</div>
                    </div>
                  </div>
                  <Button asChild variant="gold" size="lg" className="mt-6 w-full h-12">
                    <a href={whatsappOrderUrl(message)} target="_blank" rel="noreferrer">
                      <WhatsAppIcon className="h-5 w-5" /> Checkout via WhatsApp
                    </a>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">Order is finalised in chat with our team.</p>
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
