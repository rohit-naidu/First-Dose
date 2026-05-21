'use client';

import { FormEvent, useMemo, useState } from 'react';
import { createClient, isSupabaseConfigured } from '../../utils/supabase/client';
import { SUPABASE_STORAGE_BUCKET, SUPABASE_TABLE_NAME } from '../../utils/supabase/constants';

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

const maxTxtFileSizeBytes = 10 * 1024 * 1024;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[+()\-\s.\d]{7,20}$/.test(phone);
}

function cleanFileName(fileName: string) {
  // Supabase Storage paths should avoid spaces and unusual characters.
  return fileName.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
}

function buildStoragePath(fileName: string) {
  // A unique path prevents one visitor's upload from overwriting another visitor's file.
  const id = crypto.randomUUID();
  return `incoming/${new Date().toISOString().slice(0, 10)}/${id}-${cleanFileName(fileName)}`;
}

export function LeadForm() {
  const [form, setForm] = useState<SubmissionForm>(initialForm);
  const [rawDataFile, setRawDataFile] = useState<File | null>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const selectedFileLabel = useMemo(() => {
    if (!rawDataFile) {
      return 'Upload your raw genetic data .txt file';
    }

    const sizeInMb = (rawDataFile.size / 1024 / 1024).toFixed(2);
    return `${rawDataFile.name} · ${sizeInMb} MB`;
  }, [rawDataFile]);

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

    if (!rawDataFile) {
      return 'Please upload your raw genetic data .txt file.';
    }

    if (!rawDataFile.name.toLowerCase().endsWith('.txt')) {
      return 'Please upload a .txt file. Raw genetic downloads are usually provided in this format.';
    }

    if (rawDataFile.size > maxTxtFileSizeBytes) {
      return 'Please upload a file smaller than 10 MB for this first version.';
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

    if (!isSupabaseConfigured() || !rawDataFile) {
      setStatus('error');
      setMessage('Supabase is not configured yet. Add your values to a local .env.local file first.');
      return;
    }

    setStatus('submitting');
    setMessage('Securely uploading your file and saving your submission...');

    const supabase = createClient();
    const storagePath = buildStoragePath(rawDataFile.name);

    const { error: uploadError } = await supabase.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .upload(storagePath, rawDataFile, {
        cacheControl: '3600',
        contentType: 'text/plain',
        upsert: false,
      });

    if (uploadError) {
      setStatus('error');
      setMessage(uploadError.message);
      return;
    }

    const { error: insertError } = await supabase.from(SUPABASE_TABLE_NAME).insert({
      name: form.name.trim() || null,
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      medication_focus: form.medicationFocus.trim() || null,
      notes: form.notes.trim() || null,
      raw_file_path: storagePath,
      raw_file_name: rawDataFile.name,
      raw_file_size_bytes: rawDataFile.size,
      consent_to_review: form.consent,
      source: 'first-dose-landing-page',
    });

    if (insertError) {
      setStatus('error');
      setMessage(insertError.message);
      return;
    }

    setForm(initialForm);
    setRawDataFile(null);
    setStatus('success');
    setMessage('Received. First Dose will review your submission and contact you soon.');
  }

  return (
    <form className="intake-panel" onSubmit={handleSubmit}>
      <div className="form-header">
        <div className="brand-row">
          <span className="brand-chip">First Dose</span>
          <span className="status-chip">Genotype intake online</span>
        </div>
        <span className="system-label">Pharmacogenomic screening request</span>
        <h1>Upload your raw genetic data. Find the medications most likely to work against you.</h1>
        <p>
          Submit your contact details and raw .txt file. We screen for medication response and
          side-effect risk signals, then follow up if your file is usable for analysis.
        </p>
        <div className="outcome-grid" aria-label="First Dose review outcomes">
          <span>Drug efficacy signals</span>
          <span>Side-effect sensitivity</span>
          <span>Dose-response flags</span>
        </div>
      </div>

      <div className="priority-grid">
        <label>
          Email
          <input
            autoComplete="email"
            name="email"
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="alex@example.com"
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
            placeholder="+1 (555) 123-4567"
            required
            type="tel"
            value={form.phone}
          />
        </label>
      </div>

      <label className="file-drop">
        <span>{selectedFileLabel}</span>
        <small>Required: text/plain .txt raw genotype export, maximum 10 MB.</small>
        <input
          accept=".txt,text/plain"
          name="rawDataFile"
          onChange={(event) => setRawDataFile(event.target.files?.[0] ?? null)}
          required
          type="file"
        />
      </label>

      <div className="field-grid">
        <label>
          Name <span>Optional</span>
          <input
            autoComplete="name"
            name="name"
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Alex Morgan"
            type="text"
            value={form.name}
          />
        </label>

        <label>
          Medication target <span>Optional</span>
          <input
            name="medicationFocus"
            onChange={(event) => updateField('medicationFocus', event.target.value)}
            placeholder="SSRIs, ADHD medication, pain management"
            type="text"
            value={form.medicationFocus}
          />
        </label>
      </div>

      <label>
        What are you trying to avoid? <span>Optional</span>
        <textarea
          name="notes"
          onChange={(event) => updateField('notes', event.target.value)}
          placeholder="Bad reactions, failed medications, current drug class, or what you want to predict before starting."
          rows={4}
          value={form.notes}
        />
      </label>

      <label className="consent-row">
        <input
          checked={form.consent}
          name="consent"
          onChange={(event) => updateField('consent', event.target.checked)}
          required
          type="checkbox"
        />
        <span>
          I authorize First Dose to ingest this file for intake review. I understand this is not
          medical advice, diagnosis, or emergency care.
        </span>
      </label>

      <button disabled={status === 'submitting'} type="submit">
        {status === 'submitting' ? 'Ingesting payload...' : 'Submit file for review'}
      </button>

      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
