import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div
      className={[
        "section-heading",
        align === "center" ? "section-heading--center" : "",
        inverse ? "section-heading--inverse" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? (
        <p className="section-description">{description}</p>
      ) : null}
    </div>
  );
}
