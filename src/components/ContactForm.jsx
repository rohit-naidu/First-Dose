"use client";

import { useState } from "react";

const ROLES = [
  "Clinic operator",
  "Investor or VC",
  "Pharma or health system",
  "Other",
];

// Web3Forms access key (tied to arunachalam_mahesh@berkeley.edu). This key is
// public by design — it only routes submissions to that inbox. Get/replace it
// at https://web3forms.com (enter the email, copy the access key).
const ACCESS_KEY = "b9b3411d-667a-402d-bbda-aabe1ffecb00";

const CONTACT_EMAIL = "arunachalam_mahesh@berkeley.edu";

export default function ContactForm() {
  // idle | submitting | success | error
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Web3Forms metadata
    data.append("access_key", ACCESS_KEY);
    data.append("subject", `First Dose enquiry: ${data.get("role") || ""}`);
    data.append("from_name", "First Dose Health website");

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-sm border border-hairline bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-ink-35 outline-none transition-colors focus:border-clinical/50";

  if (status === "success") {
    return (
      <div className="rounded-md border border-clinical/30 bg-clinical/[0.04] p-8 text-center">
        <p className="text-base text-ink">Thank you. We&apos;ll be in touch.</p>
        <p className="mt-2 text-sm text-ink-45">
          Your message has reached the First Dose team.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          aria-label="Name"
          placeholder="Name"
          autoComplete="name"
          className={field}
        />
        <input
          name="email"
          type="email"
          required
          aria-label="Email"
          placeholder="Email"
          autoComplete="email"
          className={field}
        />
      </div>

      <select
        name="role"
        required
        aria-label="I am a…"
        defaultValue=""
        className={field}
      >
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
        aria-label="Message"
        placeholder="Message"
        className={`${field} resize-none`}
      />

      {/* Honeypot — hidden from people, catches bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={submitting}
        className="justify-self-start rounded-[2px] bg-clinical px-6 py-3 text-[13px] font-semibold text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message →"}
      </button>

      {status === "error" && (
        <p className="text-[13px] text-coral">
          Something went wrong sending your message. Please email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
