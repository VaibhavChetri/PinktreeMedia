"use client";

import { useState } from "react";
import { z } from "zod";

// Validation only — no backend. A valid submit composes a mailto: to sales@
// with the enquiry pre-filled (Resend intentionally not wired up).
const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  telephone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  enquiry: z
    .string()
    .trim()
    .min(1, "Please tell us a little about your brand."),
});

type FieldName = keyof z.infer<typeof schema>;

const FIELDS: {
  name: FieldName;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  autoComplete?: string;
}[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "telephone", label: "Telephone", type: "tel", autoComplete: "tel" },
  {
    name: "company",
    label: "Company Name",
    type: "text",
    autoComplete: "organization",
  },
  { name: "enquiry", label: "Enquiry", type: "textarea" },
];

export default function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      telephone: String(fd.get("telephone") ?? ""),
      company: String(fd.get("company") ?? ""),
      enquiry: String(fd.get("enquiry") ?? ""),
    };

    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !next[key as FieldName]) {
          next[key as FieldName] = issue.message;
        }
      }
      setErrors(next);
      return;
    }

    setErrors({});
    const subject = `Enquiry from ${data.name}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Telephone: ${data.telephone}`,
      `Company: ${data.company}`,
      "",
      data.enquiry,
    ].join("\n");
    window.location.href = `mailto:sales@pinktreemedia.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p role="status" className="text-lede">
        Thank you. Your email client will open with your enquiry ready to send,
        and we will be in touch shortly.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-10">
      {FIELDS.map((field) => {
        const error = errors[field.name];
        const errorId = `${field.name}-error`;
        const shared = {
          id: field.name,
          name: field.name,
          autoComplete: field.autoComplete,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
          className: `mt-3 w-full bg-transparent border-b py-3 text-paper caret-pink outline-none transition-colors duration-[400ms] ease-[var(--ease-out-soft)] focus:border-pink ${
            error ? "border-pink" : "border-white/20"
          }`,
        };
        return (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="text-eyebrow uppercase text-stone"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea {...shared} rows={5} />
            ) : (
              <input {...shared} type={field.type} />
            )}
            {error && (
              <p id={errorId} className="mt-2 text-pink">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="self-start border border-pink px-6 py-3 text-eyebrow uppercase text-paper transition-colors duration-[400ms] ease-[var(--ease-out-soft)] hover:bg-pink hover:text-ink"
      >
        Send Enquiry
      </button>
    </form>
  );
}
