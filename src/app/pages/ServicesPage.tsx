import { MessageSquare, Briefcase, Building, Video, GraduationCap, Users, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect } from 'react';

const services = [
  {
    id: 'interpreting',
    icon: MessageSquare,
    title: 'Sign Language Interpreting Services',
    shortDesc: 'Professional ASL interpretation services for all your communication needs.',
    fullDesc: 'Our core service provides professional American Sign Language (ASL) interpretation for a wide range of settings. Whether you need interpretation for a single meeting or ongoing support for multiple events, we match you with skilled interpreters who understand your context and industry.',
    features: [
      'One-on-one meetings and consultations',
      'Conferences and large-scale events',
      'Professional and business meetings',
      'ASL to BSL (British Sign Language) interpretation',
      'Team interpreting for extended events',
      'Real-time interpretation with cultural sensitivity',
    ],
    benefits: [
      'Skilled, certified interpreters',
      'Punctual and professional service',
      'Quick and efficient booking process',
      'Flexible scheduling',
    ],
  },
  {
    id: 'translation',
    icon: Video,
    title: 'Sign Language Translation Services',
    shortDesc: 'Expert translation for large-scale projects, Deaf performers, video content, transcription, and CART.',
    fullDesc: 'In our increasingly digital world, accessibility needs extend beyond in-person events. We offer comprehensive video services including Video Remote Interpreting (VRI), video content translation, and transcription services to ensure your digital content is accessible.',
    features: [
      'Video Remote Interpreting (VRI)',
      'ASL video translation services',
      'Video transcription and captioning',
      'Pre-recorded content interpretation',
      'Live streaming interpretation',
      'Remote meeting support',
    ],
    benefits: [
      'Flexible, cost-effective solution',
      'Quick turnaround times',
      'Accessible from anywhere',
      'High-quality video production',
    ],
  },
  {
    id: 'corporate',
    icon: Briefcase,
    title: 'Corporate Consulting',
    shortDesc: 'Expert guidance on creating inclusive workplaces and accessibility compliance.',
    fullDesc: 'Transform your organization into a truly inclusive workplace with our expert consulting services. We provide comprehensive guidance on accessibility compliance, Deaf culture awareness, and creating environments where Deaf employees and customers thrive.',
    features: [
      'Accessibility compliance audits',
      'Deaf culture awareness training for staff',
      'Inclusive hiring practices development',
      'Workplace accommodation strategies',
      'ADA compliance consultation',
      'Custom training programs',
    ],
    benefits: [
      'Reduce legal and compliance risks',
      'Attract and retain diverse talent',
      'Improve customer experience',
      'Build authentic inclusive culture',
    ],
  },
  {
    id: 'expert',
    icon: Building,
    title: 'Expert Services',
    shortDesc: 'Specialized expertise for complex accessibility challenges and research-informed practice.',
    fullDesc: 'We specialize in high-level interpretation for government agencies, international organizations, and diplomatic settings. With extensive experience at the United Nations and various government departments, we understand the unique requirements and protocols of public sector work.',
    features: [
      'UN and international forum interpretation',
      'Government meeting and hearing support',
      'NYC government contract services',
      'Diplomatic event interpretation',
      'Security clearance coordination',
      'Multi-day conference support',
    ],
    benefits: [
      'Proven track record with UN agencies',
      'Understanding of government protocols',
      'Highest level of professionalism',
      'Experience with sensitive content',
    ],
  },
  {
    id: 'training',
    icon: GraduationCap,
    title: 'Tailored Trainings & Workshops',
    shortDesc: 'Specialized workshops and professional development for interpreters and organizations.',
    fullDesc: 'We offer customized training programs for both interpreters looking to develop specialized skills and organizations seeking to improve their accessibility practices. Our workshops are informed by real-world experience and theatre background.',
    features: [
      'Theatre interpreting workshops',
      'Specialized industry training',
      'Professional development for interpreters',
      'Organizational accessibility training',
      'Custom curriculum development',
      'Interactive hands-on practice',
    ],
    benefits: [
      'Led by experienced practitioners',
      'Practical, applicable skills',
      'Engaging and supportive approach',
      'Internationally recognized expertise',
    ],
  },
  {
    id: 'events',
    icon: Users,
    title: 'Special Events Coordination',
    shortDesc: 'Large-scale event planning for conferences, international events, and multilingual access projects.',
    fullDesc: 'Make the arts accessible to all with our specialized cultural event interpretation services. We partner with museums, theatres, and cultural institutions throughout Brooklyn and NYC to provide thoughtful, culturally sensitive interpretation.',
    features: [
      'Museum tour and exhibition interpretation',
      'Performance and theatrical event access',
      'Artist talks and lectures',
      'Educational program support',
      'Opening receptions and galas',
      'Community cultural events',
    ],
    benefits: [
      'Trusted by major NYC institutions',
      'Understanding of arts and culture',
      'Preferred by Deaf educators',
      'Long-term partnership approach',
    ],
  },
];

export function ServicesPage() {
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to that section
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Our <span className="text-[#00A9E0]">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive sign language interpreting and accessibility solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;
        
        return (
          <section
            key={service.id}
            id={service.id}
            className={`py-16 lg:py-24 scroll-mt-20 ${isEven ? 'bg-white' : 'bg-[#F5F7FA]'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                {/* Icon and Title - Left on even, Right on odd */}
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#00A9E0] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl lg:text-4xl text-[#14213D]">{service.title}</h2>
                  </div>
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                    {service.fullDesc}
                  </p>
                  
                  {/* Benefits */}
                  <div className="bg-gradient-to-br from-[#00A9E0]/10 to-[#CB6CE6]/10 rounded-lg p-6 border border-[#E6E9EF]">
                    <h3 className="text-xl text-[#14213D] mb-4 font-semibold">Key Benefits</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="text-[#00A9E0] flex-shrink-0 mt-1" size={20} />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Features - Right on even, Left on odd */}
                <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <h3 className="text-2xl text-[#14213D] mb-6">What's Included</h3>
                  <div className="space-y-4">
                    {service.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#E6E9EF] hover:border-[#00A9E0] transition-colors"
                      >
                        <ArrowRight className="text-[#CB6CE6] flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-[#00A9E0] text-white px-8 py-4 rounded-md hover:bg-[#303F9F] transition-all transform hover:scale-105"
                    >
                      Get Started with {service.title}
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl mb-6">
            Ready to Get <span className="text-[#00A9E0]">Started?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact us today to discuss your interpretation and accessibility needs
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#00A9E0] text-white px-8 py-4 rounded-md hover:bg-[#303F9F] transition-all transform hover:scale-105 text-lg"
          >
            Schedule a Consultation
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}