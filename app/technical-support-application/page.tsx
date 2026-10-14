'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  DollarSign,
  Check,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Upload,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Globe,
  Wrench,
} from 'lucide-react';

interface FormDataType {
  fullName: string;
  age: string;
  country: string;
  city: string;
  email: string;
  contactNumber: string;
  languages: string;
  documentsAvailability: string;
  compensation: string;
  pterodactylPanel: string;
  paymenterPanel: string;
  proxmox: string;
  vmware: string;
  linux: string;
  developingIdeas: string;
  agreeToRules: boolean;
}

interface FilesType {
  identityCard: File | null;
  passportPhoto: File | null;
}

const INITIAL_FORM: FormDataType = {
  fullName: '',
  age: '',
  country: '',
  city: '',
  email: '',
  contactNumber: '',
  languages: '',
  documentsAvailability: '',
  compensation: '',
  pterodactylPanel: '',
  paymenterPanel: '',
  proxmox: '',
  vmware: '',
  linux: '',
  developingIdeas: '',
  agreeToRules: false,
};

const INITIAL_FILES: FilesType = {
  identityCard: null,
  passportPhoto: null,
};

const STEPS = [
  { id: 'personal', label: 'Personal Information' },
  { id: 'documents', label: 'Documents' },
  { id: 'technical', label: 'Technical Skills' },
  { id: 'final', label: 'Final Review' },
];

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
  'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
  'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala',
  'Guinea', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
  'Liberia', 'Libya', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mexico', 'Moldova',
  'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand',
  'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Paraguay',
  'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
  'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

