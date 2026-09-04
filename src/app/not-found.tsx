import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ArrowUpRightIcon } from "@/components/icons";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <SiteHeader linkPrefix="/" />
      <main id="contenu-principal" className="not-found">
        <div className="container-shell not-found__inner">
          <p className="eyebrow">Erreur 404</p>
          <h1>
            Cette page n’est pas encore <em>dressée.</em>
          </h1>
          <p>
            Le lien demandé ne mène à aucune page de ce prototype. Retrouvez les
            créations ou préparez directement votre demande.
          </p>
          <div className="not-found__actions">
            <Link className="button-primary" href="/">
              Revenir à l’accueil
              <ArrowUpRightIcon className="size-4" />
            </Link>
            <WhatsAppLink variant="outline">Ouvrir WhatsApp</WhatsAppLink>
          </div>
        </div>
      </main>
      <SiteFooter linkPrefix="/" />
    </>
  );
}
