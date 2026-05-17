import unBuildingImage from 'figma:asset/52888f82f9233f93ae8e65c89009bbbf645f7b2c.png';
import conferenceImage from 'figma:asset/f8de3ca95d86129de658f03985c5b63b01ec54ce.png';
import bluePattern from 'figma:asset/bf45d3a67b22b59000eb0fa44033475e8a68fe85.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function UNSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#14213D] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img src={bluePattern} alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* UN Agencies and Global Partners */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl lg:text-3xl mb-6 text-white">
                United Nations Agencies and Global Partners
              </h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                WITHdirection provides interpreting services for UN agencies, global partners, and international forums—bringing the highest level of professionalism to global accessibility.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-[#CB6CE6] text-2xl mr-3">•</span>
                  <p className="text-gray-300">Interpreters are AIIC members and/or WFD-WASL IS Accredited</p>
                </div>
                <div className="flex items-start">
                  <span className="text-[#CB6CE6] text-2xl mr-3">•</span>
                  <p className="text-gray-300">International conference interpretation</p>
                </div>
                <div className="flex items-start">
                  <span className="text-[#CB6CE6] text-2xl mr-3">•</span>
                  <p className="text-gray-300">High-stakes diplomatic settings</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl max-w-md mx-auto">
                <img
                  src={unBuildingImage}
                  alt="United Nations headquarters with Global Goals for Sustainable Development"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="relative group">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
              <img
                src={conferenceImage}
                alt="Professional interpreters at international conference"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-white mb-2 font-semibold">Large-Scale Events</h4>
              <p className="text-gray-300">
                Expert interpretation for conferences, summits, and audiences of all sizes
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770308144171-77831cf9130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwY29uZmVyZW5jZSUyMG11bHRpbGluZ3VhbCUyMGV2ZW50fGVufDF8fHx8MTc3NDE0NTk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="International multilingual conference"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-white mb-2 font-semibold">Global Partnerships</h4>
              <p className="text-gray-300">
                Supporting multilingual communication at international forums and summits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}