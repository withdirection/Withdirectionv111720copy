import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CustomSolutionCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1642522029686-5485ea7e6042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzcyOTg2Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-[#00A9E0]/5 to-white/98"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#14213D]">
          Need a Customized Solution?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          We're here to help create a service package that works for you. Every organization has unique needs, and we pride ourselves on delivering tailored solutions.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-[#00A9E0] text-white px-10 py-4 rounded-md hover:bg-[#303F9F] transition-all text-lg transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Discuss Your Needs
        </Link>
      </div>
    </section>
  );
}