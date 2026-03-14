import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title:       'Contact FarmAI Ireland',
  description: 'Get in touch with FarmAI Ireland — corrections, questions, suggestions, or anything else.',
};

export default function ContactPage() {
  return (
    <main className="bg-ui-bg min-h-screen py-14 px-4">
      <div className="max-w-reading mx-auto">

        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-4">Contact</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ui-text mb-3 leading-snug">
          Get in touch
        </h1>
        <p className="text-ui-muted mb-8 leading-relaxed">
          Something wrong in an article? A tool we should cover? A question worth answering
          publicly? We read everything and reply to most messages within a few days.
        </p>

        <div className="bg-white rounded-[16px] border border-ui-border p-6 sm:p-8">
          <ContactForm />
        </div>

        <p className="text-ui-muted text-sm mt-6 text-center">
          Prefer email?{' '}
          <a href="mailto:hello@farmaiireland.ie" className="text-brand-green hover:underline">
            hello@farmaiireland.ie
          </a>
        </p>

      </div>
    </main>
  );
}