export default function TechnicalSupportApplication() {
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM);
  const [files, setFiles] = useState<FilesType>(INITIAL_FILES);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [activeStep, setActiveStep] = useState('personal');
  const [mobileStepsOpen, setMobileStepsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setSubmitError('Each document must be 5 MB or smaller.');
      e.target.value = '';
      setFiles((prev) => ({ ...prev, [name]: null }));
      return;
    }
    setSubmitError('');
    setFiles((prev) => ({ ...prev, [name]: file ?? null }));
  };

  const completed = STEPS.filter((step) => {
    if (step.id === 'personal') {
      return (
        formData.fullName &&
        formData.age &&
        formData.country &&
        formData.city &&
        formData.email &&
        formData.contactNumber &&
        formData.languages
      );
    }
    if (step.id === 'documents') {
      return files.identityCard && files.passportPhoto;
    }
    if (step.id === 'technical') {
      return (
        formData.pterodactylPanel &&
        formData.paymenterPanel &&
        formData.proxmox &&
        formData.vmware &&
        formData.linux &&
        formData.developingIdeas
      );
    }
    return true;
  }).length;

  const progress = (completed / STEPS.length) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError('');
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value));
      });

      // Add files
      if (files.identityCard) {
        formDataToSend.append('identityCard', files.identityCard);
      }
      if (files.passportPhoto) {
        formDataToSend.append('passportPhoto', files.passportPhoto);
      }

      const response = await fetch('/api/technical-support-applications', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json().catch(() => null);
      if (!data) {
        throw new Error(response.status === 413 ? 'Uploads are too large. Please use smaller files.' : 'The server returned an unexpected response. Please contact support before retrying.');
      }

      if (response.ok) {
        setApplicationId(data.applicationId);
        // Show loading animation for 2-3 seconds, then show success
        setTimeout(() => {
          setShowSuccess(true);
          setSubmitting(false);
        }, 2500);
      } else {
        setSubmitError(data.error || 'Failed to submit application');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Unable to reach the server. Please contact support before retrying.');
      setSubmitting(false);
    }
  };

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setActiveStep(id);
  };

  if (showSuccess) {
    return (
      <main className="min-h-screen bg-[#050608]">
        <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6">
          <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
              <Check className="h-8 w-8 text-white" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-white">
              Application Submitted Successfully!
            </h1>

            <p className="mb-6 text-sm text-gray-400">
              Thank you for applying for the Technical Support position.
            </p>
            <p className="mb-6 text-cyan-300 font-mono">Application ID: {applicationId}</p>

            <div className="mb-6 rounded-lg bg-cyan-400/10 p-4 text-left">
              <p className="mb-2 text-xs font-semibold text-cyan-400">
                Next Steps:
              </p>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>• Your application will be reviewed by our team</li>
                <li>• If shortlisted, you will receive an email with interview details</li>
                <li>• Your interview will be taken live on Google Meet where your skills will be tested</li>
              </ul>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:from-cyan-300 hover:to-blue-400"
            >
              Return to Home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050608]">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/[0.05] bg-[#050608]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">
                Technical Support Application
              </h1>
              <p className="text-xs text-gray-400">
                Join our technical team at Caspian Host
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className="h-2 w-16 rounded-full bg-white/[0.05] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Mobile Steps */}
        <button
          onClick={() => setMobileStepsOpen(!mobileStepsOpen)}
          className="mb-6 flex w-full items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
              {completed}
            </div>
            <span className="text-sm font-semibold text-white">
              {completed} of {STEPS.length} completed
            </span>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${mobileStepsOpen ? 'rotate-180' : ''}`} />
        </button>

        {mobileStepsOpen && (
          <div className="mb-6 space-y-2 rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 md:hidden">
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => {
                  goTo(step.id);
                  setMobileStepsOpen(false);
                }}
                className={`w-full flex items-center justify-between rounded-lg p-3 text-left transition ${
                  activeStep === step.id
                    ? 'bg-cyan-400/10 text-cyan-400'
                    : 'hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-xs font-medium">{step.label}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            ))}
          </div>
        )}

        {submitError && <p role="alert" className="sticky top-24 z-40 mb-6 rounded-lg border border-red-500 bg-gray-900 p-4 text-red-300">{submitError}</p>}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Section
            id="personal"
            number="01"
            title="Personal Information"
            description="Your basic information and contact details"
            icon={<User className="h-5 w-5" />}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Full Name"
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />

              <Field
                label="Age"
                required
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="25"
              />

              <SelectField
                label="Country"
                required
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select your country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </SelectField>

              <Field
                label="City"
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
                icon={<MapPin className="h-4 w-4" />}
              />

              <Field
                label="Email Address"
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                icon={<Mail className="h-4 w-4" />}
              />

              <Field
                label="Contact Number"
                required
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                icon={<Phone className="h-4 w-4" />}
              />

              <Field
                label="Languages you can communicate in"
                required
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="English, Spanish, French"
                icon={<Globe className="h-4 w-4" />}
              />
            </div>
          </Section>

          {/* Documents */}
          <Section
            id="documents"
            number="02"
            title="Documents"
            description="Required documents for verification"
            icon={<ShieldCheck className="h-5 w-5" />}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <FileUpload
                label="Identity Card / Aadhaar Card (Back Copy)"
                description="Required • PDF, JPG or PNG"
                name="identityCard"
                file={files.identityCard}
                onChange={handleFileChange}
                required
              />

              <FileUpload
                label="Passport Size Photo"
                description="Required • JPG or PNG"
                name="passportPhoto"
                file={files.passportPhoto}
                onChange={handleFileChange}
                required
              />
            </div>

            <SelectField
              label="Do you have all required documents available?"
              required
              name="documentsAvailability"
              value={formData.documentsAvailability}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes, I have all documents</option>
              <option value="partial">I have some documents</option>
              <option value="no">No, I need to prepare documents</option>
            </SelectField>

            <Field
              label="Expected Compensation"
              required
              name="compensation"
              value={formData.compensation}
              onChange={handleChange}
              placeholder="e.g., $500-800 per month"
              icon={<DollarSign className="h-4 w-4" />}
            />
          </Section>

          {/* Technical Skills */}
          <Section
            id="technical"
            number="03"
            title="Technical Skills & Knowledge"
            description="Your experience with various technologies"
            icon={<Wrench className="h-5 w-5" />}
          >
            <div className="space-y-6">
              <TextField
                label="Pterodactyl Panel - Describe your experience with Pterodactyl panel"
                required
                name="pterodactylPanel"
                value={formData.pterodactylPanel}
                onChange={handleChange}
                placeholder="Describe your experience managing servers, installing Pterodactyl, configuring nodes, managing users..."
                rows={4}
              />

              <TextField
                label="Paymenter Panel - Describe your experience with Paymenter"
                required
                name="paymenterPanel"
                value={formData.paymenterPanel}
                onChange={handleChange}
                placeholder="Describe your experience with billing systems, Paymenter configuration, payment gateway integration..."
                rows={4}
              />

              <TextField
                label="Proxmox - Describe your experience with Proxmox"
                required
                name="proxmox"
                value={formData.proxmox}
                onChange={handleChange}
                placeholder="Describe your experience with virtualization, VM management, Proxmox clustering..."
                rows={4}
              />

              <TextField
                label="VMware - Describe your experience with VMware"
                required
                name="vmware"
                value={formData.vmware}
                onChange={handleChange}
                placeholder="Describe your experience with VMware ESXi, vSphere, virtualization management..."
                rows={4}
              />

              <TextField
                label="Linux - Describe your experience with Linux"
                required
                name="linux"
                value={formData.linux}
                onChange={handleChange}
                placeholder="Describe your Linux administration skills, command line proficiency, server management..."
                rows={4}
              />

              <TextField
                label="Developing / Building New Ideas - Describe your experience with development"
                required
                name="developingIdeas"
                value={formData.developingIdeas}
                onChange={handleChange}
                placeholder="Describe any programming languages you know, projects you've built, or ideas you've developed..."
                rows={4}
              />
            </div>
          </Section>

          {/* Final */}
          <Section
            id="final"
            number="04"
            title="Final Review"
            description="Complete your application"
            icon={<Check className="h-5 w-5" />}
          >
            <div className="mb-6 rounded-lg bg-yellow-400/10 p-4 border border-yellow-400/30">
              <p className="text-xs font-semibold text-yellow-400 mb-2">
                Important Notice
              </p>
              <p className="text-xs text-gray-300">
                Your interview will be taken live on Google Meet where your skills will be tested. 
                Please ensure you are prepared to demonstrate your technical knowledge.
              </p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-white/[0.13]">
              <input
                type="checkbox"
                name="agreeToRules"
                required
                checked={formData.agreeToRules}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/20 text-cyan-400 focus:ring-cyan-400"
              />

              <span className="text-xs leading-5 text-gray-400">
                I agree to participate in a live technical interview on Google Meet where my skills will be tested, 
                and I understand that my application will be evaluated based on my technical proficiency.
              </span>
            </label>

            <div className="border-t border-white/[0.07] pt-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Ready to submit?
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Please make sure all required information is
                    accurate.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-3.5 text-sm font-semibold text-black transition hover:from-cyan-300 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? 'Submitting application...'
                    : 'Submit Application'}

                  {!submitting && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hovertranslate-x-1" />
                  )}
                </button>
              </div>
            </div>
          </Section>
        </form>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] bg-[#090b0f]">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Caspian Host. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #050608;
        }

        input,
        textarea,
        select {
          outline: none;
        }

        input::placeholder,
        textarea::placeholder {
          color: #6b7280;
        }

        select {
          color-scheme: dark;
        }
      `}</style>
    </main>
  );
}

/* -------------------------------------------------------
   COMPONENTS
------------------------------------------------------- */

function Section({
  id,
  number,
  title,
  description,
  icon,
  children,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
          {icon}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400">
              {number}
            </span>
            <h2 className="text-lg font-bold text-white">
              {title}
            </h2>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  required,
  icon,
  ...props
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-gray-400">
        {label}
        {required && <span className="ml-1 text-cyan-400">*</span>}
      </span>

      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          {...props}
          required={required}
          className={`h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 text-sm text-white transition placeholder:text-gray-700 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-cyan-400/[0.025] focus:ring-2 focus:ring-cyan-400/[0.04] ${
            icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  required,
  children,
  ...props
}: {
  label: string;
  required?: boolean;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-gray-400">
        {label}

        {required && (
          <span className="ml-1 text-cyan-400">*</span>
        )}
      </span>

      <select
        {...props}
        required={required}
        className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 text-sm text-white transition hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-cyan-400/[0.025] focus:ring-2 focus:ring-cyan-400/[0.04]"
        style={{ backgroundColor: '#1a1a1a', color: 'white' }}
      >
        {children}
      </select>
    </label>
  );
}

