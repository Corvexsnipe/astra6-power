'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Upload,
  User,
  Wallet,
  X,
} from 'lucide-react';

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
  "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Guatemala",
  "Guinea", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Lithuania", "Luxembourg", "Madagascar", "Malaysia", "Maldives", "Mali", "Malta", "Mexico", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama", "Paraguay",
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka",
  "Sudan", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

type FormDataType = {
  fullName: string;
  age: string;
  country: string;
  city: string;
  email: string;
  contactNumber: string;
  languages: string;
  previousExperience: string;
  hasHostingExperience: boolean;
  hostingExperienceDetails: string;
  dailyHours: string;
  weekendAvailability: boolean;
  emergencyAvailability: boolean;
  handleAngryCustomer: string;
  handleUnknownSolution: string;
  prioritizeMultipleCustomers: string;
  explainTechnicalIssue: string;
  minecraftServerCheck: string;
  expectedSalary: string;
  whyHire: string;
  agreeToRules: boolean;
};

type FilesType = {
  experienceLetter: File | null;
  identityCard: File | null;
  passportPhoto: File | null;
};

const INITIAL_FORM: FormDataType = {
  fullName: '',
  age: '',
  country: '',
  city: '',
  email: '',
  contactNumber: '',
  languages: '',
  previousExperience: '',
  hasHostingExperience: false,
  hostingExperienceDetails: '',
  dailyHours: '',
  weekendAvailability: false,
  emergencyAvailability: false,
  handleAngryCustomer: '',
  handleUnknownSolution: '',
  prioritizeMultipleCustomers: '',
  explainTechnicalIssue: '',
  minecraftServerCheck: '',
  expectedSalary: '',
  whyHire: '',
  agreeToRules: false,
};

const INITIAL_FILES: FilesType = {
  experienceLetter: null,
  identityCard: null,
  passportPhoto: null,
};

const STEPS = [
  { id: 'personal', label: 'Personal Information', short: 'Personal' },
  { id: 'experience', label: 'Experience', short: 'Experience' },
  { id: 'availability', label: 'Availability', short: 'Availability' },
  { id: 'support', label: 'Support Assessment', short: 'Assessment' },
  { id: 'salary', label: 'Compensation', short: 'Compensation' },
  { id: 'documents', label: 'Documents', short: 'Documents' },
  { id: 'final', label: 'Final Review', short: 'Review' },
];

