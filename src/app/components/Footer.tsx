import { Link } from 'react-router';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#14213D] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-4">
              WITH<span className="text-[#00A9E0]">direction</span>
            </h3>
            <p className="text-gray-300">
              Deaf-led sign language interpreting and consulting firm based in Brooklyn, NY.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-[#00A9E0] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-[#00A9E0] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-gray-300 hover:text-[#00A9E0] transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-300 hover:text-[#00A9E0] transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/portal"
                  className="text-gray-300 hover:text-[#00A9E0] transition-colors"
                >
                  Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-[#00A9E0] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Brooklyn, NY</li>
              <li>
                <a href="mailto:info@withdirection.net" className="hover:text-[#00A9E0] transition-colors">
                  info@withdirection.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#303F9F] pt-8 text-center text-gray-300">
          <p>© {currentYear} WITHdirection. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Empowering Deaf professionals through tailored communication services
          </p>
          <p className="mt-4 text-xs text-gray-400">
            Image Credits: UN Photo, Unsplash contributors. Stock images used for illustrative purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}