"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { btnClass } from "@/components/ui/btnClass";

type Labels = {
  nameLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
};

const field =
  "w-full border-0 border-b border-ink bg-transparent px-0 pt-1 pb-3 font-sans text-[18px] font-light text-ink outline-none focus:border-purple";
const label = "block font-serif text-[18px] text-ink";

export function ContactForm(props: Labels) {
  const pathname = usePathname();
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });

  if (state.status === "success") {
    return <p className="mt-6 text-ink">{props.successMessage}</p>;
  }

  return (
    <form action={action} className="mt-[30px] space-y-[34px] md:pl-[17px]">
      <input type="hidden" name="page" value={pathname} />
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Ne pas remplir <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label htmlFor="contact-name" className={label}>
          {props.nameLabel}
        </label>
        <input id="contact-name" name="name" required autoComplete="name" className={`${field} mt-2 h-[38px]`} />
      </div>
      <div>
        <label htmlFor="contact-phone" className={label}>
          {props.phoneLabel}
        </label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className={`${field} mt-2 h-[38px]`} />
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>
          {props.messageLabel}
        </label>
        <textarea id="contact-message" name="message" required rows={2} className={`${field} mt-2 resize-y`} />
      </div>
      {state.status === "error" && <p className="text-[16px] text-red-700">{state.message ?? props.errorMessage}</p>}
      <div className="flex justify-end">
        <button type="submit" disabled={pending} className={`${btnClass("outline")} min-h-[40px] min-w-[100px] px-6 text-[17px] disabled:opacity-60`}>
          {pending ? "Envoi…" : props.submitLabel}
        </button>
      </div>
    </form>
  );
}
