"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders a real, live iframe preview of a URL, scaled down to fit
 * whatever size container it's placed in. Used to show automatic desktop
 * and mobile previews of portfolio projects without needing manual
 * screenshots — any project with a "Live Website URL" gets one for free,
 * including new ones added later through the admin dashboard.
 *
 * Note: a small number of sites set headers (X-Frame-Options / CSP
 * frame-ancestors) that block being embedded in an iframe at all. There's
 * no reliable cross-origin way to detect that from the parent page, so in
 * that case the frame will simply render blank — the "Open live site"
 * link elsewhere on the card is the fallback for visitors in that case.
 */
export default function LiveSitePreview({
  url,
  viewport,
  className = "",
}: {
  url: string;
  viewport: "desktop" | "mobile";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const sourceWidth = viewport === "desktop" ? 1440 : 390;
  const sourceHeight = viewport === "desktop" ? 900 : 844;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.offsetWidth;
      if (width > 0) setScale(width / sourceWidth);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sourceWidth]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${sourceWidth} / ${sourceHeight}` }}
    >
      <iframe
        src={url}
        title="Live site preview"
        loading="lazy"
        scrolling="no"
        tabIndex={-1}
        className="pointer-events-none absolute left-0 top-0 border-0"
        style={{
          width: sourceWidth,
          height: sourceHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}
