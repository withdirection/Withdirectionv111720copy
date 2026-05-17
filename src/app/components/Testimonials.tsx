import { Star, Quote, Heart, Target, Users } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Elizabeth Lockwood",
      organization: "CBM Global Disability Inclusion",
      text: "It is a pleasure working with Chris and With Direction, LLC. Organizing interpretation services is quick, efficient, and professional. The IS and ASL interpreters are skilled, flexible, and punctual.",
      rating: 5
    },
    {
      name: "Anna Burlyaeva",
      organization: "UNICEF",
      text: "Excellent! Quality work, flexibility, attention to details. Offering unique set of skills and services for affordable cost.",
      rating: 5
    },
    {
      name: "Dyeemah Simmons",
      organization: "Whitney Museum of American Art",
      text: "With Direction has been great to work with. They always provide us with thoughtful interpreters that are preferred by our Deaf educators and audiences. I look forward to organizing many other programs and events with them!",
      rating: 5
    },
    {
      name: "Daniel Yong",
      organization: "Theatre Interpreting Workshop, Singapore Repertory Theatre",
      text: "Christopher's extensive background as both an interpreter and a theatre actor brought a unique depth to the training, offering valuable perspectives on providing access while honouring the spirit of the show. His engaging and supportive approach made complex concepts accessible.",
      rating: 5
    },
    {
      name: "William Mager",
      organization: "Freelance Screenwriter",
      text: "Christopher is an excellent translator and provided ASL to BSL support during a very important meeting. He was well prepared, professional and courteous.",
      rating: 5
    },
    {
      name: "Rose Bukania",
      organization: "State Department for Social Protection",
      text: "It was pleasant and the services were well received by the clients.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,169,224,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Why WITHdirection Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#14213D]">
              Why WITHdirection
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We offer professional interpreting and consulting services, including Deaf interpreter expertise, tailored to meet diverse client needs. Whether you need conference interpreting, video translations, accessibility training, or expert consultation, we bring a client-centered approach and unmatched expertise to every engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-br from-[#00A9E0]/5 to-transparent p-6 rounded-lg border border-[#E6E9EF] text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A9E0]/20 rounded-full mb-4">
                <Heart className="text-[#00A9E0]" size={32} />
              </div>
              <h3 className="text-xl mb-3 text-[#14213D] font-semibold">Deaf-Led & Owned</h3>
              <p className="text-gray-600">
                Our leadership and ownership reflect the community we serve, ensuring authentic understanding 
                and representation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#CB6CE6]/5 to-transparent p-6 rounded-lg border border-[#E6E9EF] text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#CB6CE6]/20 rounded-full mb-4">
                <Target className="text-[#CB6CE6]" size={32} />
              </div>
              <h3 className="text-xl mb-3 text-[#14213D] font-semibold">Precision & Impact</h3>
              <p className="text-gray-600">
                Every service is delivered with technical accuracy and cultural sensitivity, ensuring clear and 
                meaningful communication.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#303F9F]/5 to-transparent p-6 rounded-lg border border-[#E6E9EF] text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#303F9F]/20 rounded-full mb-4">
                <Users className="text-[#303F9F]" size={32} />
              </div>
              <h3 className="text-xl mb-3 text-[#14213D] font-semibold">Global Expertise</h3>
              <p className="text-gray-600">
                Decades of experience serving international organizations, with globally recognized credentials 
                and accreditations.
              </p>
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#14213D]">
            Client Testimonials
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#00A9E0]/5 to-transparent p-6 rounded-lg border border-[#E6E9EF] hover:shadow-xl hover:border-[#00A9E0] transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <Quote className="text-[#00A9E0]" size={28} />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#00A9E0] text-lg">★</span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-[#E6E9EF] pt-3">
                <p className="text-[#14213D] font-medium">{testimonial.name}</p>
                <p className="text-gray-500 text-sm mt-1">{testimonial.organization}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl lg:text-5xl text-[#00A9E0] mb-2">100%</div>
            <p className="text-gray-600">5-Star Reviews</p>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl text-[#00A9E0] mb-2">6+</div>
            <p className="text-gray-600">International Organizations</p>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl text-[#00A9E0] mb-2">10+</div>
            <p className="text-gray-600">Years of Experience</p>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl text-[#00A9E0] mb-2">Global</div>
            <p className="text-gray-600">Reach & Impact</p>
          </div>
        </div>
      </div>
    </section>
  );
}