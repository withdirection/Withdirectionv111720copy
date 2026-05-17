import { Award, Heart, Target, Users, Globe, Lightbulb } from 'lucide-react';
import founderImage from 'figma:asset/4acb3df11b22d7fe2b088fe1b38993fda6755655.png';
import interpretingImage1 from 'figma:asset/0bad5fb3bcb0b4aafda7fe80ffc6b921ca2b4ae2.png';
import interpretingImage2 from 'figma:asset/122ee2e26e448d0a929211bd2742688874fe05bd.png';
import interpretingImage3 from 'figma:asset/920b7de608a0bd33e379cee1a6790e195f500c20.png';
import interpretingImage4 from 'figma:asset/982b4d157ba41ff3a422c4a55b443297478b7109.png';
import { Experience } from '../components/Experience';

export function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              About <span className="text-[#00A9E0]">WITHdirection</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Deaf-led. Brooklyn-based. Globally recognized.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={founderImage}
                alt="Christopher Tester, Founder of WITHdirection"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl mb-6 text-[#14213D]">
                Meet Christopher Tester
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  As a Deaf professional with over 15 years of experience in sign language 
                  interpreting and accessibility consulting, I founded WITHdirection to bridge 
                  communication gaps and create truly inclusive spaces.
                </p>
                <p>
                  My journey has taken me from Brooklyn's vibrant cultural institutions to the 
                  halls of the United Nations, where I've provided critical interpretation services 
                  for international forums and high-level diplomatic meetings.
                </p>
                <p>
                  WITHdirection is built on the belief that accessibility isn't an afterthought—it's 
                  a fundamental right. Every service we provide, every interpreter we work with, and 
                  every consultation we conduct is rooted in this principle.
                </p>
                <p>
                  Based in Brooklyn, NY, we're proud to serve our local community while maintaining 
                  a global presence through our work with international organizations and remote 
                  services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Credentials */}
      <Experience />

      {/* Professional Work Gallery */}
      <section className="py-16 lg:py-24 bg-[#14213D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-white">
              Our Work in <span className="text-[#00A9E0]">Action</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional interpreting services across conferences, cultural events, and international forums
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={interpretingImage1}
                alt="Conference interpreting with large screen displays"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={interpretingImage2}
                alt="Professional interpreting equipment setup"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={interpretingImage3}
                alt="Interpreting at cultural event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={interpretingImage4}
                alt="Large conference with multiple interpreters"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-[#14213D]">
              Our Philosophy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F5F7FA] p-8 rounded-lg border border-[#E6E9EF]">
              <div className="w-12 h-12 bg-[#00A9E0] rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-xl mb-4 text-[#14213D]">Deaf-Led Excellence</h3>
              <p className="text-gray-700 leading-relaxed">
                As a Deaf-owned and operated firm, we bring authentic understanding and lived 
                experience to every project. Our perspective isn't theoretical—it's personal.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-8 rounded-lg border border-[#E6E9EF]">
              <div className="w-12 h-12 bg-[#303F9F] rounded-lg flex items-center justify-center mb-4">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-xl mb-4 text-[#14213D]">Quality Over Quantity</h3>
              <p className="text-gray-700 leading-relaxed">
                We carefully select and train every interpreter in our network. Our commitment to 
                excellence means we never compromise on quality, professionalism, or cultural competency.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-8 rounded-lg border border-[#E6E9EF]">
              <div className="w-12 h-12 bg-[#CB6CE6] rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl mb-4 text-[#14213D]">Community First</h3>
              <p className="text-gray-700 leading-relaxed">
                We're not just a business—we're part of the Deaf community. Supporting local 
                institutions and creating accessible spaces is at the heart of our mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
              How We <span className="text-[#00A9E0]">Operate</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our process ensures seamless, professional service every time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00A9E0] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl mb-3">Consultation</h3>
              <p className="text-gray-300">
                We start with understanding your specific needs, context, and goals to provide 
                tailored recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#00A9E0] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl mb-3">Matching</h3>
              <p className="text-gray-300">
                We carefully select interpreters based on expertise, specialization, and 
                cultural competency for your event.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#00A9E0] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl mb-3">Preparation</h3>
              <p className="text-gray-300">
                Our interpreters receive materials in advance and conduct research to ensure 
                accurate, contextual interpretation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#00A9E0] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl mb-3">Excellence</h3>
              <p className="text-gray-300">
                We deliver professional, punctual, and culturally sensitive services, followed 
                by quality assurance and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why WITHdirection */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-[#14213D]">
              Why Choose <span className="text-[#00A9E0]">WITHdirection</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Globe className="text-[#00A9E0]" size={32} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-[#14213D]">Global Experience</h3>
                <p className="text-gray-700">
                  From the United Nations to local Brooklyn museums, we bring international 
                  expertise to every engagement.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Award className="text-[#00A9E0]" size={32} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-[#14213D]">Certified Excellence</h3>
                <p className="text-gray-700">
                  Our network includes highly credentialed interpreters with specialized training 
                  and certifications.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Lightbulb className="text-[#00A9E0]" size={32} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-[#14213D]">Innovative Solutions</h3>
                <p className="text-gray-700">
                  We stay ahead of technology and best practices, offering remote services, 
                  video translation, and custom training.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Heart className="text-[#00A9E0]" size={32} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-[#14213D]">Community Commitment</h3>
                <p className="text-gray-700">
                  Brooklyn-based and community-focused, we invest in local accessibility and 
                  cultural access programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}