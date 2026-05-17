import { Mail, Phone, MapPin, Clock, Send, Calendar as CalendarIcon } from 'lucide-react';
import { Contact } from '../components/Contact';

export function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Get in <span className="text-[#00A9E0]">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to discuss your interpretation and accessibility needs? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF] text-center">
              <div className="w-12 h-12 bg-[#00A9E0] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">Email Us</h3>
              <a
                href="mailto:info@withdirection.net"
                className="text-[#303F9F] hover:text-[#00A9E0] transition-colors"
              >
                info@withdirection.net
              </a>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF] text-center">
              <div className="w-12 h-12 bg-[#303F9F] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={24} />
              </div>
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">Call Us</h3>
              <a
                href="tel:+15551234567"
                className="text-[#303F9F] hover:text-[#00A9E0] transition-colors"
              >
                (555) 123-4567
              </a>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF] text-center">
              <div className="w-12 h-12 bg-[#CB6CE6] rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={24} />
              </div>
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">Visit Us</h3>
              <p className="text-gray-700">Brooklyn, NY</p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF] text-center">
              <div className="w-12 h-12 bg-[#00A9E0] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">Business Hours</h3>
              <p className="text-gray-700">Mon-Fri: 9am-6pm EST</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <Contact />

      {/* Schedule Consultation Section */}
      <section className="py-16 lg:py-24 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 lg:p-12 border border-[#E6E9EF] shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A9E0]/10 rounded-full mb-6">
                <CalendarIcon className="text-[#00A9E0]" size={32} />
              </div>
              <h2 className="text-3xl lg:text-4xl text-[#14213D] mb-4">
                Schedule a Consultation
              </h2>
              <p className="text-xl text-gray-600">
                Book a free 30-minute consultation to discuss your specific needs
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="consult-name" className="block text-sm text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="consult-name"
                    className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="consult-email" className="block text-sm text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="consult-email"
                    className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="consult-phone" className="block text-sm text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="consult-phone"
                    className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="consult-org" className="block text-sm text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="consult-org"
                    className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                    placeholder="Your organization"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="consult-service" className="block text-sm text-gray-700 mb-2">
                  Service Interest *
                </label>
                <select
                  id="consult-service"
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                >
                  <option value="">Select a service...</option>
                  <option value="interpreting">Sign Language Interpreting</option>
                  <option value="corporate">Corporate Consulting</option>
                  <option value="government">Government & International</option>
                  <option value="video">Video Services</option>
                  <option value="training">Training & Workshops</option>
                  <option value="arts">Arts & Cultural Events</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="consult-date" className="block text-sm text-gray-700 mb-2">
                  Preferred Consultation Date/Time
                </label>
                <input
                  type="text"
                  id="consult-date"
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                  placeholder="e.g., March 15, 2026 at 2:00 PM"
                />
              </div>

              <div>
                <label htmlFor="consult-details" className="block text-sm text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  id="consult-details"
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0]"
                  placeholder="Tell us about your event, timeline, and any specific requirements..."
                />
              </div>

              <button className="w-full bg-[#00A9E0] text-white py-4 rounded-md hover:bg-[#303F9F] transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg">
                <CalendarIcon size={24} />
                Request Consultation
              </button>

              <p className="text-sm text-gray-600 text-center">
                We'll respond within 24 hours to confirm your consultation time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Response Promise */}
      <section className="py-12 bg-gradient-to-r from-[#00A9E0]/10 to-[#303F9F]/10 border-y border-[#E6E9EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl text-[#14213D] mb-4">We Respond Quickly</h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Most inquiries receive a response within 24 hours. For urgent requests, 
              please indicate this in your message and we'll prioritize accordingly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}