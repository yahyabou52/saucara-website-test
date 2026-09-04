import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/content/site";

export function Testimonials() {
  return (
    <section id="temoignages" className="section-space testimonials">
      <div className="container-shell">
        <div className="testimonials__header">
          <SectionHeading
            eyebrow="Voix de démonstration"
            title={
              <>
                Ce que l’expérience devrait <em>laisser.</em>
              </>
            }
            description="Les citations et les identités ci-dessous sont entièrement fictives. Elles servent uniquement à montrer la future présentation des retours clients."
          />
          <p className="demo-label">
            Contenu fictif — non publié comme avis réel
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.author}>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption>
                <span>{testimonial.author}</span>
                <span>{testimonial.occasion}</span>
                <span>Témoignage fictif</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
