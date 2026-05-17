import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import founderImage from 'figma:asset/4acb3df11b22d7fe2b088fe1b38993fda6755655.png';
import ridCDIBadge from 'figma:asset/b9125e6ce6eb6559f178515d3c8b3bcab697718d.png';
import ridLegalBadge from 'figma:asset/b419188d9dec6372f35d9f127676939c925ae88b.png';

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-[#14213D]">
            Meet the Founder
          </h2>
        </div>

        {/* Story */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto mb-12">
            <div className="space-y-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                My journey began at 20, volunteering at a Deaf film festival in the UK, interpreting between 
                British Sign Language and American Sign Language. That experience ignited a dedication to 
                excellence and inclusivity that continues today.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With over 20 years of experience—from the United Nations to Brooklyn's cultural institutions—I 
                bring the highest level of professionalism to international forums, government agencies, and 
                community organizations.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#00A9E0] hover:text-[#14213D] transition-colors text-lg"
              >
                Read More About Our Story
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="relative lg:pl-8">
              <div className="rounded-lg overflow-hidden shadow-2xl max-w-[280px] mx-auto lg:mx-0">
                <img
                  src={founderImage}
                  alt="Christopher Tester, Ph.D., CDI, SC:L - Founder of With Direction, LLC"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Credentials Banner */}
          <div className="max-w-6xl mx-auto bg-[#F5F7FA] rounded-lg p-8 border border-[#E6E9EF]">
            <div className="text-center mb-6">
              <h4 className="text-[#14213D] text-2xl mb-2 font-semibold">Christopher Tester, Ph.D., CDI, SC:L</h4>
              <p className="text-gray-600">Founder & Principal Interpreter</p>
            </div>
            
            {/* Credentials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <img src={ridCDIBadge} alt="RID CDI" className="w-12 h-12 flex-shrink-0" />
                <div>
                  <p className="text-[#14213D] text-sm font-medium">RID Certified Deaf Interpreter</p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <img src={ridLegalBadge} alt="RID SC:L" className="w-12 h-12 flex-shrink-0" />
                <div>
                  <p className="text-[#14213D] text-sm font-medium">RID Specialist Certificate: Legal</p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-sm">• WFD International Sign Interpreter</p>
                <p className="text-gray-600 text-sm">• AIIC Member</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-sm">• Doctorate in Interpretation</p>
                <p className="text-gray-600 text-sm">• 20+ Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}