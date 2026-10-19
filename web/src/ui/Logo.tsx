import type { CSSProperties } from "react";

export interface LogoProps {
  /** Height of the logo in px (default 32) */
  size?: number;
  /** Whether to show the "SealStone" text alongside the mark (default true) */
  showText?: boolean;
  /** Force 'white', 'dark', or 'auto' (adapts to current theme/ink color) */
  variant?: "auto" | "white" | "dark";
  className?: string;
  style?: CSSProperties;
}

/**
 * Official SealStone logo: faceted isometric stone with interlocking "S" seam + "SealStone" wordmark.
 * Uses high-DPI mask rendering with currentColor support so it perfectly matches any theme or background.
 */
export function SealStoneLogo({
  size = 32,
  showText = true,
  variant = "auto",
  className = "",
  style,
}: LogoProps) {
  // Full logo aspect ratio: 701w x 190h (~3.689)
  // Mark-only aspect ratio: 172w x 190h (~0.905)
  const width = showText ? Math.round(size * (701 / 190)) : Math.round(size * (172 / 190));
  const asset = showText ? "/sealstone-logo-white.png" : "/sealstone-mark-white.png";
  const darkAsset = showText ? "/sealstone-logo-dark.png" : "/sealstone-mark-dark.png";

  if (variant === "white") {
    return (
      <img
        src={asset}
        alt="SealStone"
        width={width}
        height={size}
        className={`sealstone-logo variant-white ${className}`}
        style={{
          height: size,
          width,
          objectFit: "contain",
          display: "inline-block",
          verticalAlign: "middle",
          ...style,
        }}
      />
    );
  }

  if (variant === "dark") {
    return (
      <img
        src={darkAsset}
        alt="SealStone"
        width={width}
        height={size}
        className={`sealstone-logo variant-dark ${className}`}
        style={{
          height: size,
          width,
          objectFit: "contain",
          display: "inline-block",
          verticalAlign: "middle",
          ...style,
        }}
      />
    );
  }

  // Variant auto: uses CSS mask with currentColor so it seamlessly matches the page's ink color
  return (
    <span
      className={`sealstone-logo ${className}`}
      role="img"
      aria-label="SealStone"
      style={{
        display: "inline-block",
        height: size,
        width,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${asset})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${asset})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

/**
 * Compact SealStone hexagonal mark alone.
 */
export function SealStoneMark({
  size = 28,
  variant = "auto",
  className = "",
  style,
}: Omit<LogoProps, "showText">) {
  return (
    <SealStoneLogo
      size={size}
      showText={false}
      variant={variant}
      className={className}
      style={style}
    />
  );
}

export default SealStoneLogo;
