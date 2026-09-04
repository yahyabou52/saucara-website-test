import {
  ArrowUpRightIcon,
  ClockIcon,
  MapPinIcon,
  MessageIcon,
} from "@/components/icons";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container-shell">
        <div className="contact__header">
          <p className="eyebrow eyebrow--gold">Parlons de votre occasion</p>
          <h2>
            Votre prochaine célébration commence par quelques <em>détails.</em>
          </h2>
          <p>
            Préparez votre demande ici, ou ouvrez directement WhatsApp pour nous
            décrire votre projet.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__details">
            <WhatsAppLink variant="gold">
              Écrire directement sur WhatsApp
            </WhatsAppLink>

            <dl>
              <div>
                <dt>
                  <MapPinIcon className="size-5" />
                  Localisation
                </dt>
                <dd>
                  Casablanca · retrait sur rendez-vous
                  <span>Information fictive pour le prototype</span>
                </dd>
              </div>
              <div>
                <dt>
                  <ClockIcon className="size-5" />
                  Horaires de démonstration
                </dt>
                <dd>
                  Mardi–samedi · 10 h–18 h
                  <span>Fermé dimanche et lundi · horaires fictifs</span>
                </dd>
              </div>
              <div>
                <dt>
                  <MessageIcon className="size-5" />
                  Instagram
                </dt>
                <dd>
                  Compte à renseigner avant mise en ligne
                  <span>Aucun profil réel n’est lié dans ce prototype</span>
                </dd>
              </div>
            </dl>

            <a className="contact__back-link" href="#accueil">
              Retour en haut
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>

          <div className="contact__form-panel">
            <div className="contact__form-heading">
              <p className="eyebrow">Préparer la demande</p>
              <h3>Les essentiels, avant d’ouvrir WhatsApp.</h3>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
