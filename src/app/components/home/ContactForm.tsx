'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { FiCheck, FiSend } from 'react-icons/fi';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Die Nachricht konnte nicht gesendet werden.');
      }

      setSubmitted(true);
      setFormData(initialFormData);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Ein unbekannter Fehler ist aufgetreten.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="surface flex min-h-72 flex-col items-center justify-center p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pk-green text-black">
          <FiCheck className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-2xl font-black uppercase">Nachricht gesendet</h3>
        <p className="mt-2 text-zinc-400">Danke. Wir melden uns so bald wie möglich.</p>
        <button type="button" className="pk-button-secondary mt-6" onClick={() => setSubmitted(false)}>
          Neue Nachricht
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="surface w-full p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label" htmlFor="name">
          Name
          <input
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInput}
            required
            autoComplete="name"
            className="field-control"
            placeholder="Dein Name"
          />
        </label>
        <label className="field-label" htmlFor="email">
          E-Mail
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInput}
            required
            autoComplete="email"
            className="field-control"
            placeholder="name@beispiel.ch"
          />
        </label>
      </div>

      <label className="field-label mt-5" htmlFor="message">
        Nachricht
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleInput}
          required
          className="field-control min-h-44 resize-y"
          placeholder="Booking, Presse, Drummer-Suche oder einfach Hallo …"
        />
      </label>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className="pk-button mt-6">
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner loading-sm" /> Wird gesendet
          </>
        ) : (
          <>
            Nachricht senden <FiSend aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
