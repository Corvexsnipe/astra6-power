'use client';

import { useState } from 'react';
import {
  User,
  Briefcase,
  Clock,
  DollarSign,
  TrendingUp,
  Check,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Upload,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Globe,
} from 'lucide-react';

interface FormDataType {
  fullName: string;
  age: string;
  country: string;
  city: string;
  email: string;
  contactNumber: string;
  languages: string;
  previousExperience: string;
  hostingExperience: string;
  dailyHours: string;
  weekendAvailability: boolean;
  emergencyAvailability: boolean;
  expectedSalary: string;
  convinceCustomer: string;
  expensiveResponse: string;
  minecraftServerInfo: string;
  ramCpuDifference: string;
  lagDiagnosis: string;
  whyHire: string;
  agreeToRules: boolean;
}

interface FilesType {
  experienceLetter: File | null;
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
  previousExperience: '',
  hostingExperience: '',
  dailyHours: '',
  weekendAvailability: false,
  emergencyAvailability: false,
  expectedSalary: '',
  convinceCustomer: '',
  expensiveResponse: '',
  minecraftServerInfo: '',
  ramCpuDifference: '',
  lagDiagnosis: '',
  whyHire: '',
  agreeToRules: false,
};

const INITIAL_FILES: FilesType = {
  experienceLetter: null,
  identityCard: null,
  passportPhoto: null,
};

const STEPS = [
  { id: 'personal', label: 'Basic Information' },
  { id: 'experience', label: 'Experience' },
  { id: 'availability', label: 'Availability' },
  { id: 'salary', label: 'Expected Salary' },
  { id: 'sales', label: 'Sales Related' },
  { id: 'documents', label: 'Documents' },
  { id: 'final', label: 'Final Review' },
];

const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahrain',
  'Bangladesh',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Estonia',
  'Ethiopia',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Guatemala',
  'Guinea',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Libya',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Myanmar',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Panama',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Somalia',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

