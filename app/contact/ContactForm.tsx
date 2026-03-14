'use client';

import { useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Honeypot check — if the hidden field has a value, it's a bot
    if (data.get('website')) return;
    // TODO: wire to form backend (Formspree / Resend / Mailchimp)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <p className="text-brand-green font-semibold text-lg mb-2">Message received.</p>
        <p className="text-ui-muted text-sm">We read everything and reply to most within a few days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users, bots fill it in */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-ui-text mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className="w-full px-4 py-3 text-sm border border-ui-border rounded-button bg-white text-ui-text placeholder:text-ui-muted focus:outline-none focus:border-brand-green transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ui-text mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="w-full px-4 py-3 text-sm border border-ui-border rounded-button bg-white text-ui-text placeholder:text-ui-muted focus:outline-none focus:border-brand-green transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-ui-text mb-1.5">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="w-full px-4 py-3 text-sm border border-ui-border rounded-button bg-white text-ui-text focus:outline-none focus:border-brand-green transition-colors"
        >
          <option value="" disabled>Select a topic</option>
          <option value="correction">Something in an article is wrong</option>
          <option value="question">I have a question</option>
          <option value="suggestion">Topic or tool suggestion</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ui-text mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 text-sm border border-ui-border rounded-button bg-white text-ui-text placeholder:text-ui-muted focus:outline-none focus:border-brand-green transition-colors resize-y"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-brand-green text-white font-semibold px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors text-sm"
      >
        Send message
      </button>
    </form>
  );
}
