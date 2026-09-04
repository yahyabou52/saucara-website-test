import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Bespoke } from "@/components/sections/bespoke";
import { Contact } from "@/components/sections/contact";
import { Creations } from "@/components/sections/creations";
import { Faq } from "@/components/sections/faq";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Occasions } from "@/components/sections/occasions";
import { OrderProcess } from "@/components/sections/order-process";
import { Testimonials } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="contenu-principal">
        <Hero />
        <Creations />
        <Bespoke />
        <OrderProcess />
        <Occasions />
        <Gallery />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
