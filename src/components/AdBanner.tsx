"use client";

import { useEffect, useState } from "react";

interface AdBannerProps {
  slotId: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export function AdBanner({ slotId, format = "auto", className = "" }: AdBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsLoaded(true);
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [slotId]);

  // Determine fixed heights to prevent CLS
  let minHeightClass = "min-h-[250px]";
  if (format === "horizontal") minHeightClass = "min-h-[90px] md:min-h-[120px]";
  if (format === "vertical") minHeightClass = "min-h-[600px]";
  
  return (
    <div 
      className={`w-full overflow-hidden bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative ${minHeightClass} ${className}`}
      aria-hidden="true"
    >
      {/* Empty State / Fallback UI */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 text-sm">
          <div className="w-8 h-8 mb-2 rounded-full border-2 border-white/10 border-t-white/30 animate-spin" />
          <span>Advertisement</span>
        </div>
      )}
      
      {/* Google AdSense ins Tag */}
      <ins
        className="adsbygoogle w-full h-full block"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8131387574460691"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
