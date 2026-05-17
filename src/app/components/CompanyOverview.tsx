import { Shield, Target, Globe } from 'lucide-react';

export function CompanyOverview() {
  return (
    <section className="py-32 bg-[#14213D]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-24 mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-8 text-white leading-tight">
            Access with Intention. Direction with Purpose.
          </h2>
        </div>

        {/* Key Pillars */}
        <div className="grid md:grid-cols-3 gap-16">
          <div className="group text-center">
            <div className="mb-6 flex justify-center">
              <Shield className="text-[#00A9E0]" size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl mb-4 text-white">Deaf-Led Expertise</h3>
            <p className="text-gray-300 leading-relaxed">
              Lived linguistic knowledge centered in every engagement.
            </p>
          </div>

          <div className="group text-center">
            <div className="mb-6 flex justify-center">
              <Target className="text-[#00A9E0]" size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl mb-4 text-white">Intentional Coordination</h3>
            <p className="text-gray-300 leading-relaxed">
              Teams coordinated through long-term professional relationships.
            </p>
          </div>

          <div className="group text-center">
            <div className="mb-6 flex justify-center">
              <Globe className="text-[#00A9E0]" size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl mb-4 text-white">Multilingual Practice</h3>
            <p className="text-gray-300 leading-relaxed">
              Advancing diversity of sign languages globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}