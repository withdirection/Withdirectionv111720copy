import { MessageSquare, Globe, Briefcase, Award, GraduationCap, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import remoteInterpretingImage from 'figma:asset/da07099dfc93f16634c5391070a86a8924c2795c.png';
import gradientPattern from 'figma:asset/e15166bd80d22b048573bd472c6cbb5da8de4ad2.png';

const services = [
  {
    id: 'interpreting',
    icon: MessageSquare,
    title: 'Sign Language Interpreting Services',
    description: 'Professional interpreting across NYC, nationwide, and international contexts. Includes captioning for comprehensive communication access.',
    subServices: ['NYC', 'Nationwide', 'International']
  },
  {
    id: 'translation',
    icon: Globe,
    title: 'Sign Language Translation Services',
    description: 'Expert translation for large-scale projects, Deaf performers, video content, transcription, and CART.',
    subServices: ['Large-Scale Projects', 'Deaf Performers', 'Transcription', 'CART']
  },
  {
    id: 'corporate',
    icon: Briefcase,
    title: 'Corporate Consulting',
    description: 'Strategic guidance on inclusive workplaces and accessibility compliance.',
  },
  {
    id: 'expert',
    icon: Award,
    title: 'Expert Services',
    description: 'Specialized expertise for complex accessibility challenges and research-informed practice.',
  },
  {
    id: 'training',
    icon: GraduationCap,
    title: 'Tailored Trainings & Workshops',
    description: 'Customized programs for theatre interpreting, professional development, and organizational training.',
  },
  {
    id: 'events',
    icon: Calendar,
    title: 'Special Events Coordination',
    description: 'Large-scale event planning for conferences, international events, and multilingual access projects.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background gradient pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <img src={gradientPattern} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#14213D]">
            Our Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                to={`/services#${service.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-[#E6E9EF] group hover:border-[#00A9E0]"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#00A9E0]/10 rounded-lg mb-4 group-hover:bg-[#00A9E0] transition-colors">
                  <Icon className="text-[#00A9E0] group-hover:text-white transition-colors" size={24} />
                </div>
                <h3 className="text-xl mb-3 text-[#14213D] group-hover:text-[#00A9E0] transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-[#00A9E0] text-sm font-medium group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Feature Section - Remote Services */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 items-center">
            <div className="h-full overflow-hidden relative">
              <img
                src={remoteInterpretingImage}
                alt="Remote interpreting services"
                className="w-full h-full object-cover"
                style={{ 
                  objectPosition: '50% 55%',
                  marginTop: '-100px',
                  marginBottom: '-60px',
                  height: 'calc(100% + 160px)'
                }}
              />
            </div>
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl mb-4 text-[#14213D]">
                Flexible Remote Services
              </h3>
              <p className="text-gray-600 mb-6">
                Expert remote interpreting services delivered through secure, professional platforms. WITHdirection coordinates skilled interpreters for virtual meetings, conferences, and digital events with the same strategic planning and intentional coordination as our on-site services.
              </p>
              <Link
                to="/services#remote"
                className="inline-flex items-center gap-2 bg-[#00A9E0] text-white px-6 py-3 rounded-lg hover:bg-[#0090c0] transition-colors"
              >
                Book a Team of Interpreters Today
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}