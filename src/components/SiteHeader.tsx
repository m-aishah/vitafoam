import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { cartCount } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export const SiteHeader = () => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const update = () => setCount(cartCount());
    update();
    window.addEventListener("mbg-cart-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("mbg-cart-changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  const linkCls = (path: string) =>
    `font-body text-sm font-medium transition-smooth hover:text-accent ${
      loc.pathname === path ? "text-accent" : "text-primary"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto container-px flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Multibiz.global Venture — Better Sleep. Better Life. Everywhere.">
          <img src={logo} alt="Multibiz.global Venture — Better Sleep. Better Life. Everywhere." className="h-16 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkCls("/")}>Home</Link>
          <Link to="/shop" className={linkCls("/shop")}>Shop</Link>
          <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="font-body text-sm font-medium text-primary transition-smooth hover:text-accent">Contact</a>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-primary transition-smooth hover:bg-primary hover:text-primary-foreground" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden h-11 w-11" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto container-px flex flex-col py-3">
            <Link to="/" className="py-3 font-body font-medium text-primary">Home</Link>
            <Link to="/shop" className="py-3 font-body font-medium text-primary">Shop</Link>
            <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="py-3 font-body font-medium text-primary">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