function TextField({
  label,
  required,
  ...props
}: {
  label?: string;
  required?: boolean;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-xs font-semibold text-gray-400">
          {label}

          {required && (
            <span className="ml-1 text-cyan-400">*</span>
          )}
        </span>
      )}

      <textarea
        {...props}
        required={required}
        className="w-full resize-y rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 text-sm leading-6 text-white transition placeholder:text-gray-700 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-cyan-400/[0.025] focus:ring-2 focus:ring-cyan-400/[0.04]"
      />
    </label>
  );
}

function FileUpload({
  label,
  description,
  name,
  file,
  onChange,
  required,
}: {
  label: string;
  description: string;
  name: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-gray-400">
        {label}
        {required && <span className="ml-1 text-cyan-400">*</span>}
      </span>

      <div className="relative overflow-hidden rounded-lg border border-dashed border-white/[0.15] bg-white/[0.015] p-5 transition hover:border-cyan-400/30">
        <input
          type="file"
          name={name}
          onChange={onChange}
          accept={name === 'passportPhoto' ? 'image/jpeg,image/png' : 'image/jpeg,image/png,application/pdf'}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          required={required}
        />

        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
            <Upload className="h-5 w-5 text-cyan-400" />
          </div>

          <div className="min-w-0">
            {file ? (
              <>
                <p className="truncate text-xs font-semibold text-white">
                  {file.name}
                </p>
                <p className="mt-1 text-[10px] text-cyan-400">
                  File selected successfully
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold text-gray-300">
                  Choose a file
                </p>
                <p className="mt-1 text-[10px] text-gray-500">
                  {description} (maximum 5 MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </label>
  );
}
