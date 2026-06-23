import { Link } from "react-router-dom";
import { formatNaira } from "@/lib/products";
import { GroupedShopItem } from "@/lib/catalog";
import MattressIllustration from "./MattressIllustration";

export const ProductCard = ({ item }: { item: GroupedShopItem }) => {
  const min = item.minPrice;

  return (
    <div className="group border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <div className="relative overflow-hidden bg-gray-50 aspect-square flex items-center justify-center p-4 rounded-t-2xl">
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        ) : (
          <MattressIllustration className="w-full transition-transform duration-300 group-hover:scale-105" />
        )}
      </div>
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.categoryLabel}</p>
        {item.grade && item.badgeClass && (
          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-lg mb-1.5 ${item.badgeClass}`}>{item.grade}</span>
        )}
        <h3 className="font-display text-base font-bold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.shortDesc}</p>
        <p className="text-sm text-gray-700 mb-4">
          {item.sizes.length > 1 ? "FROM " : ""}<span className="font-bold text-gray-900">{formatNaira(min)}</span>
        </p>
        <Link
          to={`/product/${item.id}`}
          className="block w-full text-center bg-[#1a1a1a] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-primary transition-colors uppercase tracking-wide"
        >
          SELECT OPTIONS
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
