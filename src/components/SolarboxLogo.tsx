import logoImage from "@/assets/sungpt-logo-transparent.png";

interface SolarboxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SolarboxLogo = ({ className = "", size = "md" }: SolarboxLogoProps) => {
  const widths = { sm: 100, md: 120, lg: 140 };
  const width = widths[size];

  return (
    <img
      src={logoImage}
      alt="Logo SOLARBOX"
      className={`block w-auto h-auto select-none ${className}`}
      style={{ width }}
      draggable={false}
    />
  );
};

export default SolarboxLogo;
