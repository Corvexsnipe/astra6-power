'use client';

import { useState, useCallback } from 'react';
import { X, Download } from 'lucide-react';

interface StaffApplication {
  id: number;
  application_id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface CustomerSupportApplication {
  id: number;
  application_id: string;
  full_name: string;
  email: string;
  age: number;
  country: string;
  city: string;
  contact_number: string;
  languages: string;
  previous_experience: string;
  has_hosting_experience: boolean;
  hosting_experience_details: string;
  experience_letter_base64: string;
  daily_hours: number;
  weekend_availability: boolean;
  emergency_availability: boolean;
  handle_angry_customer: string;
  handle_unknown_solution: string;
  prioritize_multiple_customers: string;
  explain_technical_issue: string;
  minecraft_server_check: string;
  expected_salary: string;
  identity_card_base64: string;
  passport_photo_base64: string;
  why_hire: string;
  agree_to_rules: boolean;
  created_at: string;
}

interface SalesApplication {
  id: number;
  application_id: string;
  full_name: string;
  email: string;
  age: number;
  country: string;
  city: string;
  contact_number: string;
  languages: string;
  previous_experience: string;
  hosting_experience: string;
  experience_letter_base64: string;
  daily_hours: string;
  weekend_availability: boolean;
  emergency_availability: boolean;
  expected_salary: string;
  convince_customer: string;
  expensive_response: string;
  minecraft_server_info: string;
  ram_cpu_difference: string;
  lag_diagnosis: string;
  identity_card_base64: string;
  passport_photo_base64: string;
  why_hire: string;
  agree_to_rules: boolean;
  created_at: string;
}

interface TechnicalSupportApplication {
  id: number;
  application_id: string;
  full_name: string;
  email: string;
  age: number;
  country: string;
  city: string;
  contact_number: string;
  languages: string;
  documents_availability: string;
  compensation: string;
  pterodactyl_panel: string;
  paymenter_panel: string;
  proxmox: string;
  vmware: string;
  linux: string;
  developing_ideas: string;
  identity_card_base64: string;
  passport_photo_base64: string;
  agree_to_rules: boolean;
  created_at: string;
}

const ADMIN_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'killerlandop12@gmail.com',
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Khatne123!!',
};