export default function SalesApplication() {
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM);
  const [files, setFiles] = useState<FilesType>(INITIAL_FILES);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
    if (files && files[0]) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
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
    if (step.id === 'experience') {
      return formData.previousExperience && formData.hostingExperience;
    }
    if (step.id === 'availability') {
      return formData.dailyHours;
    }
    if (step.id === 'salary') {
      return formData.expectedSalary;
    }
    if (step.id === 'sales') {
      return (
        formData.convinceCustomer &&
        formData.expensiveResponse &&
        formData.minecraftServerInfo &&
        formData.ramCpuDifference &&
        formData.lagDiagnosis
      );
    }
    if (step.id === 'final') {
      return formData.whyHire && formData.agreeToRules;
    }
    return false;
  }).length;

  const progress = Math.round((completed / STEPS.length) * 100);

  const goTo = (stepId: string) => {
    setActiveStep(stepId);
    setMobileStepsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value));
      });

      // Add files
      if (files.experienceLetter) {
        formDataToSend.append('experienceLetter', files.experienceLetter);
      }
      if (files.identityCard) {
        formDataToSend.append('identityCard', files.identityCard);
      }
      if (files.passportPhoto) {
        formDataToSend.append('passportPhoto', files.passportPhoto);
      }

      const response = await fetch('/api/sales-applications', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        // Show loading animation for 2-3 seconds, then show success
        setTimeout(() => {
          setSubmitting(false);
          setShowSuccess(true);
          // Reset form
          setFormData(INITIAL_FORM);
          setFiles(INITIAL_FILES);
        }, 2500);
      } else {
        setSubmitting(false);
        alert(data.error || 'Failed to submit application');
      }
    } catch (error) {
      setSubmitting(false);
      alert('Error submitting application. Please try again.');
    }
  };

  if (showSuccess) {
    return (
      <main className="min-h-screen bg-[#050608] text-white flex items-center justify-center">
        <div className="text-center px-5">
          <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30">
            <Check className="h-10 w-10 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
          <p className="text-gray-400 text-lg">Check your email for more information.</p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
          >
            Return to Home
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </main>
    );
  }

  if (submitting) {
    return (
      <main className="min-h-screen bg-[#050608] text-white flex items-center justify-center">
        <div className="text-center px-5">
          <div className="mb-6 relative h-20 w-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"></div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Submitting Application...</h1>
          <p className="text-gray-400">Please wait while we process your application</p>
        </div>
      </main>
    );
  }

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
              Sales Executive
              <br />
              <span className="text-gray-400">
                Staff Application
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              Join the Caspian Host sales team and help grow our customer base. We are looking for people who can communicate effectively, understand customer needs, and close deals with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                Sales & Growth
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" />
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
          {/* Personal */}
          <Section
            id="personal"
            number="01"
            title="Basic Information"
            description="Tell us about yourself"
            icon={<User className="h-5 w-5" />}
          >
            <div className="grid gap-5 sm:grid-cols-2">
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
                name="age"
                value={formData.age}
                onChange={handleChange}
                type="number"
                placeholder="18"
                min="16"
                max="99"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
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
                placeholder="New York"
              />
            </div>

            <Field
              label="Email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="john@example.com"
              icon={<Mail className="h-4 w-4" />}
            />

            <Field
              label="Contact Number"
              required
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              type="tel"
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
          </Section>

          {/* Experience */}
          <Section
            id="experience"
            number="02"
            title="Experience"
            description="Your professional background"
            icon={<Briefcase className="h-5 w-5" />}
          >
            <TextField
              label="Do you have any previous experience in sales or customer support? If yes, briefly explain."
              required
              name="previousExperience"
              value={formData.previousExperience}
              onChange={handleChange}
              placeholder="Describe your relevant experience, roles, and achievements..."
              rows={4}
            />

            <TextField
              label="Have you worked for a hosting company or any online business before? If yes, tell us about your role."
              required
              name="hostingExperience"
              value={formData.hostingExperience}
              onChange={handleChange}
              placeholder="Company, position, responsibilities, achievements..."
              rows={4}
            />
          </Section>

          {/* Availability */}
          <Section
            id="availability"
            number="03"
            title="Availability"
            description="Your work schedule"
            icon={<Clock className="h-5 w-5" />}
          >
            <TextField
              label="How many hours can you work per day?"
              required
              name="dailyHours"
              value={formData.dailyHours}
              onChange={handleChange}
              placeholder="e.g., 6-8 hours"
              rows={2}
            />

            <div className="space-y-3">
              <CheckboxCard
                checked={formData.weekendAvailability}
                onChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    weekendAvailability: checked,
                  }))
                }
                title="Available on weekends"
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
                title="Available during emergencies"
                description="I can be available during emergency situations when needed."
              />
            </div>
          </Section>

          {/* Salary */}
          <Section
            id="salary"
            number="04"
            title="Expected Salary"
            description="Your compensation expectations"
            icon={<DollarSign className="h-5 w-5" />}
          >
            <TextField
              label="What is your expected monthly salary?"
              required
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              placeholder="e.g., $500-800 per month"
              rows={2}
            />
          </Section>

          {/* Sales */}
          <Section
            id="sales"
            number="05"
            title="Sales Related"
            description="Your sales skills and knowledge"
            icon={<TrendingUp className="h-5 w-5" />}
          >
            <div className="space-y-6">
              <Question
                number="1"
                title="Convincing customers"
                description="How would you convince a customer to purchase a hosting plan from Caspian Host?"
              >
                <TextField
                  name="convinceCustomer"
                  value={formData.convinceCustomer}
                  onChange={handleChange}
                  placeholder="Explain your approach to highlighting benefits, addressing concerns, and closing the sale..."
                  rows={4}
                />
              </Question>

              <Question
                number="2"
                title="Handling price objections"
                description='If a customer says, "Your hosting is too expensive," how would you respond?'
              >
                <TextField
                  name="expensiveResponse"
                  value={formData.expensiveResponse}
                  onChange={handleChange}
                  placeholder="How would you address this concern and demonstrate value..."
                  rows={4}
                />
              </Question>

              <Question
                number="3"
                title="Minecraft server requirements"
                description="If a customer wants a Minecraft server for 10–20 players, what information would you ask before recommending a plan?"
              >
                <TextField
                  name="minecraftServerInfo"
                  value={formData.minecraftServerInfo}
                  onChange={handleChange}
                  placeholder="List the questions you would ask to recommend the right plan..."
                  rows={4}
                />
              </Question>

              <Question
                number="4"
                title="Technical knowledge"
                description="What is the difference between RAM and CPU, and how can each affect a game server's performance?"
              >
                <TextField
                  name="ramCpuDifference"
                  value={formData.ramCpuDifference}
                  onChange={handleChange}
                  placeholder="Explain the technical differences and their impact on server performance..."
                  rows={4}
                />
              </Question>

              <Question
                number="5"
                title="Troubleshooting lag"
                description="A customer has a 30-player Minecraft server and complains about lag. They want to upgrade their plan. How would you determine whether the issue is caused by RAM, CPU, network, plugins/mods, or server configuration before recommending an upgrade?"
              >
                <TextField
                  name="lagDiagnosis"
                  value={formData.lagDiagnosis}
                  onChange={handleChange}
                  placeholder="Describe your diagnostic process and the questions you would ask..."
                  rows={5}
                />
              </Question>
            </div>
          </Section>

          {/* Documents */}
          <Section
            id="documents"
            number="06"
            title="Documents"
            description="Required documents for verification"
            icon={<Upload className="h-5 w-5" />}
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

            <FileUpload
              label="Experience Letter (Optional)"
              description="Optional • PDF, JPG or PNG"
              name="experienceLetter"
              file={files.experienceLetter}
              onChange={handleFileChange}
            />
          </Section>

          {/* Final */}
          <Section
            id="final"
            number="07"
            title="Final Review"
            description="Complete your application"
            icon={<Check className="h-5 w-5" />}
          >
            <TextField
              label="Why should we hire you as a Sales Staff member?"
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
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-xs font-semibold text-gray-400">
            © {new Date().getFullYear()} Caspian Host
          </p>

          <p className="text-xs text-gray-600">
            Sales Executive Recruitment
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
   INPUT
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
          accept="image/*,.pdf"
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
