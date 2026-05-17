import { LogIn, UserPlus, Briefcase, Users, FileText, Calendar, MessageSquare, Shield } from 'lucide-react';
import { useState } from 'react';

export function PortalPage() {
  const [activeTab, setActiveTab] = useState<'client' | 'interpreter'>('client');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Client & Interpreter <span className="text-[#00A9E0]">Portal</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Secure access for current clients and professional interpreters
            </p>
          </div>
        </div>
      </section>

      {/* Tab Selection */}
      <section className="py-8 bg-white border-b border-[#E6E9EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('client')}
              className={`flex-1 py-4 px-6 rounded-lg transition-all ${
                activeTab === 'client'
                  ? 'bg-[#00A9E0] text-white'
                  : 'bg-[#F5F7FA] text-[#14213D] hover:bg-[#E6E9EF]'
              }`}
            >
              <Briefcase className="inline-block mr-2" size={20} />
              Client Portal
            </button>
            <button
              onClick={() => setActiveTab('interpreter')}
              className={`flex-1 py-4 px-6 rounded-lg transition-all ${
                activeTab === 'interpreter'
                  ? 'bg-[#00A9E0] text-white'
                  : 'bg-[#F5F7FA] text-[#14213D] hover:bg-[#E6E9EF]'
              }`}
            >
              <Users className="inline-block mr-2" size={20} />
              Interpreter Portal
            </button>
          </div>
        </div>
      </section>

      {/* Client Portal Content */}
      {activeTab === 'client' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Login Card */}
              <div className="bg-[#F5F7FA] rounded-lg p-8 border border-[#E6E9EF]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#00A9E0] rounded-lg flex items-center justify-center">
                    <LogIn className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl text-[#14213D]">Existing Clients</h2>
                </div>
                <p className="text-gray-700 mb-6">
                  Access your account to manage bookings, view invoices, and communicate with our team.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="client-email" className="block text-sm text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="client-email"
                      className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="client-password" className="block text-sm text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="client-password"
                      className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#00A9E0] text-white py-3 rounded-md hover:bg-[#303F9F] transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="w-full text-[#303F9F] text-sm hover:underline"
                  >
                    Forgot Password?
                  </button>
                </form>
              </div>

              {/* New Client Card */}
              <div className="bg-gradient-to-br from-[#00A9E0]/10 to-[#303F9F]/10 rounded-lg p-8 border border-[#E6E9EF]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#00A9E0] rounded-lg flex items-center justify-center">
                    <UserPlus className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl text-[#14213D]">New Clients</h2>
                </div>
                <p className="text-gray-700 mb-6">
                  First time working with us? Create an account to streamline your booking experience.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-[#00A9E0] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Easy online booking and scheduling</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="text-[#00A9E0] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Access invoices and payment history</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="text-[#00A9E0] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Direct communication with your team</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="text-[#00A9E0] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Secure, confidential document sharing</span>
                  </div>
                </div>
                <button className="w-full bg-[#CB6CE6] text-white py-3 rounded-md hover:bg-[#303F9F] transition-colors">
                  Create Account
                </button>
              </div>
            </div>

            {/* Client Portal Features */}
            <div className="bg-[#F5F7FA] rounded-lg p-8 border border-[#E6E9EF]">
              <h3 className="text-2xl text-[#14213D] mb-6">Client Portal Features</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg text-[#14213D] mb-2">Manage Bookings</h4>
                  <p className="text-gray-700 text-sm">
                    View upcoming appointments, request changes, and access interpreter details.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg text-[#14213D] mb-2">Billing & Invoices</h4>
                  <p className="text-gray-700 text-sm">
                    Download invoices, track payments, and manage billing information.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg text-[#14213D] mb-2">Secure Communication</h4>
                  <p className="text-gray-700 text-sm">
                    Share event materials, communicate needs, and provide feedback securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interpreter Portal Content */}
      {activeTab === 'interpreter' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Login Card */}
              <div className="bg-[#F5F7FA] rounded-lg p-8 border border-[#E6E9EF]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#00A9E0] rounded-lg flex items-center justify-center">
                    <LogIn className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl text-[#14213D]">Current Interpreters</h2>
                </div>
                <p className="text-gray-700 mb-6">
                  Access your interpreter dashboard to view assignments, submit timesheets, and more.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="interpreter-email" className="block text-sm text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="interpreter-email"
                      className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="interpreter-password" className="block text-sm text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="interpreter-password"
                      className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#00A9E0] text-white py-3 rounded-md hover:bg-[#303F9F] transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="w-full text-[#303F9F] text-sm hover:underline"
                  >
                    Forgot Password?
                  </button>
                </form>
              </div>

              {/* Join Our Team Card */}
              <div className="bg-gradient-to-br from-[#00A9E0]/10 to-[#CB6CE6]/10 rounded-lg p-8 border border-[#E6E9EF]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#CB6CE6] rounded-lg flex items-center justify-center">
                    <UserPlus className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl text-[#14213D]">Join Our Team</h2>
                </div>
                <p className="text-gray-700 mb-6">
                  Interested in working with WITHdirection? We're always looking for skilled, 
                  professional interpreters to join our network.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="text-[#00A9E0] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Work with prestigious clients and organizations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-[#00A9E0] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Flexible scheduling and diverse assignments</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="text-[#00A9E0] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Supportive, Deaf-led team environment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="text-[#00A9E0] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Professional development opportunities</span>
                  </div>
                </div>
                <button className="w-full bg-[#CB6CE6] text-white py-3 rounded-md hover:bg-[#303F9F] transition-colors mb-3">
                  Apply to Join
                </button>
                <p className="text-sm text-gray-600 text-center">
                  Requirements: Valid certification, 2+ years experience
                </p>
              </div>
            </div>

            {/* Interpreter Portal Features */}
            <div className="bg-[#F5F7FA] rounded-lg p-8 border border-[#E6E9EF]">
              <h3 className="text-2xl text-[#14213D] mb-6">Interpreter Portal Features</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg text-[#14213D] mb-2">Assignment Management</h4>
                  <p className="text-gray-700 text-sm">
                    View available assignments, confirm bookings, and access event details and materials.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg text-[#14213D] mb-2">Timesheets & Payment</h4>
                  <p className="text-gray-700 text-sm">
                    Submit hours, track payments, and manage your payment preferences securely.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg text-[#14213D] mb-2">Professional Development</h4>
                  <p className="text-gray-700 text-sm">
                    Access training materials, workshops, and continuing education opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Security Notice */}
      <section className="py-8 bg-gradient-to-r from-[#00A9E0]/10 to-[#CB6CE6]/10 border-t border-[#E6E9EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Shield className="text-[#00A9E0] flex-shrink-0" size={24} />
            <div>
              <h3 className="text-lg text-[#14213D] mb-2">Secure & Confidential</h3>
              <p className="text-gray-700 text-sm">
                All portal access is encrypted and secure. We take your privacy seriously and never 
                share your information with third parties. For support with portal access, contact us 
                at <a href="mailto:support@withdirection.net" className="text-[#00A9E0] hover:underline">support@withdirection.net</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}