import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router';

const featuredEvents = [
  {
    title: 'ASL Tour: Contemporary Art',
    organization: 'Whitney Museum',
    date: 'March 15',
    type: 'ASL Interpreted',
    color: 'bg-[#CB6CE6]'
  },
  {
    title: 'Deaf Artists Showcase',
    organization: 'Brooklyn Museum',
    date: 'March 22',
    type: 'Deaf-Led',
    color: 'bg-[#00A9E0]'
  },
  {
    title: 'Community Sign Social',
    organization: 'Brooklyn Public Library',
    date: 'April 5',
    type: 'Deaf-Led',
    color: 'bg-[#00A9E0]'
  },
];

export function CommunityBanner() {
  return (
    <section className="py-16 lg:py-24 bg-[#14213D] text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#303F9F]/30 via-transparent to-[#00A9E0]/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A9E0]/20 rounded-full mb-6">
            <Users className="text-[#00A9E0]" size={32} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold">
            Accessible <span className="text-[#00A9E0]">Community Events</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover Deaf-led and ASL-interpreted events throughout Brooklyn and NYC—from museum tours to performances and community gatherings
          </p>
        </div>

        {/* Featured Events Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {featuredEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`${event.color} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                  {event.type}
                </span>
                <Calendar className="text-[#00A9E0]" size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{event.title}</h3>
              <div className="flex items-center gap-2 text-gray-300 text-sm mb-1">
                <MapPin size={14} />
                <span>{event.organization}</span>
              </div>
              <p className="text-gray-400 text-sm">{event.date}, 2026</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/community"
            className="inline-flex items-center gap-3 bg-[#00A9E0] text-white px-8 py-4 rounded-md hover:bg-[#CB6CE6] transition-all shadow-lg hover:shadow-xl text-lg font-semibold group"
          >
            View Community Calendar
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <p className="text-gray-400 text-sm mt-4">
            Submit your accessible event to our community calendar
          </p>
        </div>
      </div>
    </section>
  );
}