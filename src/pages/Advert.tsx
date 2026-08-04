import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, ShoppingBag, Truck, CreditCard, Phone } from "lucide-react";
import vitafoamLogo from "@/assets/vitafoam-logo-1.svg";
import video1 from "@/assets/videos/video1.mp4";
import video2 from "@/assets/videos/video2.mp4";
import video3 from "@/assets/videos/video3.mp4";

const VIDEOS = [
  { src: video1, label: "Premium Comfort" },
  { src: video2, label: "Quality Craftsmanship" },
  { src: video3, label: "Better Sleep" },
];

const VideoPlayer = ({ src, label, index }: { src: string; label: string; index: number }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ref.current) return;
    ref.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-black shadow-2xl cursor-pointer" onClick={toggle}>
      <video
        ref={ref}
        src={src}
        className="w-full aspect-video object-cover"
        loop
        muted
        playsInline
        onEnded={() => setPlaying(false)}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      {/* Label */}
      <div className="absolute bottom-3 left-4 text-white font-semibold text-sm opacity-90">{label}</div>
      {/* Step badge */}
      <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center shadow">
        {index + 1}
      </div>
      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-200 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
          {playing
            ? <Pause className="h-6 w-6 text-white" />
            : <Play className="h-6 w-6 text-white ml-0.5" />
          }
        </div>
      </div>
      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
};

const Advert = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-body">
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
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIDEOS.map((v, i) => (
            <VideoPlayer key={i} src={v.src} label={v.label} index={i} />
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
