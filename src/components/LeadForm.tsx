'use client';

import { FormEvent, useState } from 'react';
import { createClient, isSupabaseConfigured } from '../../utils/supabase/client';
import { SUPABASE_TABLE_NAME } from '../../utils/supabase/constants';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type SubmissionForm = {
  name: string;
  email: string;
  phone: string;
  medicationFocus: string;
  notes: string;
  consent: boolean;
};

const initialForm: SubmissionForm = {
  name: '',
  email: '',
  phone: '',
  medicationFocus: '',
  notes: '',
  consent: false,
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[+()\-\s.\d]{7,20}$/.test(phone);
}

export function LeadForm() {
  const [form, setForm] = useState<SubmissionForm>(initialForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  function updateField<T extends keyof SubmissionForm>(field: T, value: SubmissionForm[T]) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function validateForm() {
    if (!isValidEmail(form.email.trim())) {
      return 'Please enter a valid email so we can follow up.';
    }

    if (!isValidPhone(form.phone.trim())) {
      return 'Please enter a valid phone number with at least 7 digits.';
    }

    if (!form.consent) {
      return 'Please confirm that First Dose can use this submission to evaluate your request.';
    }

    return '';
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setStatus('error');
      setMessage(validationMessage);
      return;
    }

    if (!isSupabaseConfigured()) {
      setStatus('error');
      setMessage('Supabase is not configured yet. Add your values to a local .env.local file first.');
      return;
    }

    setStatus('submitting');
    setMessage('Saving your intake...');

    const supabase = createClient();
    const { error: insertError } = await supabase.from(SUPABASE_TABLE_NAME).insert({
      name: form.name.trim() || null,
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      medication_focus: form.medicationFocus.trim() || null,
      notes: form.notes.trim() || null,
      consent_to_review: form.consent,
      source: 'first-dose-landing-page',
    });

    if (insertError) {
      console.error('Supabase intake insert failed:', insertError);
      setStatus('error');
      setMessage(
        insertError.code === 'PGRST205'
          ? 'Intake storage is not set up yet. Run supabase/schema.sql in your Supabase SQL editor.'
          : 'Something went wrong saving your intake. Please try again or email us directly.',
      );
      return;
    }

    setForm(initialForm);
    setStatus('success');
    setMessage('Received. First Dose will review your submission and contact you soon.');
  }

  return (
    <form className="intake-panel" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>Your intake</h3>
        <p>Email and phone are required so we can follow up.</p>
      </div>

      <div className="form-section">
        <p className="form-section__label">Contact</p>
        <div className="priority-grid">
          <label>
            Email
            <input
              autoComplete="email"
              name="email"
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={form.email}
            />
          </label>

          <label>
            Phone
            <input
              autoComplete="tel"
              name="phone"
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder="(555) 123-4567"
              required
              type="tel"
              value={form.phone}
            />
          </label>
        </div>
      </div>

      <div className="form-section">
        <p className="form-section__label">Additional details <span>Optional</span></p>
        <div className="field-grid">
          <label>
            Name
            <input
              autoComplete="name"
              name="name"
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Full name"
              type="text"
              value={form.name}
            />
          </label>

          <label>
            Medication interest
            <input
              name="medicationFocus"
              onChange={(event) => updateField('medicationFocus', event.target.value)}
              placeholder="e.g. Semaglutide, tirzepatide"
              type="text"
              value={form.medicationFocus}
            />
          </label>
        </div>

        <label>
          Notes
          <textarea
            name="notes"
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Side effects, stalls, dose history, or concerns..."
            rows={3}
            value={form.notes}
          />
        </label>
      </div>

      <label className="consent-row">
        <input
          checked={form.consent}
          name="consent"
          onChange={(event) => updateField('consent', event.target.checked)}
          required
          type="checkbox"
        />
        <span>
          I authorize First Dose to review this intake. This is not medical advice.
        </span>
      </label>

      <button disabled={status === 'submitting'} type="submit">
        {status === 'submitting' ? 'Submitting...' : 'Submit intake'}
      </button>

      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
