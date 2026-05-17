import { Building2, MapPin } from 'lucide-react';
import logo from '../../imports/WD_Logo_copy.svg';

const partners = [
  {
    name: "Whitney Museum of American Art",
    type: "Cultural Institution",
    location: "Manhattan, NY"
  },
  {
    name: "The Drawing Center",
    type: "Arts Organization",
    location: "SoHo, NY"
  },
  {
    name: "Brooklyn Museum",
    type: "Cultural Institution",
    location: "Brooklyn, NY"
  },
  {
    name: "NYC Government Contracts",
    type: "Public Sector",
    location: "New York City"
  }
];

export function Partnerships() {
  return (
    <section id="partnerships" className="py-16 lg:py-24 bg-[#14213D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-white">
            Trusted Partnerships
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proud to serve leading cultural institutions, government agencies, and organizations throughout NYC and beyond
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-center hover:border-[#00A9E0] hover:bg-white/15 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <Building2 className="text-[#00A9E0] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-lg mb-1 text-white">{partner.name}</h3>
                  <p className="text-sm text-gray-300 mb-1">{partner.type}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={12} />
                    {partner.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
          <img src={logo} alt="WD Logo" className="mx-auto mb-4" style={{ width: '48px' }} />
          <h3 className="text-2xl mb-4 text-white">
            Join Our Network
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Interested in partnering with us? We're always looking to build meaningful relationships with organizations that value accessibility and inclusion.
          </p>
        </div>
      </div>
    </section>
  );
}