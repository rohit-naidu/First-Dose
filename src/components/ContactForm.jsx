"use client";

import { useState } from "react";

const ROLES = [
  "Clinic operator",
  "Investor or VC",
  "Pharma or health system",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  // TODO (open item #6): wire submissions to email/CRM + audience-based
  // lead routing. For now this validates and confirms client-side only.
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const field =
    "w-full rounded-sm border border-hairline bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-ink-35 outline-none transition-colors focus:border-clinical/50";

  if (submitted) {
    return (
      <div className="rounded-md border border-clinical/30 bg-clinical/[0.04] p-8 text-center">
        <p className="text-base text-ink">Thank you — we&apos;ll be in touch.</p>
        <p className="mt-2 text-sm text-ink-45">
          Your message has reached the First Dose team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Name"
          autoComplete="name"
          className={field}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          autoComplete="email"
          className={field}
        />
      </div>

      <select name="role" required defaultValue="" className={field}>
        <option value="" disabled>
          I am a…
        </option>
        {ROLES.map((r) => (
          <option key={r} value={r} className="bg-bg">
            {r}
          </option>
        ))}
      </select>

      <textarea
        name="message"
        rows={4}
        placeholder="Message"
        className={`${field} resize-none`}
      />

      <button
        type="submit"
        className="justify-self-start rounded-[2px] bg-clinical px-6 py-3 text-[13px] font-semibold text-bg transition-opacity hover:opacity-90"
      >
        Send message →
      </button>
    </form>
  );
}
