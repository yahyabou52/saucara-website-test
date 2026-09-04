import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/content/site";

export function Faq() {
  return (
    <section id="faq" className="section-space faq">
      <div className="container-shell faq__grid">
        <div className="faq__intro">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title={
              <>
                Avant de nous <em>écrire.</em>
              </>
            }
            description="Les réponses opérationnelles sont des exemples pour ce prototype fictif. Elles devront être validées avant toute mise en ligne commerciale."
          />
        </div>

        <div className="faq__list">
          {faqs.map((faq, index) => (
            <details key={faq.question}>
              <summary>
                <span className="faq__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{faq.question}</span>
                <span className="faq__icon" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </summary>
              <div className="faq__answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
