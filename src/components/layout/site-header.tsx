import { MobileMenu } from "@/components/layout/mobile-menu";
import { navigation } from "@/content/site";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";

type SiteHeaderProps = {
  linkPrefix?: string;
};

export function SiteHeader({ linkPrefix = "" }: SiteHeaderProps) {
  const whatsappUrl = getDefaultWhatsAppUrl();

  return (
    <header className="site-header">
      <div className="container-shell site-header__inner">
        <a
          className="wordmark"
          href={`${linkPrefix}#accueil`}
          aria-label="SAUCARA — accueil"
        >
          SAUCARA
        </a>

        <nav className="desktop-navigation" aria-label="Navigation principale">
          <ul>
            {navigation.slice(0, 5).map((item) => (
              <li key={item.href}>
                <a href={`${linkPrefix}${item.href}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className="header-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className="header-cta__short">WhatsApp</span>
          <span className="header-cta__long">Demander sur WhatsApp</span>
          <span className="sr-only"> — ouvre un nouvel onglet</span>
        </a>

        <MobileMenu
          navigation={navigation}
          whatsappUrl={whatsappUrl}
          linkPrefix={linkPrefix}
        />
      </div>
    </header>
  );
}
