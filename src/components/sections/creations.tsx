import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import { creations } from "@/content/site";

export function Creations() {
  return (
    <section id="creations" className="section-space creations">
      <div className="container-shell">
        <div className="creations__intro">
          <SectionHeading
            eyebrow="Créations signature"
            title={
              <>
                Un parti pris pour chaque <em>moment.</em>
              </>
            }
            description="Cinq pistes gourmandes pour imaginer votre propre composition — chaque exemple est fictif et présenté sans prix imposé."
          />
          <p className="creations__pricing">
            Chaque projet fait l’objet d’un devis selon le format et le décor.
          </p>
        </div>

        <div className="creations__grid">
          {creations.map((creation, index) => (
            <figure
              className={
                index === 0 ? "creation creation--featured" : "creation"
              }
              key={creation.name}
            >
              <div className="creation__image">
                <Image
                  src={creation.image}
                  alt={creation.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 767px) calc(100vw - 40px), 52vw"
                      : "(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 44vw, 370px"
                  }
                  className="object-cover"
                />
              </div>
              <figcaption className="creation__caption">
                <p className="creation__index">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="creation__occasion">{creation.occasion}</p>
                  <h3>{creation.name}</h3>
                  <p>{creation.description}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
