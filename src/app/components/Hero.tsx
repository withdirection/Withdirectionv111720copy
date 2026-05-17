import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from 'figma:asset/997858107b29732b0dd439fdefc60f1ddbf7458c.png';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[60vh] flex items-center overflow-hidden bg-[#14213D]">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-50">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: '75% center' }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/95 from-0% via-[#14213D]/90 via-50% via-[#14213D]/70 via-70% to-[#00A9E0]/15"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl px-6 py-12 pt-32">
        <div className="max-w-4xl">
          <div className="inline-block px-4 py-2 bg-[#00A9E0]/20 border border-[#00A9E0]/30 mb-6">
            <p className="text-[#00A9E0] text-sm uppercase tracking-wider">Language. Strategy. Access</p>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            Reimagining<br />Communication<br />with Deaf<br />Expertise
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
            Expert sign language interpreting and strategic accessibility consulting. Deaf-led, research-informed, and built for institutional settings.
          </p>
          <div className="flex flex-col gap-4">
            <a 
              href="/consultation" 
              className="inline-block bg-[#00A9E0] text-white px-6 py-3 rounded-md hover:bg-[#303F9F] transition-all text-base transform hover:scale-105 shadow-lg hover:shadow-xl w-fit"
            >
              Request Consultation
            </a>
            <a 
              href="/contact" 
              className="text-white/70 hover:text-white transition-all text-sm underline underline-offset-4"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}