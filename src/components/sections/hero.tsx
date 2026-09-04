import Image from "next/image";

import { ArrowDownIcon } from "@/components/icons";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="container-shell hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero-enter hero-enter--one">
            Studio pâtissier · Casablanca
          </p>
          <h1 className="hero-enter hero-enter--two">
            Des gâteaux qui prennent la forme de <em>vos célébrations.</em>
          </h1>
          <p className="hero__lead hero-enter hero-enter--three">
            SAUCARA imagine des gâteaux sur mesure et des pâtisseries de
            réception selon votre occasion, vos envies et le nombre de convives.
          </p>
          <div className="hero__actions hero-enter hero-enter--four">
            <WhatsAppLink>Décrire mon projet</WhatsAppLink>
            <a className="text-link" href="#creations">
              Découvrir les créations
              <ArrowDownIcon className="size-4" />
            </a>
          </div>
          <p className="hero__note hero-enter hero-enter--four">
            Une demande ouvre la discussion ; disponibilité et devis restent à
            confirmer.
          </p>
        </div>

        <figure className="hero__visual hero-enter hero-enter--three">
          <div className="casablanca-frame">
            <Image
              src={hero.image}
              alt={hero.alt}
              fill
              preload
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 55vw, 690px"
              className="object-cover"
            />
          </div>
          <figcaption>
            Direction visuelle de démonstration · photographie de stock
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
