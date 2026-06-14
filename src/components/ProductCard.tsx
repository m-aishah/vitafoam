import { Link } from "react-router-dom";
import { Product, formatNaira } from "@/lib/products";
import MattressIllustration from "./MattressIllustration";

export const ProductCard = ({ product }: { product: Product }) => {
  const min = product.sizes[0]?.price ?? 0;
  return (
    <div className="group border border-gray-200 rounded bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square flex items-center justify-center p-4">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        ) : (
          <MattressIllustration className="w-full" />
        )}
      </div>
      {/* Info */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">MATTRESS</p>
        <h3 className="font-display text-base font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.shortDesc}</p>
        <p className="text-sm text-gray-700 mb-4">
          FROM <span className="font-bold text-gray-900">{formatNaira(min)}</span>
        </p>
        <Link
          to={`/product/${product.id}`}
          className="block w-full text-center bg-[#1a1a1a] text-white text-xs font-bold py-2.5 rounded hover:bg-primary transition-colors uppercase tracking-wide"
        >
          SELECT OPTIONS
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
