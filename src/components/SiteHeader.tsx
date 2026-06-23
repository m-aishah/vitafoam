import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import vitafoamLogo from "@/assets/vitafoam-logo-1.svg";
import { cartCount } from "@/lib/cart";
import { getAllShopItems } from "@/lib/catalog";

const NAV_CATEGORIES = [
  { label: "MATTRESSES", cat: "mattress", to: "/shop?category=mattress" },
  { label: "TOPPERS", cat: "topper", to: "/shop?category=topper" },
  { label: "PILLOWS", cat: "pillow", to: "/shop?category=pillow" },
  { label: "BEDDING", cat: "bedding", to: "/shop?category=bedding" },
  { label: "LIFESTYLE", cat: "lifestyle", to: "/shop?category=lifestyle" },
  { label: "LEISURE", cat: "leisure", to: "/shop?category=leisure" },
  { label: "BABY & MOTHER", cat: "baby", to: "/shop?category=baby" },
];

const SEARCH_CATS = [
  { label: "All", value: "" },
  { label: "Mattress", value: "mattress" },
  { label: "Topper", value: "topper" },
  { label: "Pillow", value: "pillow" },
  { label: "Bedding", value: "bedding" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Leisure", value: "leisure" },
  { label: "Baby", value: "baby" },
];

export const SiteHeader = () => {
  const [count, setCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCat, setSearchCat] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<ReturnType<typeof getAllShopItems>>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const loc = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => { setMobileOpen(false); setSearchQuery(""); setSearchOpen(false); }, [loc.pathname]);

  useEffect(() => {
    if (searchQuery.trim().length < 2) { setSearchResults([]); setSearchOpen(false); return; }
    const q = searchQuery.toLowerCase();
    const results = getAllShopItems().filter((p) => {
      if (searchCat && p.category !== searchCat) return false;
      return p.name.toLowerCase().includes(q) || (p.grade ?? "").toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q);
    }).slice(0, 7);
    setSearchResults(results);
    setSearchOpen(results.length > 0);
  }, [searchQuery, searchCat]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchRef.current && !searchRef.current.contains(e.target as Node) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set("search", searchQuery.trim());
      if (searchCat) params.set("category", searchCat);
      navigate(`/shop?${params.toString()}`);
      setSearchOpen(false);
    }
  };

  const searchParams = new URLSearchParams(loc.search);
  const activeCat = loc.pathname === "/shop" ? (searchParams.get("category") ?? "") : "";

  const ResultsDropdown = () => (
    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
      {searchResults.map((p) => (
        <Link
          key={p.id}
          to={`/shop/${p.id}`}
          className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-primary/5 transition-colors text-sm border-b border-gray-100 last:border-0"
          onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
        >
          <div>
            <span className="font-semibold text-gray-900">{p.name}</span>
            {p.grade && <span className="ml-2 text-xs text-gray-400">{p.grade}</span>}
          </div>
          <span className="text-xs text-primary font-semibold capitalize flex-shrink-0">{p.categoryLabel}</span>
        </Link>
      ))}
      <button
        onClick={handleSearchSubmit}
        className="w-full px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/5 transition-colors text-left"
      >
        See all results for "{searchQuery}" →
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto container-px flex h-16 items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2" aria-label="Vitafoam Comfort Centre">
            <img src={vitafoamLogo} alt="Vitafoam" className="h-10 sm:h-12 w-auto" />
          </Link>

          {/* Desktop Search */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all bg-white">
                <select
                  value={searchCat}
                  onChange={(e) => setSearchCat(e.target.value)}
                  className="h-11 pl-3 pr-2 text-sm border-r border-gray-200 bg-gray-50 text-gray-600 focus:outline-none rounded-l-2xl"
                >
                  {SEARCH_CATS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for today?"
                  className="flex-1 h-11 px-3 text-sm focus:outline-none bg-transparent"
                />
                <button type="submit" className="h-11 w-11 flex items-center justify-center bg-primary text-white hover:bg-primary/90 transition-colors rounded-r-2xl flex-shrink-0">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {searchOpen && <ResultsDropdown />}
            </form>
          </div>

          {/* Right links */}
          <div className="hidden md:flex items-center gap-5 ml-auto text-sm font-semibold text-gray-700">
            <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">CONTACT</a>
            <Link to="/cart" className="flex items-center gap-1.5 hover:text-primary transition-colors" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              <span>CART / <span className="text-primary">₦{count > 0 ? count : "0.00"}</span></span>
              {count > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-white px-1 text-[11px] font-bold">
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile cart + hamburger */}
          <div className="flex items-center gap-3 md:hidden ml-auto">
            <Link to="/cart" className="relative text-gray-700" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">{count}</span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700" aria-label="Menu">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Black category nav */}
      <nav className="bg-[#1a1a1a] text-white hidden md:block relative">
        <div className="container mx-auto container-px">
          <ul className="flex items-center gap-0">
            {NAV_CATEGORIES.map((cat) => (
              <li key={cat.label}>
                <Link
                  to={cat.to}
                  className={`inline-block px-4 py-3 text-[13px] font-semibold tracking-wide transition-colors hover:text-primary ${
                    activeCat === cat.cat ? "text-primary border-b-2 border-primary" : "text-white"
                  }`}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-white border-t border-gray-200 md:hidden shadow-lg">
          {/* Mobile search */}
          <div className="p-3 border-b border-gray-100" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 h-11 px-4 text-sm focus:outline-none"
                />
                <button type="submit" className="h-11 w-11 flex items-center justify-center bg-primary text-white hover:bg-primary/90 transition-colors rounded-r-2xl flex-shrink-0">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {searchOpen && <ResultsDropdown />}
            </form>
          </div>
          <div className="py-2">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className={`block px-5 py-3 text-sm font-semibold border-b border-gray-50 hover:text-primary hover:bg-gray-50 ${activeCat === cat.cat ? "text-primary" : "text-gray-800"}`}
              >
                {cat.label}
              </Link>
            ))}
            <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="block px-5 py-3 text-sm font-semibold text-gray-800 hover:text-primary">
              CONTACT
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
