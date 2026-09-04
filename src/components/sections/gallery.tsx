import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import { gallery } from "@/content/site";

export function Gallery() {
  return (
    <section id="galerie" className="section-space gallery">
      <div className="container-shell">
        <div className="gallery__header">
          <SectionHeading
            eyebrow="Galerie"
            title={
              <>
                Matières, gestes, <em>détails.</em>
              </>
            }
            description="Une direction photographique de démonstration pour exprimer l’univers SAUCARA. Ces images de stock ne représentent pas des commandes réelles."
          />
          <p className="gallery__note">
            Photographies de démonstration · sources dans docs/ASSETS.md
          </p>
        </div>

        <div className="gallery__grid">
          {gallery.map((item, index) => (
            <figure
              className={`${item.className} ${
                index === 0 || index === 4 ? "casablanca-frame--gallery" : ""
              }`}
              key={item.caption}
            >
              <div className="gallery__image">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 50vw, 620px"
                  className="object-cover"
                />
              </div>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
