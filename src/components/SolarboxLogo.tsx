import logoImage from "@/assets/solarbox-logo-attached.jpeg";

interface SolarboxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SolarboxLogo = ({ className = "", size = "md" }: SolarboxLogoProps) => {
  const widths = { sm: 70, md: 82, lg: 100 };
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
