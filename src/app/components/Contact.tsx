import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { SERVICE_OPTIONS } from '../data/services';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // The form has no delivery backend yet. Without an explicit handler the browser
  // performs a native GET to the current URL, which puts every named field —
  // name, email, phone, message — into the query string, where it is captured by
  // analytics as page_location and retained in browser history. Intercept it.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,169,224,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-[#14213D]">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to work together? We'd love to hear from you. Reach out to discuss your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-6 text-[#14213D]">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00A9E0]/20 rounded-lg flex items-center justify-center">
                    <MapPin className="text-[#00A9E0]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="text-lg text-[#14213D]">Brooklyn, NY</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00A9E0]/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-[#00A9E0]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href="mailto:info@withdirection.net"
                      className="text-lg text-[#00A9E0] hover:underline"
                    >
                      info@withdirection.net
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00A9E0]/20 rounded-lg flex items-center justify-center">
                    <Phone className="text-[#00A9E0]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone / VP</p>
                    <p className="text-lg text-[#14213D]">Contact us for details</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00A9E0]/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="text-[#00A9E0]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Communication</p>
                    <p className="text-lg text-[#14213D]">We welcome all forms of communication</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#00A9E0]/10 p-6 rounded-lg border border-[#00A9E0]/30">
              <h4 className="text-lg mb-2 text-[#14213D]">Office Hours</h4>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p className="text-gray-600">Weekend appointments available upon request</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#00A9E0]/10 p-8 rounded-lg border border-[#00A9E0]/30">
            <h3 className="text-2xl mb-6 text-[#14213D]">Send Us a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-[#14213D]">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0] bg-white text-[#14213D] placeholder-gray-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm mb-2 text-[#14213D]">
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0] bg-white text-[#14213D] placeholder-gray-400"
                  placeholder="Your organization"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-[#14213D]">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0] bg-white text-[#14213D] placeholder-gray-400"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm mb-2 text-[#14213D]">
                  Phone / VP
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0] bg-white text-[#14213D] placeholder-gray-400"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm mb-2 text-[#14213D]">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0] bg-white text-[#14213D]"
                >
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map(({ id, label }) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="serviceDate" className="block text-sm mb-2 text-[#14213D]">
                  Anticipated Date of Service
                </label>
                <input
                  type="date"
                  id="serviceDate"
                  name="serviceDate"
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0] bg-white text-[#14213D]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2 text-[#14213D]">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[#E6E9EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A9E0] bg-white text-[#14213D] placeholder-gray-400"
                  placeholder="Tell us about your needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00A9E0] text-white px-8 py-3 rounded-md hover:bg-[#14213D] transition-colors text-lg"
              >
                Send Message
              </button>

              {submitted ? (
                <p
                  role="status"
                  className="text-sm text-center text-[#14213D] bg-white border border-[#00A9E0] rounded-md px-4 py-3"
                >
                  Online submission is not connected yet. Please email{' '}
                  <a href="mailto:info@withdirection.net" className="text-[#00A9E0] underline">
                    info@withdirection.net
                  </a>{' '}
                  and we will respond directly.
                </p>
              ) : (
                <p className="text-sm text-gray-500 text-center">
                  We'll get back to you as soon as possible
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}