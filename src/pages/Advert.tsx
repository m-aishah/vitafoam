import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Play, Pause, Volume2, VolumeX, ShoppingBag, Truck, CreditCard, Phone } from "lucide-react";
import vitafoamLogo from "@/assets/vitafoam-logo-1.svg";

const SITE_URL = "https://vitafoammattress.com";
const OG_IMAGE = `${SITE_URL}/og-advert.jpg`;
const OG_TITLE = "Vitafoam Nigeria — Premium Mattresses, Free Delivery in Lagos & Ogun State";
const OG_DESC = "Shop Nigeria's most trusted mattress brand. Free delivery within Lagos & Ogun State. Pay via bank transfer: Zenith Bank · 1011040357 · Vitafoam Nig Plc.";
import video1 from "@/assets/videos/video1.mp4";
import video2 from "@/assets/videos/video2.mp4";
import video3 from "@/assets/videos/video3.mp4";

const VIDEOS = [video1, video2, video3];

const LABELS = ["Premium Comfort", "Quality Craftsmanship", "Better Sleep"];

const VideoPhone = ({ src, label, index, active, onActivate }: {
  src: string; label: string; index: number; active: boolean; onActivate: () => void;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); onActivate(); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ref.current) return;
    ref.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      className={`flex flex-col items-center gap-3 transition-all duration-300 ${active ? "scale-105 z-10" : "scale-95 opacity-75"}`}
      onClick={onActivate}
    >
      {/* Phone shell */}
      <div className="relative w-[200px] sm:w-[220px]" style={{ filter: active ? "drop-shadow(0 0 32px rgba(230,126,34,0.35))" : "none" }}>
        {/* Outer phone body */}
        <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-[36px] p-[10px] shadow-2xl border border-white/10">
          {/* Top notch bar */}
          <div className="flex items-center justify-center mb-1.5">
            <div className="w-16 h-1.5 bg-[#111] rounded-full" />
          </div>
          {/* Screen area */}
          <div className="relative rounded-[28px] overflow-hidden bg-black" style={{ aspectRatio: "9/19" }}>
            <video
              ref={ref}
              src={src}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              onEnded={() => setPlaying(false)}
            />
            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Label bottom */}
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <span className="text-white text-xs font-semibold drop-shadow">{label}</span>
            </div>

            {/* Play/Pause center */}
            <button
              onClick={toggle}
              className="absolute inset-0 flex items-center justify-center group/btn"
            >
              <div className={`h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-200 ${playing ? "opacity-0 group-hover/btn:opacity-100" : "opacity-100"}`}>
                {playing
                  ? <Pause className="h-5 w-5 text-white" />
                  : <Play className="h-5 w-5 text-white ml-0.5" />
                }
              </div>
            </button>

            {/* Mute top-right */}
            <button
              onClick={toggleMute}
              className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Bottom home indicator */}
          <div className="flex items-center justify-center mt-1.5">
            <div className="w-20 h-1 bg-white/20 rounded-full" />
          </div>
        </div>

        {/* Glow ring when active */}
        {active && (
          <div className="absolute inset-0 rounded-[36px] ring-2 ring-primary/60 pointer-events-none" />
        )}

        {/* Side buttons (decorative) */}
        <div className="absolute top-16 -left-[3px] w-[3px] h-8 bg-[#333] rounded-l-sm" />
        <div className="absolute top-28 -left-[3px] w-[3px] h-12 bg-[#333] rounded-l-sm" />
        <div className="absolute top-20 -right-[3px] w-[3px] h-14 bg-[#333] rounded-r-sm" />
      </div>

      {/* Number badge + label below phone */}
      <div className="flex items-center gap-2">
        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${active ? "bg-primary text-white" : "bg-white/10 text-gray-400"}`}>
          {index + 1}
        </div>
        <span className={`text-xs font-semibold transition-colors ${active ? "text-white" : "text-gray-500"}`}>{label}</span>
      </div>
    </div>
  );
};

const Advert = () => {
  const [activeVideo, setActiveVideo] = useState(1);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-body">
      <Helmet>
        <title>{OG_TITLE}</title>
        <meta name="description" content={OG_DESC} />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/advert`} />
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={OG_DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="2560" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="Vitafoam Nigeria — Start Your Day The Right Way" />
        <meta property="og:site_name" content="Vitafoam Nigeria" />
        <meta property="og:locale" content="en_NG" />

        {/* Twitter / X card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={OG_TITLE} />
        <meta name="twitter:description" content={OG_DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Vitafoam Nigeria — Start Your Day The Right Way" />

        {/* WhatsApp prefers og: tags above, but this helps */}
        <meta name="theme-color" content="#e67e22" />
      </Helmet>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/">
            <img src={vitafoamLogo} alt="Vitafoam" className="h-8 w-auto brightness-0 invert" />
          </Link>
          <Link
            to="/shop"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 h-9 rounded-xl transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop Now
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 pt-14 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            Limited Time Offer
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
            Sleep Better.<br />
            <span className="text-primary">Live Better.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Nigeria's most trusted mattress brand — now delivering premium comfort straight to your door.
          </p>

          {/* Free Delivery Badge */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mb-2">
            <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
              <Truck className="h-6 w-6 flex-shrink-0" />
              FREE DELIVERY
            </div>
            <div className="hidden sm:block h-5 w-px bg-white/20" />
            <div className="text-gray-300 text-sm font-medium">
              Within <span className="text-white font-bold">Lagos</span> &amp; <span className="text-white font-bold">Ogun State</span>
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-10 pb-16 overflow-hidden">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Watch Our Latest</p>
        <div className="flex items-end justify-center gap-4 sm:gap-8 px-4">
          {VIDEOS.map((src, i) => (
            <VideoPhone
              key={i}
              src={src}
              label={LABELS[i]}
              index={i}
              active={activeVideo === i}
              onActivate={() => setActiveVideo(i)}
            />
          ))}
        </div>
      </section>

      {/* Why Vitafoam */}
      <section className="bg-white/5 border-y border-white/10 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-8 text-white/80 uppercase tracking-widest text-sm">
            Why Vitafoam?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "🛏️", title: "50+ Years", sub: "of Nigerian excellence" },
              { icon: "✅", title: "Certified Quality", sub: "SON & ISO standards" },
              { icon: "🚚", title: "Free Delivery", sub: "Lagos & Ogun State" },
              { icon: "💬", title: "24/7 Support", sub: "WhatsApp & phone" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-3xl">{item.icon}</span>
                <p className="font-bold text-white text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Details */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-6 sm:p-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Bank Transfer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Ready to Order?</h2>

          <div className="bg-black/30 border border-white/10 rounded-2xl px-6 py-5 inline-block text-left mx-auto mb-6 w-full max-w-sm">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-semibold">Payment Details</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Bank</span>
                <span className="text-white font-bold text-sm">Zenith Bank</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Account Name</span>
                <span className="text-white font-bold text-sm">Vitafoam Nig Plc</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Account Number</span>
                <span className="text-primary font-bold text-xl tracking-widest">1011040357</span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-6">
            After payment, send your receipt &amp; delivery address via WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/2348053054348"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <Phone className="h-4 w-4" />
              WhatsApp Us
            </a>
            <Link
              to="/shop"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery note */}
      <section className="bg-green-500/10 border-t border-green-500/20 py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <Truck className="h-6 w-6 text-green-400 flex-shrink-0" />
          <p className="text-green-300 font-semibold text-sm sm:text-base">
            Enjoy <strong className="text-green-200">FREE delivery</strong> on all orders within Lagos and Ogun State
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-xs">
        <Link to="/">
          <img src={vitafoamLogo} alt="Vitafoam" className="h-7 w-auto brightness-0 invert opacity-40 mx-auto mb-3" />
        </Link>
        <p>&copy; {new Date().getFullYear()} Vitafoam Nigeria Plc. All rights reserved.</p>
        <p className="mt-1">
          <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            +234 805 305 4348
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Advert;
