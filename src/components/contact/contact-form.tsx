"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useRef,
  useState,
} from "react";

import { ArrowUpRightIcon, CheckIcon } from "@/components/icons";
import {
  buildEnquiryMessage,
  emptyEnquiry,
  getLocalDateInputValue,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
  occasionOptions,
  validateEnquiry,
  validateEnquiryField,
} from "@/lib/enquiry";
import {
  buildWhatsAppUrl,
  getDefaultWhatsAppUrl,
  getWhatsAppRecipient,
} from "@/lib/whatsapp";

type FormStatus =
  { name: "idle" } | { name: "ready"; url: string } | { name: "error" };

const fieldLabels: Record<EnquiryField, string> = {
  firstName: "Prénom",
  occasion: "Occasion",
  desiredDate: "Date souhaitée",
  servings: "Nombre de parts",
  details: "Votre idée",
};

export function ContactForm() {
  const minimumDate = getLocalDateInputValue();
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<FormStatus>({ name: "idle" });
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const updateValue = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const field = event.target.name as EnquiryField;
    const value = event.target.value;
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setStatus({ name: "idle" });

    if (errors[field]) {
      const message = validateEnquiryField(field, nextValues);
      setErrors((current) => {
        if (message) {
          return { ...current, [field]: message };
        }

        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const validateOnBlur = (
    event: FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const field = event.target.name as EnquiryField;
    const message = validateEnquiryField(field, values);
    setErrors((current) => {
      if (message) {
        return { ...current, [field]: message };
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ name: "idle" });
      queueMicrotask(() => errorSummaryRef.current?.focus());
      return;
    }

    try {
      const message = buildEnquiryMessage(values);
      const url = buildWhatsAppUrl(message, getWhatsAppRecipient());
      setStatus({ name: "ready", url });
    } catch {
      setStatus({ name: "error" });
    }
  };

  const errorEntries = Object.entries(errors).filter(
    (entry): entry is [EnquiryField, string] => Boolean(entry[1]),
  );

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      {errorEntries.length > 0 ? (
        <div
          ref={errorSummaryRef}
          className="form-summary form-summary--error"
          role="alert"
          tabIndex={-1}
          aria-labelledby="form-error-title"
        >
          <h3 id="form-error-title">Vérifiez votre demande</h3>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#${field}`}>
                  {fieldLabels[field]} : {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="form-grid">
        <div className="field">
          <label htmlFor="firstName">
            Prénom <span>(facultatif)</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={60}
            value={values.firstName}
            onChange={updateValue}
            onBlur={validateOnBlur}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName ? (
            <p id="firstName-error" className="field-error">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            required
            value={values.occasion}
            onChange={updateValue}
            onBlur={validateOnBlur}
            aria-invalid={Boolean(errors.occasion)}
            aria-describedby={errors.occasion ? "occasion-error" : undefined}
          >
            <option value="">Choisir une occasion</option>
            {occasionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.occasion ? (
            <p id="occasion-error" className="field-error">
              {errors.occasion}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="desiredDate">Date souhaitée</label>
          <input
            id="desiredDate"
            name="desiredDate"
            type="date"
            required
            min={minimumDate}
            value={values.desiredDate}
            onChange={updateValue}
            onBlur={validateOnBlur}
            aria-invalid={Boolean(errors.desiredDate)}
            aria-describedby={`desiredDate-help${errors.desiredDate ? " desiredDate-error" : ""}`}
          />
          <p id="desiredDate-help" className="field-help">
            La disponibilité sera confirmée sur WhatsApp.
          </p>
          {errors.desiredDate ? (
            <p id="desiredDate-error" className="field-error">
              {errors.desiredDate}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="servings">Nombre de parts</label>
          <input
            id="servings"
            name="servings"
            type="text"
            required
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            placeholder="Ex. 24"
            value={values.servings}
            onChange={updateValue}
            onBlur={validateOnBlur}
            aria-invalid={Boolean(errors.servings)}
            aria-describedby={errors.servings ? "servings-error" : undefined}
          />
          {errors.servings ? (
            <p id="servings-error" className="field-error">
              {errors.servings}
            </p>
          ) : null}
        </div>

        <div className="field field--full">
          <label htmlFor="details">Votre idée</label>
          <textarea
            id="details"
            name="details"
            required
            rows={5}
            minLength={20}
            maxLength={600}
            placeholder="Saveurs, couleurs, ambiance, décor ou inspiration…"
            value={values.details}
            onChange={updateValue}
            onBlur={validateOnBlur}
            aria-invalid={Boolean(errors.details)}
            aria-describedby={errors.details ? "details-error" : "details-help"}
          />
          <div className="field-meta">
            <p id="details-help" className="field-help">
              20 à 600 caractères
            </p>
            <p aria-hidden="true">{values.details.length}/600</p>
          </div>
          {errors.details ? (
            <p id="details-error" className="field-error">
              {errors.details}
            </p>
          ) : null}
        </div>
      </div>

      <p className="contact-form__privacy">
        Les informations saisies servent uniquement à préparer votre message. Ce
        site ne les enregistre pas ; elles ne quittent la page que si vous
        choisissez d’ouvrir WhatsApp.
      </p>

      <button className="button-gold contact-form__submit" type="submit">
        Préparer mon message
        <ArrowUpRightIcon className="size-4" />
      </button>

      {status.name === "ready" ? (
        <div className="form-summary form-summary--success" role="status">
          <CheckIcon className="size-6" />
          <div>
            <h3>Votre message est prêt</h3>
            <p>
              Vérifiez-le puis choisissez de l’envoyer dans WhatsApp. Cela ne
              confirme pas encore votre commande.
            </p>
            <a href={status.url} target="_blank" rel="noreferrer">
              Ouvrir le message dans WhatsApp
              <ArrowUpRightIcon className="size-4" />
              <span className="sr-only"> — ouvre un nouvel onglet</span>
            </a>
          </div>
        </div>
      ) : null}

      {status.name === "error" ? (
        <div className="form-summary form-summary--error" role="alert">
          <h3>Le message n’a pas pu être préparé</h3>
          <p>
            Vos informations restent dans le formulaire. Réessayez ou ouvrez une
            conversation générique.
          </p>
          <a href={getDefaultWhatsAppUrl()} target="_blank" rel="noreferrer">
            Ouvrir WhatsApp sans le formulaire
          </a>
        </div>
      ) : null}
    </form>
  );
}
