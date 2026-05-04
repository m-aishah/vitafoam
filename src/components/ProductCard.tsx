import { Link } from "react-router-dom";
import { Product, formatNaira } from "@/lib/products";
import MattressIllustration from "./MattressIllustration";
import { ArrowRight } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
  const min = product.sizes[0]?.price ?? 0;
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col rounded-xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative overflow-hidden rounded-t-xl bg-gradient-to-br from-primary-soft to-secondary p-6 aspect-[4/3] flex items-center justify-center">
        <span className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${product.badgeClass}`}>
          {product.grade}
        </span>
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-contain transition-smooth group-hover:scale-105" loading="lazy" />
        ) : (
          <MattressIllustration className="mt-6" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-primary">{product.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.shortDesc}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">From</div>
            <div className="font-display text-xl font-bold text-primary">{formatNaira(min)}</div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-smooth group-hover:gap-2.5">
            View Options <ArrowRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-wide text-muted-foreground">7.5% VAT inclusive</div>
      </div>
    </Link>
  );
};

export default ProductCard;
