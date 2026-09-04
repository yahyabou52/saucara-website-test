import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const sharedProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M21 11.5a8.2 8.2 0 0 1-8.5 8.1 9.2 9.2 0 0 1-3.7-.8L3 20.5l1.7-5.4a8 8 0 1 1 16.3-3.6Z" />
      <path d="M8.5 9.5h7M8.5 13h4.5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...sharedProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
