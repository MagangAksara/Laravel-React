// HeroClip.jsx
import React, { useId } from "react";

/**
 * HeroClip
 * - imageUrl: string (url gambar)
 * - height: tailwind height class (default "h-[500px]")
 *
 * Catatan:
 * - Komponen ini meng-embed SVG dengan viewBox 1935x921 (sesuai path yang kamu kasih).
 * - Gambar akan di-scale dengan preserveAspectRatio="xMidYMid slice" (mirip object-cover).
 */
export default function HeroClip({ imageUrl, height = "h-[650px]" }) {
  const id = useId(); // unik untuk clip + filter
  const clipId = `clip-${id}`;
  const filterId = `filter-${id}`;

  const img =
    imageUrl ??
    "https://images.unsplash.com/photo-1656685299734-52a0bb4425aa?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-white">
      <div className={`w-full ${height}`}>
        <svg
          className="w-full h-full"
          viewBox="0 0 1935 921"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Drop shadow filter */}
            <filter
              id={filterId}
              x="0"
              y="0"
              width="1935"
              height="921"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="50" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>

            {/* ClipPath */}
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path d="M1835 625H1073C1061.95 625 1053 633.954 1053 645V817H100V96H1835V625Z" />
            </clipPath>
          </defs>

          {/* Background with filter */}
          <g filter={`url(#${filterId})`}>
            <rect
              x="0"
              y="0"
              width="1935"
              height="921"
              fill="#D9D9D9"
              clipPath={`url(#${clipId})`}
            />
          </g>

          {/* Main image */}
          <image
            href={img}
            x="0"
            y="0"
            width="1935"
            height="921"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        </svg>
      </div>
    </section>
  );
}
