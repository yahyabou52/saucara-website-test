import { SectionHeading } from "@/components/ui/section-heading";
import { orderSteps } from "@/content/site";

export function OrderProcess() {
  return (
    <section id="commande" className="section-space order-process">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Comment commander"
          title={
            <>
              De votre idée au <em>jour J.</em>
            </>
          }
          description="Quatre étapes simples. La commande reste ouverte à la discussion jusqu’à la validation des disponibilités et des modalités."
        />

        <ol className="order-process__list">
          {orderSteps.map((step) => (
            <li key={step.number}>
              <p className="order-process__number">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
