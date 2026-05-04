import { cn } from "@/lib/utils";

interface MattressIllustrationProps {
  className?: string;
  accent?: string; // tailwind text color for accent stripe (uses currentColor for main)
}

export const MattressIllustration = ({ className, accent }: MattressIllustrationProps) => (
  <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-auto", className)} aria-hidden>
    <defs>
      <linearGradient id="mattTop" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#eef0f6" />
      </linearGradient>
      <linearGradient id="mattSide" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="hsl(226 56% 24%)" />
        <stop offset="100%" stopColor="hsl(226 56% 16%)" />
      </linearGradient>
    </defs>
    {/* shadow */}
    <ellipse cx="200" cy="220" rx="170" ry="10" fill="hsl(226 56% 24% / 0.15)" />
    {/* base */}
    <path d="M30 170 L370 170 L350 210 L50 210 Z" fill="url(#mattSide)" />
    {/* top */}
    <path d="M30 170 Q30 110 80 100 L320 100 Q370 110 370 170 Z" fill="url(#mattTop)" stroke="hsl(226 20% 80%)" strokeWidth="1.5" />
    {/* tufts */}
    {[80, 140, 200, 260, 320].map((x) => (
      <circle key={x} cx={x} cy="135" r="3.5" fill="hsl(226 30% 70%)" />
    ))}
    {/* accent piping */}
    <path d="M30 170 Q30 110 80 100 L320 100 Q370 110 370 170" fill="none" stroke={accent || "hsl(43 62% 45%)"} strokeWidth="3" />
  </svg>
);

export default MattressIllustration;