function ApplicationDetails({ application }: { application: CustomerSupportApplication | SalesApplication }) {
  const booleanFields = ['has_hosting_experience', 'weekend_availability', 'emergency_availability', 'agree_to_rules'];
  return (
    <div className="bg-gray-900/50 rounded-lg p-3">
      <h4 className="text-xs font-semibold text-cyan-400 mb-2">Application Details</h4>
      <dl className="space-y-3 text-xs">
        {Object.entries(application)
          .filter(([key]) => !['id', 'created_at', 'discord_username'].includes(key) && !key.endsWith('_base64') && !key.endsWith('_path'))
          .map(([key, value]) => (
            <div key={key}>
              <dt className="text-gray-400 capitalize">{key.replaceAll('_', ' ')}</dt>
              <dd className="text-white whitespace-pre-wrap break-words mt-1">
                {value === null || value === undefined || value === '' ? 'Not provided' : booleanFields.includes(key)
                  ? (value === true || value === 1 || value === '1' ? 'Yes' : 'No') : String(value)}
              </dd>
            </div>
          ))}
      </dl>
    </div>
  );
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'staff' | 'customer-support' | 'sales' | 'technical-support'>('staff');
  const [staffApplications, setStaffApplications] = useState<StaffApplication[]>([]);
  const [customerSupportApplications, setCustomerSupportApplications] = useState<CustomerSupportApplication[]>([]);
  const [salesApplications, setSalesApplications] = useState<SalesApplication[]>([]);
  const [technicalSupportApplications, setTechnicalSupportApplications] = useState<TechnicalSupportApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedApplication, setExpandedApplication] = useState<number | null>(null);
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setLoginError('');
      void fetchApplications();
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    const errors: string[] = [];
    await Promise.all([
      ['staff', setStaffApplications],
      ['customer-support', setCustomerSupportApplications],
      ['sales', setSalesApplications],
      ['technical-support', setTechnicalSupportApplications],
    ].map(async ([category, setApplications]) => {
      try {
        const response = await fetch(`/api/${category}-applications`, { cache: 'no-store' });
        const data = await response.json();
        if (!response.ok || !Array.isArray(data.applications)) throw new Error('Invalid application response');
        if (typeof setApplications === 'function') setApplications(data.applications);
      } catch {
        errors.push(`Unable to load ${category} applications. Please refresh or check server logs.`);
      }
    }));
    setError(errors.length ? errors.join(' ') : null);
    setLoading(false);
  }, []);

  const handleDeleteStaff = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const response = await fetch(`/api/staff-applications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStaffApplications(staffApplications.filter((app) => app.id !== id));
      } else {
        setError('Failed to delete application');
      }
    } catch {
      setError('Error deleting application');
    }
  };

  const handleDeleteCustomerSupport = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const response = await fetch(`/api/customer-support-applications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCustomerSupportApplications(customerSupportApplications.filter((app) => app.id !== id));
      } else {
        setError('Failed to delete application');
      }
    } catch {
      setError('Error deleting application');
    }
  };

  const handleDeleteSales = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const response = await fetch(`/api/sales-applications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSalesApplications(salesApplications.filter((app) => app.id !== id));
      } else {
        setError('Failed to delete application');
      }
    } catch {
      setError('Error deleting application');
    }
  };

  const handleDeleteTechnicalSupport = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const response = await fetch(`/api/technical-support-applications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTechnicalSupportApplications(technicalSupportApplications.filter((app) => app.id !== id));
      } else {
        setError('Failed to delete application');
      }
    } catch {
      setError('Error deleting application');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h1 className="text-3xl font-bold text-white mb-2 text-center">Admin Login</h1>
            <p className="text-gray-400 text-center mb-8">Enter your credentials to access the admin panel</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your password"
                />
              </div>

              {loginError && (
                <div className="p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-300 text-center">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">View and manage applications</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={fetchApplications}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'staff' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Staff Applications ({staffApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('customer-support')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'customer-support' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Customer Support Applications ({customerSupportApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Sales Applications ({salesApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('technical-support')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'technical-support' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Technical Support Applications ({technicalSupportApplications.length})
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {activeTab === 'staff' ? (
          <>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-gray-400 mt-4">Loading applications...</p>
              </div>
            ) : staffApplications.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700">
                <p className="text-gray-400 text-lg">No staff applications yet</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {staffApplications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-400/30 hover:bg-gray-800/70 transition overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{application.name}</h3>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/30 rounded text-xs font-mono text-cyan-400">
                            {application.application_id}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mb-3">{application.email}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs">
                          {new Date(application.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setExpandedApplication(expandedApplication === application.id ? null : application.id)}
                            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-medium rounded-lg transition"
                          >
                            {expandedApplication === application.id ? 'Hide' : 'View'}
                          </button>
                          <button
                            onClick={() => handleDeleteStaff(application.id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {expandedApplication === application.id && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <div className="bg-gray-900/50 rounded-lg p-3">
                            <p className="text-gray-300 text-xs whitespace-pre-wrap">{application.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : activeTab === 'customer-support' ? (
          <>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-gray-400 mt-4">Loading applications...</p>
              </div>
            ) : customerSupportApplications.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700">
                <p className="text-gray-400 text-lg">No customer support applications yet</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {customerSupportApplications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-400/30 hover:bg-gray-800/70 transition overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{application.full_name}</h3>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-green-400/10 border border-green-400/30 rounded text-xs font-mono text-green-400">
                            {application.application_id}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mb-1">{application.email}</p>
                      <p className="text-gray-500 text-xs mb-3">{application.country}, {application.city}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs">
                          {new Date(application.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setExpandedApplication(expandedApplication === application.id ? null : application.id)}
                            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-medium rounded-lg transition"
                          >
                            {expandedApplication === application.id ? 'Hide' : 'View'}
                          </button>
                          <button
                            onClick={() => handleDeleteCustomerSupport(application.id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {expandedApplication === application.id && (
                        <div className="mt-4 pt-4 border-t border-gray-700 space-y-3 max-h-96 overflow-y-auto">
                          <ApplicationDetails application={application} />
                          <div className="bg-gray-900/50 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-cyan-400 mb-2">Documents</h4>
                            <div className="flex flex-wrap gap-2">
                              {application.identity_card_base64 && (
                                <button
                                  onClick={() => setModalImage({ src: `data:image/*;base64,${application.identity_card_base64}`, title: 'Identity Card' })}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
                                >
                                  ID Card
                                </button>
                              )}
                              {application.passport_photo_base64 && (
                                <button
                                  onClick={() => setModalImage({ src: `data:image/*;base64,${application.passport_photo_base64}`, title: 'Passport Photo' })}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
                                >
                                  Photo
                                </button>
                              )}
                              {application.experience_letter_base64 && (
                                <a
                                  href={`data:application/pdf;base64,${application.experience_letter_base64}`}
                                  download="experience_letter.pdf"
                                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition"
                                >
                                  Experience Letter
                                </a>
                              )}
                              {!application.identity_card_base64 && !application.passport_photo_base64 && !application.experience_letter_base64 && (
                                <p className="text-gray-500 text-xs">No documents</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : activeTab === 'sales' ? (
          <>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-gray-400 mt-4">Loading applications...</p>
              </div>
            ) : salesApplications.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700">
                <p className="text-gray-400 text-lg">No sales applications yet</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {salesApplications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-400/30 hover:bg-gray-800/70 transition overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{application.full_name}</h3>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-green-400/10 border border-green-400/30 rounded text-xs font-mono text-green-400">
                            {application.application_id}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mb-1">{application.email}</p>
                      <p className="text-gray-500 text-xs mb-3">{application.country}, {application.city}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs">
                          {new Date(application.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setExpandedApplication(expandedApplication === application.id ? null : application.id)}
                            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-medium rounded-lg transition"
                          >
                            {expandedApplication === application.id ? 'Hide' : 'View'}
                          </button>
                          <button
                            onClick={() => handleDeleteSales(application.id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {expandedApplication === application.id && (
                        <div className="mt-4 pt-4 border-t border-gray-700 space-y-3 max-h-96 overflow-y-auto">
                          <ApplicationDetails application={application} />
                          <div className="bg-gray-900/50 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-cyan-400 mb-2">Documents</h4>
                            <div className="flex flex-wrap gap-2">
                              {application.identity_card_base64 && (
                                <button
                                  onClick={() => setModalImage({ src: `data:image/*;base64,${application.identity_card_base64}`, title: 'Identity Card' })}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
                                >
                                  ID Card
                                </button>
                              )}
                              {application.passport_photo_base64 && (
                                <button
                                  onClick={() => setModalImage({ src: `data:image/*;base64,${application.passport_photo_base64}`, title: 'Passport Photo' })}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
                                >
                                  Photo
                                </button>
                              )}
                              {application.experience_letter_base64 && (
                                <a
                                  href={`data:application/pdf;base64,${application.experience_letter_base64}`}
                                  download="experience_letter.pdf"
                                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition"
                                >
                                  Experience Letter
                                </a>
                              )}
                              {!application.identity_card_base64 && !application.passport_photo_base64 && !application.experience_letter_base64 && (
                                <p className="text-gray-500 text-xs">No documents</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : activeTab === 'technical-support' ? (
          <>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-gray-400 mt-4">Loading applications...</p>
              </div>
            ) : technicalSupportApplications.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700">
                <p className="text-gray-400 text-lg">No technical support applications yet</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {technicalSupportApplications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-400/30 hover:bg-gray-800/70 transition overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{application.full_name}</h3>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-purple-400/10 border border-purple-400/30 rounded text-xs font-mono text-purple-400">
                            {application.application_id}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mb-1">{application.email}</p>
                      <p className="text-gray-500 text-xs mb-3">{application.country}, {application.city}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs">
                          {new Date(application.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setExpandedApplication(expandedApplication === application.id ? null : application.id)}
                            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-medium rounded-lg transition"
                          >
                            {expandedApplication === application.id ? 'Hide' : 'View'}
                          </button>
                          <button
                            onClick={() => handleDeleteTechnicalSupport(application.id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {expandedApplication === application.id && (
                        <div className="mt-4 pt-4 border-t border-gray-700 space-y-3 max-h-96 overflow-y-auto">
                          <div className="bg-gray-900/50 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-cyan-400 mb-2">Personal Information</h4>
                            <div className="space-y-2 text-xs">
                              <div><span className="text-gray-500">Age:</span> <span className="text-white">{application.age}</span></div>
                              <div><span className="text-gray-500">Location:</span> <span className="text-white">{application.country}, {application.city}</span></div>
                              <div><span className="text-gray-500">Contact:</span> <span className="text-white">{application.contact_number}</span></div>
                              <div><span className="text-gray-500">Languages:</span> <span className="text-white">{application.languages}</span></div>
                            </div>
                          </div>

                          <div className="bg-gray-900/50 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-cyan-400 mb-2">Documents & Compensation</h4>
                            <div className="space-y-2 text-xs">
                              <div><span className="text-gray-500">Documents Available:</span> <span className="text-white">{application.documents_availability}</span></div>
                              <div><span className="text-gray-500">Expected Compensation:</span> <span className="text-white">{application.compensation}</span></div>
                            </div>
                          </div>

                          <div className="bg-gray-900/50 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-cyan-400 mb-2">Technical Skills</h4>
                            <div className="space-y-2 text-xs">
                              <div><span className="text-gray-500">Pterodactyl:</span> <span className="text-white text-xs leading-relaxed whitespace-pre-wrap break-words">{application.pterodactyl_panel || 'Not provided'}</span></div>
                              <div><span className="text-gray-500">Paymenter:</span> <span className="text-white text-xs leading-relaxed whitespace-pre-wrap break-words">{application.paymenter_panel || 'Not provided'}</span></div>
                              <div><span className="text-gray-500">Proxmox:</span> <span className="text-white text-xs leading-relaxed whitespace-pre-wrap break-words">{application.proxmox || 'Not provided'}</span></div>
                              <div><span className="text-gray-500">VMware:</span> <span className="text-white text-xs leading-relaxed whitespace-pre-wrap break-words">{application.vmware || 'Not provided'}</span></div>
                              <div><span className="text-gray-500">Linux:</span> <span className="text-white text-xs leading-relaxed whitespace-pre-wrap break-words">{application.linux || 'Not provided'}</span></div>
                              <div><span className="text-gray-500">Developing Ideas:</span> <span className="text-white text-xs leading-relaxed whitespace-pre-wrap break-words">{application.developing_ideas || 'Not provided'}</span></div>
                            </div>
                          </div>

                          <div className="bg-gray-900/50 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-cyan-400 mb-2">Documents</h4>
                            <div className="flex flex-wrap gap-2">
                              {application.identity_card_base64 && (
                                <button
                                  onClick={() => setModalImage({ src: `data:image/*;base64,${application.identity_card_base64}`, title: 'Identity Card' })}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
                                >
                                  ID Card
                                </button>
                              )}
                              {application.passport_photo_base64 && (
                                <button
                                  onClick={() => setModalImage({ src: `data:image/*;base64,${application.passport_photo_base64}`, title: 'Passport Photo' })}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
                                >
                                  Photo
                                </button>
                              )}
                              {!application.identity_card_base64 && !application.passport_photo_base64 && (
                                <p className="text-gray-500 text-xs">No documents</p>
                              )}
                            </div>
                          </div>

                          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3">
                            <p className="text-xs text-yellow-400 font-semibold">⚠️ Interview Notice</p>
                            <p className="text-xs text-gray-300 mt-1">
                              This applicant will be interviewed live on Google Meet where their technical skills will be tested.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">{modalImage.title}</h3>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = modalImage.src;
                    link.download = `${modalImage.title.toLowerCase().replace(/\s+/g, '_')}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
                >
                  <Download className="h-3 w-3" />
                  Download
                </button>
              </div>

              <div className="p-4 bg-gray-800">
                <img
                  src={modalImage.src}
                  alt={modalImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
