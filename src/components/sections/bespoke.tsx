import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { bespokeChoices } from "@/content/site";

export function Bespoke() {
  return (
    <section id="sur-mesure" className="bespoke">
      <div className="container-shell bespoke__grid">
        <div className="bespoke__intro">
          <p className="eyebrow eyebrow--gold">Votre gâteau, sur mesure</p>
          <h2>
            Une idée devient une composition qui vous <em>ressemble.</em>
          </h2>
          <p>
            Une image peut lancer la conversation. Nous la traduisons en une
            proposition originale, adaptée au nombre de convives, à l’ambiance
            et au rythme de votre événement.
          </p>
          <WhatsAppLink variant="gold">Commencer ma demande</WhatsAppLink>
        </div>

        <div className="bespoke__choices">
          {bespokeChoices.map((choice, index) => (
            <article key={choice.title}>
              <p className="bespoke__number">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3>{choice.title}</h3>
                <p>{choice.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
