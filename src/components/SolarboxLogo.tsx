interface SolarboxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SolarboxLogo = ({ className = "", size = "md" }: SolarboxLogoProps) => {
  const heights = { sm: 26, md: 34, lg: 46 };
  const h = heights[size];
  const svgW = h * 3.8;
  const bFontSize = h * 0.84;
  const textFontSize = h * 0.34;

  return (
    <svg
      viewBox="0 0 340 100"
      width={svgW}
      height={h}
      preserveAspectRatio="xMinYMid meet"
      className={className}
      aria-label="SOLARBOX"
      role="img"
    >
      <g transform="translate(28, 50)">
        <path
          d="M 0,-14 A 14,14 0 0,0 0,14"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
        />
        {[
          { angle: 180, len: 28 },
          { angle: 150, len: 24 },
          { angle: 210, len: 24 },
          { angle: 135, len: 20 },
          { angle: 225, len: 20 },
          { angle: 120, len: 16 },
          { angle: 240, len: 16 },
        ].map(({ angle, len }, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 16;
          const y1 = Math.sin(rad) * 16;
          const x2 = Math.cos(rad) * len;
          const y2 = Math.sin(rad) * len;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--primary))"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      <text
        x="54"
        y="72"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontWeight="900"
        fontSize={bFontSize}
        letterSpacing="-0.8"
        style={{ fill: "hsl(var(--foreground))" }}
      >
        B
      </text>

      <text
        x="96"
        y="52"
        fontFamily="'Arial Black', 'Segoe UI', sans-serif"
        fontWeight="900"
        fontSize={textFontSize}
        letterSpacing="0.45"
        style={{ fill: "hsl(var(--foreground))" }}
      >
        <tspan>SOLAR</tspan>
        <tspan dx="5" fill="hsl(var(--primary))">
          BOX
        </tspan>
      </text>

      <line
        x1="96"
        y1="60"
        x2="258"
        y2="60"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        opacity="0.35"
      />
    </svg>
  );
};

export default SolarboxLogo;
