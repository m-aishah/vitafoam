import { Link } from "react-router-dom";
import { useState } from "react";
import { Product, formatNaira } from "@/lib/products";
import MattressIllustration from "./MattressIllustration";
import { X, ShoppingCart } from "lucide-react";
import { addToCart } from "@/lib/cart";
import type { SizeOption } from "@/lib/products";
import { toast } from "@/hooks/use-toast";

function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(product.sizes[0]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    toast({ title: "Added to cart", description: `${product.name} — ${selectedSize.size}` });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10">
          <X className="h-4 w-4 text-gray-600" />
        </button>
        <div className="grid sm:grid-cols-2 gap-0">
          <div className="bg-gray-50 flex items-center justify-center p-8 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none min-h-[260px]">
            {product.image ? (
              <img src={product.image} alt={product.name} className="max-h-52 w-full object-contain" />
            ) : (
              <MattressIllustration className="w-full max-w-[200px]" />
            )}
          </div>
          <div className="p-6">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">MATTRESS</p>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{product.shortDesc}</p>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wide font-semibold">Size</p>
              <select
                value={selectedSize.size}
                onChange={(e) => setSelectedSize(product.sizes.find((s) => s.size === e.target.value)!)}
                className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:border-primary"
              >
                {product.sizes.map((s) => (
                  <option key={s.size} value={s.size}>{s.size} — {formatNaira(s.price)}</option>
                ))}
              </select>
            </div>

            <p className="text-2xl font-bold text-primary mb-5">{formatNaira(selectedSize.price)}</p>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 w-full h-11 bg-[#1a1a1a] text-white text-sm font-bold rounded hover:bg-primary transition-colors"
              >
                <ShoppingCart className="h-4 w-4" /> ADD TO CART
              </button>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="block w-full text-center border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded hover:border-primary hover:text-primary transition-colors"
              >
                VIEW FULL DETAILS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProductCard = ({ product }: { product: Product }) => {
  const min = product.sizes[0]?.price ?? 0;
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <div className="group border border-gray-200 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square flex items-center justify-center p-4">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          ) : (
            <MattressIllustration className="w-full transition-transform duration-300 group-hover:scale-105" />
          )}
          {/* Quick View overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-end justify-center pb-4">
            <button
              onClick={() => setShowQuickView(true)}
              className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 bg-white text-gray-900 text-xs font-bold px-5 py-2 rounded shadow-lg hover:bg-primary hover:text-white"
            >
              QUICK VIEW
            </button>
          </div>
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

      {showQuickView && <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />}
    </>
  );
};

export default ProductCard;
