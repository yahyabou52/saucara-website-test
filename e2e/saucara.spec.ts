import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function expectNoAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(
    results.violations,
    results.violations
      .map(
        (violation) =>
          `${violation.id}: ${violation.description} (${violation.nodes.length})`,
      )
      .join("\n"),
  ).toEqual([]);
}

test("renders the complete French experience without broken local content", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle(/SAUCARA.*Casablanca/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Des gâteaux qui prennent la forme",
  );

  for (const id of [
    "accueil",
    "creations",
    "sur-mesure",
    "commande",
    "occasions",
    "galerie",
    "temoignages",
    "faq",
    "contact",
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }

  const images = page.locator("img");
  const imageCount = await images.count();
  expect(imageCount).toBeGreaterThanOrEqual(9);
  for (let index = 0; index < imageCount; index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        images.nth(index).evaluate((image) => ({
          complete: (image as HTMLImageElement).complete,
          width: (image as HTMLImageElement).naturalWidth,
        })),
      )
      .toMatchObject({ complete: true, width: expect.any(Number) });
  }
  const imageResults = await images.evaluateAll((loadedImages) =>
    loadedImages.map((image) => ({
      alt: image.getAttribute("alt"),
      complete: (image as HTMLImageElement).complete,
      width: (image as HTMLImageElement).naturalWidth,
    })),
  );
  expect(imageResults.every(({ alt }) => Boolean(alt?.trim()))).toBe(true);
  expect(
    imageResults.every(({ complete, width }) => complete && width > 0),
  ).toBe(true);

  const fragmentTargets = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    );
  expect(fragmentTargets.length).toBeGreaterThan(0);
  for (const href of fragmentTargets) {
    expect(href).not.toBe("#");
    await expect(page.locator(href)).toHaveCount(1);
  }

  const whatsappLinks = page.locator('a[href^="https://wa.me/"]');
  expect(await whatsappLinks.count()).toBeGreaterThanOrEqual(4);
  for (const link of await whatsappLinks.all()) {
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^https:\/\/wa\.me\/(?:\d+)?\?text=/);
    const message = new URL(href as string).searchParams.get("text") ?? "";
    expect(message).toContain("Bonjour SAUCARA");
    expect(message).toContain("création pâtissière");
    expect(message).toContain("Casablanca");
  }

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /SAUCARA/,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "http://localhost:3000",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /^http:\/\/localhost:3000\/opengraph-image/,
  );
  await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );

  await expectNoAccessibilityViolations(page);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("supports keyboard navigation, mobile menu, FAQ and enquiry preparation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const menuButton = page.locator(".mobile-menu__toggle");
  await expect(menuButton).toBeVisible();
  await expect(menuButton).toHaveAccessibleName("Ouvrir le menu");
  await menuButton.focus();
  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(menuButton).toHaveAccessibleName("Fermer le menu");
  await expect(
    page.getByRole("navigation", { name: "Navigation mobile" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toHaveAccessibleName("Ouvrir le menu");
  await expect(menuButton).toBeFocused();

  const firstQuestion = page.locator("#faq details").first();
  const firstSummary = firstQuestion.locator("summary");
  await firstSummary.focus();
  await page.keyboard.press("Enter");
  await expect(firstQuestion).toHaveAttribute("open", "");

  await page.getByRole("button", { name: "Préparer mon message" }).click();
  const errorSummary = page.getByRole("alert", {
    name: "Vérifiez votre demande",
  });
  await expect(errorSummary).toBeVisible();
  await expect(errorSummary).toBeFocused();
  await expect(page.getByLabel("Occasion")).toHaveAttribute(
    "aria-invalid",
    "true",
  );

  await page.getByLabel(/Prénom/).fill("Inès");
  await page.getByLabel("Occasion").selectOption("Mariage ou fiançailles");
  const desiredDate = page.getByLabel("Date souhaitée");
  await expect(desiredDate).toHaveAttribute("min", /^\d{4}-\d{2}-\d{2}$/);
  await desiredDate.fill("2020-01-01");
  await page.getByLabel("Nombre de parts").fill("80");
  await page
    .getByLabel("Votre idée")
    .fill("Palette ivoire et vert profond, avec une note de fleur d’oranger.");
  await page.getByRole("button", { name: "Préparer mon message" }).click();
  await expect(page.locator("#desiredDate-error")).toContainText(
    "date à partir d’aujourd’hui",
  );
  await expect(page.getByRole("status")).toHaveCount(0);

  await desiredDate.fill("2099-12-20");
  await page.getByRole("button", { name: "Préparer mon message" }).click();

  const ready = page.getByRole("status");
  await expect(ready).toContainText("Votre message est prêt");
  await expect(ready).toContainText("ne confirme pas encore votre commande");
  const outbound = ready.getByRole("link", {
    name: /Ouvrir le message dans WhatsApp/,
  });
  const href = await outbound.getAttribute("href");
  expect(href).toBeTruthy();
  const message = new URL(href as string).searchParams.get("text") ?? "";
  expect(message).toContain("Inès");
  expect(message).toContain("Mariage ou fiançailles");
  expect(message).toContain("fleur d’oranger");

  await expectNoAccessibilityViolations(page);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
});

test("has no horizontal overflow at supported responsive widths", async ({
  page,
}) => {
  for (const width of [320, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(
      dimensions.scrollWidth,
      `overflow at ${width}px`,
    ).toBeLessThanOrEqual(dimensions.clientWidth);
  }
});

test("honours reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const styles = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".hero-enter");
    return {
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      animationName: hero ? getComputedStyle(hero).animationName : null,
      transitionDuration: hero
        ? getComputedStyle(hero).transitionDuration
        : null,
    };
  });
  expect(styles.scrollBehavior).toBe("auto");
  expect(styles.animationName).toBe("none");
  expect(
    Number.parseFloat(styles.transitionDuration ?? "1"),
  ).toBeLessThanOrEqual(0.01);
});

test("serves a useful custom 404", async ({ page }) => {
  const response = await page.goto("/adresse-inconnue");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Cette page n’est pas encore",
  );
  await expect(
    page.getByRole("link", { name: /Revenir à l’accueil/ }),
  ).toHaveAttribute("href", "/");
  await expectNoAccessibilityViolations(page);
});
