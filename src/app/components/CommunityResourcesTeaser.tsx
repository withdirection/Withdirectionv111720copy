import { Calendar, Book, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CommunityResourcesTeaser() {
  return (
    <section className="py-24 bg-[#14213D] relative overflow-hidden">
      {/* Background Image - Faded */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwY29sbGFib3JhdGlvbiUyMGRvY3VtZW50cyUyMG1lZXRpbmd8ZW58MXx8fHwxNzQyODU0MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#14213D]/95 via-[#1a2a52]/90 to-[#14213D]/95"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-white">
            Explore. Learn. <span className="text-[#00A9E0]">Connect.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover accessible events and resources for the Deaf community and allies
          </p>
        </div>

        {/* Two Column Layout - Floating Cards */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Community Calendar - Elevated Card */}
          <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#00A9E0] rounded-lg flex items-center justify-center shadow-lg">
                <Calendar className="text-white" size={28} />
              </div>
              <h3 className="text-2xl text-[#14213D]">
                Community Calendar
              </h3>
            </div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Discover Deaf-led and ASL-interpreted events throughout Brooklyn and NYC—from museum tours to performances.
            </p>
            
            {/* Featured Events Preview */}
            <div className="space-y-3 mb-6 bg-[#F5F7FA] p-4 rounded-lg">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-[#00A9E0] rounded-full"></span>
                <span>ASL Museum Tours</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-[#CB6CE6] rounded-full"></span>
                <span>Deaf Artists Showcases</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-[#00A9E0] rounded-full"></span>
                <span>Community Socials</span>
              </div>
            </div>

            <Link
              to="/community"
              className="inline-flex items-center gap-2 bg-[#00A9E0] text-white px-4 py-2 rounded-md hover:bg-[#303F9F] transition-all shadow-md hover:shadow-lg group-hover:gap-3"
            >
              View Calendar
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Resources & FAQ - Elevated Card */}
          <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#CB6CE6] rounded-lg flex items-center justify-center shadow-lg">
                <Book className="text-white" size={28} />
              </div>
              <h3 className="text-2xl text-[#14213D]">
                Resources & FAQ
              </h3>
            </div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Learn about Deaf culture, sign language interpreting, and accessibility best practices.
            </p>
            
            {/* Topics Preview */}
            <div className="space-y-3 mb-6 bg-[#F5F7FA] p-4 rounded-lg">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-[#CB6CE6] rounded-full"></span>
                <span>Deaf Culture & Community</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-[#CB6CE6] rounded-full"></span>
                <span>Interpreting Services Guide</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-[#CB6CE6] rounded-full"></span>
                <span>Educational Resources</span>
              </div>
            </div>

            <Link
              to="/resources"
              className="inline-flex items-center gap-2 bg-[#CB6CE6] text-white px-4 py-2 rounded-md hover:bg-[#303F9F] transition-all shadow-md hover:shadow-lg group-hover:gap-3"
            >
              Explore Resources
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}