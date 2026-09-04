import { ArrowUpRightIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { occasions } from "@/content/site";

export function Occasions() {
  return (
    <section id="occasions" className="section-space occasions">
      <div className="container-shell occasions__grid">
        <SectionHeading
          eyebrow="Pour se réunir"
          title={
            <>
              Une douceur pour les jours qui <em>comptent.</em>
            </>
          }
          description="La même attention, qu’il s’agisse d’un gâteau intime, d’une grande table ou d’un coffret à offrir."
        />

        <ul className="occasions__list">
          {occasions.map((occasion, index) => (
            <li key={occasion.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{occasion.title}</h3>
                <p>{occasion.text}</p>
              </div>
              <ArrowUpRightIcon className="size-6" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