export default function CustomerSupportApplication() {
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM);
  const [files, setFiles] = useState<FilesType>(INITIAL_FILES);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [activeStep, setActiveStep] = useState('personal');
  const [mobileStepsOpen, setMobileStepsOpen] = useState(false);

  const completed = useMemo(() => {
    const checks = [
      !!(
        formData.fullName &&
        formData.age &&
        formData.country &&
        formData.city &&
        formData.email &&
        formData.contactNumber &&
        formData.languages
      ),
      !!formData.previousExperience,
      !!formData.dailyHours,
      !!(
        formData.handleAngryCustomer &&
        formData.handleUnknownSolution &&
        formData.prioritizeMultipleCustomers &&
        formData.explainTechnicalIssue &&
        formData.minecraftServerCheck
      ),
      !!formData.expectedSalary,
      !!(files.identityCard && files.passportPhoto),
      !!(formData.whyHire && formData.agreeToRules),
    ];

    return checks.filter(Boolean).length;
  }, [formData, files]);

  const progress = Math.round((completed / STEPS.length) * 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visible) {
          setActiveStep(visible.target.id);
        }
      },
      {
        rootMargin: '-120px 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    STEPS.forEach((step) => {
      const element = document.getElementById(step.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, files: selected } = e.target;

    if (!selected?.[0]) return;

    setFiles((prev) => ({
      ...prev,
      [name]: selected[0],
    }));
  };

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setActiveStep(id);
    setMobileStepsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setMessage(null);

    try {
      const body = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, String(value));
      });

      if (files.experienceLetter) {
        body.append(
          'experienceLetter',
          files.experienceLetter
        );
      }

      if (files.identityCard) {
        body.append('identityCard', files.identityCard);
      }

      if (files.passportPhoto) {
        body.append('passportPhoto', files.passportPhoto);
      }

      const response = await fetch(
        '/api/customer-support-applications',
        {
          method: 'POST',
          body,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to submit application.'
        );
      }

      setMessage({
        type: 'success',
        text: `Your application has been submitted successfully. Application ID: ${data.applicationId}`,
      });

      setFormData(INITIAL_FORM);
      setFiles(INITIAL_FILES);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Unable to submit your application. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050608] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#050608]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
              <span className="text-sm font-black">C</span>
            </div>

            <div>
              <div className="text-[15px] font-black tracking-tight">
                Caspian Host
              </div>

              <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-400">
                Careers
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-6 sm:flex">
            <div className="text-right">
              <p className="text-[10px] font-medium text-gray-500">
                Application progress
              </p>

              <p className="text-xs font-semibold text-white">
                {completed} of {STEPS.length} sections
              </p>
            </div>

            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileStepsOpen((value) => !value)
            }
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-gray-400 sm:hidden"
          >
            {progress}%
            <ChevronDown
              className={`h-4 w-4 transition ${
                mobileStepsOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {mobileStepsOpen && (
          <div className="border-t border-white/10 bg-[#07090c] p-4 sm:hidden">
            <div className="space-y-1">
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goTo(step.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left ${
                    activeStep === step.id
                      ? 'bg-cyan-400/10'
                      : ''
                  }`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-[10px] font-semibold">
                    {index + 1}
                  </span>

                  <span className="text-xs font-semibold text-gray-300">
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="border-b border-white/[0.07] bg-[#090b0f]">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                Now accepting applications
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl lg:text-[58px] lg:leading-[1.05]">
              Customer Support
              <br />
              <span className="text-gray-400">
                Staff Application
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              Join the Caspian Host team and help our customers
              get the most from their hosting experience. We are
              looking for people who communicate clearly, solve
              problems calmly, and take ownership of their work.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-cyan-400" />
                Customer Support
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-cyan-400" />
                Flexible availability
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                Remote position
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8 lg:py-14">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
              Application
            </p>

            <nav className="space-y-1">
              {STEPS.map((step, index) => {
                const active = activeStep === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => goTo(step.id)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      active
                        ? 'bg-cyan-400/10 border border-cyan-400/20'
                        : 'hover:bg-white/[0.025]'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        active
                          ? 'bg-cyan-400 text-black'
                          : 'bg-white/[0.05] text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <p
                        className={`text-xs font-semibold ${
                          active
                            ? 'text-white'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </p>

                      {active && (
                        <p className="mt-0.5 text-[10px] text-cyan-400">
                          Current section
                        </p>
                      )}
                    </div>

                    {active && (
                      <ChevronRight className="ml-auto h-4 w-4 text-cyan-400" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-semibold text-gray-300">
                  Your information is private
                </span>
              </div>

              <p className="mt-2 text-[11px] leading-5 text-gray-500">
                Information submitted through this form is reviewed
                only by authorized Caspian Host staff.
              </p>
            </div>
          </div>
        </aside>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {message && (
            <div
              className={`rounded-xl border bg-white/[0.02] p-5 ${
                message.type === 'success'
                  ? 'border-emerald-400/20'
                  : 'border-red-400/20'
              }`}
            >
              <div className="flex items-start gap-3">
                {message.type === 'success' ? (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                    <Check className="h-4 w-4 text-emerald-400" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-400/10">
                    <X className="h-4 w-4 text-red-400" />
                  </div>
                )}

                <div>
                  <p
                    className={`text-xs font-semibold ${
                      message.type === 'success'
                        ? 'text-emerald-300'
                        : 'text-red-300'
                    }`}
                  >
                    {message.type === 'success'
                      ? 'Application submitted'
                      : 'Unable to submit application'}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Personal */}
          <Section
            id="personal"
            number="01"
            title="Personal Information"
            description="Please provide your basic contact information."
            icon={<User className="h-5 w-5" />}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Full Name"
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              <Field
                label="Age"
                required
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
              />

              <SelectField
                label="Country"
                required
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select country</option>

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
                placeholder="Enter your city"
                icon={<MapPin className="h-4 w-4" />}
              />

              <Field
                label="Email Address"
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                icon={<Mail className="h-4 w-4" />}
              />

              <Field
                label="Contact Number"
                required
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+92 300 0000000"
              />

              <Field
                label="Languages"
                required
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="English, Urdu, Hindi..."
              />
            </div>
          </Section>

          {/* Experience */}
          <Section
            id="experience"
            number="02"
            title="Experience"
            description="Tell us about your previous work and customer support experience."
            icon={<FileText className="h-5 w-5" />}
          >
            <TextField
              label="Previous Customer Support Experience"
              required
              name="previousExperience"
              value={formData.previousExperience}
              onChange={handleChange}
              placeholder="Tell us about your previous customer support experience, responsibilities, and the type of customers you worked with."
              rows={5}
            />

            <CheckboxCard
              checked={formData.hasHostingExperience}
              onChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  hasHostingExperience: checked,
                }))
              }
              title="Hosting company experience"
              description="Have you worked for a hosting company or managed customer support tickets before?"
            />

            {formData.hasHostingExperience && (
              <div className="space-y-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <TextField
                  label="Tell us about your role"
                  name="hostingExperienceDetails"
                  value={formData.hostingExperienceDetails}
                  onChange={handleChange}
                  placeholder="Company, position, responsibilities, ticket system, technical responsibilities, etc."
                  rows={4}
                />

                <FileUpload
                  label="Experience Letter"
                  description="Optional. PDF, DOC, DOCX, JPG or PNG."
                  name="experienceLetter"
                  file={files.experienceLetter}
                  onChange={handleFileChange}
                />
              </div>
            )}
          </Section>

          {/* Availability */}
          <Section
            id="availability"
            number="03"
            title="Availability"
            description="Tell us about your expected working availability."
            icon={<Clock3 className="h-5 w-5" />}
          >
            <Field
              label="Hours you can work per day"
              required
              type="number"
              min="1"
              max="24"
              name="dailyHours"
              value={formData.dailyHours}
              onChange={handleChange}
              placeholder="e.g. 6"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <CheckboxCard
                checked={formData.weekendAvailability}
                onChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    weekendAvailability: checked,
                  }))
                }
                title="Weekend availability"
                description="I am available to work on weekends when required."
              />

              <CheckboxCard
                checked={formData.emergencyAvailability}
                onChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    emergencyAvailability: checked,
                  }))
                }
                title="Emergency availability"
                description="I can assist during urgent incidents when required."
              />
            </div>
          </Section>

          {/* Support */}
          <Section
            id="support"
            number="04"
            title="Support Assessment"
            description="These questions help us understand how you communicate and solve customer problems."
            icon={<Headphones className="h-5 w-5" />}
          >
            <Question
              number="01"
              title="Handling an angry customer"
              description="How would you handle an angry or frustrated customer?"
            >
              <TextField
                required
                name="handleAngryCustomer"
                value={formData.handleAngryCustomer}
                onChange={handleChange}
                placeholder="Describe how you would approach the customer and resolve the situation."
                rows={5}
              />
            </Question>

            <Question
              number="02"
              title="When you don't know the answer"
              description="If you don't know the solution to a customer's problem, what would you do?"
            >
              <TextField
                required
                name="handleUnknownSolution"
                value={formData.handleUnknownSolution}
                onChange={handleChange}
                placeholder="Explain the steps you would take."
                rows={5}
              />
            </Question>

            <Question
              number="03"
              title="Multiple customers"
              description="If several customers contact you at the same time, how would you prioritize them?"
            >
              <TextField
                required
                name="prioritizeMultipleCustomers"
                value={formData.prioritizeMultipleCustomers}
                onChange={handleChange}
                placeholder="Explain how you would prioritize tickets and communicate with customers."
                rows={5}
              />
            </Question>

            <Question
              number="04"
              title="Explaining technical problems"
              description="How would you explain a technical issue to someone with little or no technical knowledge?"
            >
              <TextField
                required
                name="explainTechnicalIssue"
                value={formData.explainTechnicalIssue}
                onChange={handleChange}
                placeholder="Explain your communication approach."
                rows={5}
              />
            </Question>

            <Question
              number="05"
              title="Minecraft server troubleshooting"
              description='A customer says: "My Minecraft server is not starting." What would you check first?'
            >
              <TextField
                required
                name="minecraftServerCheck"
                value={formData.minecraftServerCheck}
                onChange={handleChange}
                placeholder="Walk us through your troubleshooting process."
                rows={6}
              />
            </Question>
          </Section>

          {/* Salary */}
          <Section
            id="salary"
            number="05"
            title="Compensation"
            description="Please provide your expected monthly compensation."
            icon={<Wallet className="h-5 w-5" />}
          >
            <Field
              label="Expected Monthly Salary"
              required
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              placeholder="e.g. $500/month"
            />
          </Section>

          {/* Documents */}
          <Section
            id="documents"
            number="06"
            title="Documents"
            description="Please provide the documents required for application verification."
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

            <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />

                <p className="text-xs leading-5 text-gray-500">
                  Your documents are used only for application
                  verification and should be accessible only to
                  authorized Caspian Host staff.
                </p>
              </div>
            </div>
          </Section>

          {/* Final */}
          <Section
            id="final"
            number="07"
            title="Final Review"
            description="Tell us why you would be a good fit for the team."
            icon={<Check className="h-5 w-5" />}
          >
          <TextField
              label="Why should we hire you?"
              required
              name="whyHire"
              value={formData.whyHire}
              onChange={handleChange}
              placeholder="Tell us about your strengths, experience, communication skills, and why you would be a good fit for Caspian Host."
              rows={7}
            />

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
                I agree to follow Caspian Host&apos;s staff rules,
                maintain professionalism, and keep company/customer
                information confidential.
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
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </div>
            </div>
          </Section>
        </form>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] bg-[#090b0f]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-xs font-semibold text-gray-400">
            © {new Date().getFullYear()} Caspian Host
          </p>

          <p className="text-xs text-gray-600">
            Customer Support Recruitment
          </p>
        </div>
      </footer>

      <style jsx global>{`
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
   SECTION
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
      className="scroll-mt-24 overflow-hidden rounded-xl border border-white/[0.07] bg-[#090b0f]/80 shadow-[0_1px_3px_rgba(0,0,0,0.3)] backdrop-blur-xl"
    >
      <div className="border-b border-white/[0.06] px-5 py-6 sm:px-7">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
            {icon}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-cyan-400/70">
                {number}
              </span>

              <h2 className="text-base font-bold text-white sm:text-lg">
                {title}
              </h2>
            </div>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-7">
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   FIELD
------------------------------------------------------- */

function Field({
  label,
  icon,
  required,
  ...props
}: {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-gray-400">
        {label}

        {required && (
          <span className="ml-1 text-cyan-400">*</span>
        )}
      </span>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}

        <input
          {...props}
          required={required}
          className={`h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] text-sm text-white transition placeholder:text-gray-700 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-cyan-400/[0.025] focus:ring-2 focus:ring-cyan-400/[0.04] ${
            icon ? 'pl-10 pr-3.5' : 'px-3.5'
          }`}
        />
      </div>
    </label>
  );
}

/* -------------------------------------------------------
   SELECT
------------------------------------------------------- */

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

/* -------------------------------------------------------
   TEXTAREA
------------------------------------------------------- */

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

/* -------------------------------------------------------
   QUESTION
------------------------------------------------------- */

function Question({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/[0.06] pb-6 last:border-0 last:pb-0">
      <div className="mb-3 flex gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cyan-400/10 text-[9px] font-bold text-cyan-400">
          {number}
        </span>

        <div>
          <p className="text-sm font-semibold text-white">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

/* -------------------------------------------------------
   CHECKBOX CARD
------------------------------------------------------- */

function CheckboxCard({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition ${
        checked
          ? 'border-cyan-400/30 bg-cyan-400/[0.05]'
          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13]'
      }`}
    >
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
          checked
            ? 'border-cyan-400 bg-cyan-400'
            : 'border-white/20 bg-black/20'
        }`}
      >
        {checked && (
          <Check className="h-3 w-3 text-black" />
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-gray-500">
          {description}
        </p>
      </div>
    </button>
  );
}

/* -------------------------------------------------------
   FILE UPLOAD
------------------------------------------------------- */

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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  required?: boolean;
}) {
  return (
    <label className="block cursor-pointer">
      <span className="mb-2 block text-xs font-semibold text-gray-400">
        {label}

        {required && (
          <span className="ml-1 text-cyan-400">*</span>
        )}
      </span>

      <input
        type="file"
        name={name}
        required={required}
        onChange={onChange}
        accept={
          name === 'experienceLetter'
            ? '.pdf,.doc,.docx,.jpg,.jpeg,.png'
            : name === 'identityCard'
            ? '.pdf,.jpg,.jpeg,.png'
            : '.jpg,.jpeg,.png'
        }
        className="sr-only"
      />

      <div
        className={`rounded-lg border border-dashed p-5 transition ${
          file
            ? 'border-cyan-400/30 bg-cyan-400/[0.05]'
            : 'border-white/10 bg-white/[0.02] hover:border-cyan-400/25 hover:bg-cyan-400/[0.025]'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] shadow-sm ring-1 ring-white/10">
            {file ? (
              <Check className="h-4 w-4 text-cyan-400" />
            ) : (
              <Upload className="h-4 w-4 text-gray-500" />
            )}
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
                  {description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </label>
  );
}
