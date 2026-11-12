"use server";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export type ContactState = { status: "idle" | "success" | "error"; message?: string };

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

/**
 * Enregistre la demande dans Sanity (« Messages reçus ») et, si configuré,
 * l'envoie par e-mail via Resend (RESEND_API_KEY + CONTACT_TO_EMAIL).
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Pot de miel anti-spam : champ invisible que seuls les robots remplissent
  if (clean(formData.get("website"), 200)) return { status: "success" };

  const name = clean(formData.get("name"), 200);
  const phone = clean(formData.get("phone"), 50);
  const email = clean(formData.get("email"), 200).toLowerCase();
  const message = clean(formData.get("message"), 5000);
  const page = clean(formData.get("page"), 200);

  if (!name || !message) return { status: "error", message: "Merci d'indiquer votre nom et votre demande." };
  if (!email && !phone) {
    return { status: "error", message: "Merci d'indiquer un e-mail ou un téléphone pour que je puisse vous répondre." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "L'adresse e-mail ne semble pas valide." };
  }

  const tasks: Promise<unknown>[] = [];

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (token) {
    const writeClient = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
    tasks.push(
      writeClient.create({ _type: "contactMessage", name, phone, email, message, page, createdAt: new Date().toISOString() }),
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resendKey && to) {
    const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Paris" }).format(new Date());
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "Site Aude Naturo <onboarding@resend.dev>",
          to: [to],
          // « Répondre » dans la messagerie écrit directement au visiteur
          ...(email ? { reply_to: email } : {}),
          subject: `Nouvelle demande de contact — ${name}`,
          text: [
            `Nouvelle demande reçue depuis le site aude-naturo.fr`,
            ``,
            `Nom : ${name}`,
            `Téléphone : ${phone || "non renseigné"}`,
            `E-mail : ${email || "non renseigné"}`,
            `Page : ${page || "—"}`,
            `Reçu le : ${date}`,
            ``,
            `Message :`,
            message,
          ].join("\n"),
        }),
      }).then(async (r) => {
        if (!r.ok) throw new Error(`Resend ${r.status} ${await r.text()}`);
      }),
    );
  }

  if (!tasks.length) {
    console.error("[contact] Aucun canal configuré (SANITY_API_WRITE_TOKEN ou RESEND_API_KEY + CONTACT_TO_EMAIL)");
    return { status: "error" };
  }

  // Le message est considéré comme reçu dès qu'un canal a fonctionné (e-mail ou enregistrement Sanity)
  const results = await Promise.allSettled(tasks);
  for (const r of results) if (r.status === "rejected") console.error("[contact]", r.reason);
  return results.some((r) => r.status === "fulfilled") ? { status: "success" } : { status: "error" };
}
