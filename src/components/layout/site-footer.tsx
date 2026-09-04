import { ArrowUpRightIcon } from "@/components/icons";
import { navigation } from "@/content/site";

type SiteFooterProps = {
  linkPrefix?: string;
};

export function SiteFooter({ linkPrefix = "" }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container-shell">
        <div className="site-footer__top">
          <div>
            <a
              className="wordmark wordmark--footer"
              href={`${linkPrefix}#accueil`}
              aria-label="SAUCARA — retour en haut"
            >
              SAUCARA
            </a>
            <p className="site-footer__tagline">
              Gâteaux sur mesure et pâtisseries de réception à Casablanca.
            </p>
          </div>

          <nav aria-label="Navigation de pied de page">
            <ul className="site-footer__nav">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={`${linkPrefix}${item.href}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__links">
            <p>Instagram : compte de démonstration à renseigner</p>
            <a href={`${linkPrefix}#confidentialite`}>
              Confidentialité
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p id="confidentialite">
            Projet de démonstration — marque, coordonnées, horaires, politiques,
            photographies et témoignages fictifs. Aucune donnée saisie dans le
            formulaire n’est enregistrée par ce site.
          </p>
          <p>© 2026 SAUCARA — prototype non commercial.</p>
        </div>
      </div>
    </footer>
  );
}
