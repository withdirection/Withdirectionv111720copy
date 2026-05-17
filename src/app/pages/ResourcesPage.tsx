import { Book, HelpCircle, ExternalLink, Users, Globe, MessageSquare, Award, FileText } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    category: 'About Sign Language Interpreting',
    questions: [
      {
        q: 'What is American Sign Language (ASL)?',
        a: 'American Sign Language is a complete, complex language that employs signs made by moving the hands combined with facial expressions and body language. It is the primary language of many Deaf people in North America, and it is distinct from spoken English with its own grammar and syntax.',
      },
      {
        q: 'What is the difference between an ASL interpreter and a translator?',
        a: 'An interpreter works with spoken or signed language in real-time, facilitating communication between parties. A translator works with written text, converting content from one language to another. Sign language interpreters may also translate video content or documents into ASL.',
      },
      {
        q: 'How do I know if I need an interpreter?',
        a: 'If you have Deaf or hard-of-hearing participants at your meeting, event, or program, providing a qualified sign language interpreter ensures full accessibility and legal compliance under the ADA. Contact us for a consultation to assess your specific needs.',
      },
    ],
  },
  {
    category: 'About Deaf Culture & Community',
    questions: [
      {
        q: 'What is Deaf culture?',
        a: 'Deaf culture refers to the social beliefs, behaviors, art, traditions, history, values, and shared institutions of communities affected by deafness. Members of Deaf culture often use sign language as their primary means of communication and identify as culturally Deaf (with a capital D).',
      },
      {
        q: 'What does "Deaf-led" mean and why is it important?',
        a: 'Deaf-led means that Deaf individuals are in leadership positions, making decisions and driving the direction of services or organizations. This is important because Deaf people have lived experience and authentic understanding of the community\'s needs, challenges, and strengths.',
      },
      {
        q: 'Should I use "deaf" or "Deaf"?',
        a: '"Deaf" (capitalized) typically refers to individuals who identify with Deaf culture and community. "deaf" (lowercase) refers to the audiological condition of not hearing. Many people have personal preferences, so it\'s always best to ask.',
      },
    ],
  },
  {
    category: 'About Deaf Interpreters',
    questions: [
      {
        q: 'What is a Deaf interpreter?',
        a: 'A Deaf interpreter (DI) is a specialist who provides interpreting, translation, and transliteration services in American Sign Language and other visual and tactile communication forms used by Deaf individuals. Deaf interpreters are Deaf or hard-of-hearing themselves.',
      },
      {
        q: 'When should a Deaf interpreter be used?',
        a: 'Deaf interpreters are invaluable in situations involving: complex legal or medical settings, international sign language interpretation, Deaf individuals with minimal language skills, Deaf individuals with unique communication styles, or highly technical/specialized content.',
      },
      {
        q: 'How do Deaf interpreters and hearing interpreters work together?',
        a: 'In many situations, a team of a hearing interpreter and a Deaf interpreter work together. The hearing interpreter voices what is being said in English, and the Deaf interpreter renders the message into the most appropriate form of sign language for the Deaf consumer. This team approach ensures the highest level of accuracy and cultural appropriateness.',
      },
    ],
  },
  {
    category: 'Working with WITHdirection',
    questions: [
      {
        q: 'How far in advance should I book interpretation services?',
        a: 'We recommend booking as early as possible, ideally 2-4 weeks in advance for standard services. For large events, specialized content, or international assignments, please contact us 4-6 weeks ahead. We do accommodate rush requests when possible.',
      },
      {
        q: 'Do you provide remote/virtual interpreting services?',
        a: 'Yes! We offer Video Remote Interpreting (VRI) services for virtual meetings, webinars, and online events. We also provide video translation and transcription services for pre-recorded content.',
      },
      {
        q: 'What information do you need to provide an accurate quote?',
        a: 'To provide an accurate quote, we need: event date and time, duration, location (or virtual platform), number of participants, type of event, subject matter/content, and any special requirements. Contact us for a free consultation.',
      },
    ],
  },
];

const resources = [
  {
    title: 'National Association of the Deaf (NAD)',
    description: 'The nation\'s premier civil rights organization of, by, and for deaf and hard-of-hearing individuals.',
    url: 'https://www.nad.org',
    icon: Users,
  },
  {
    title: 'Registry of Interpreters for the Deaf (RID)',
    description: 'Professional organization for sign language interpreters and transliterators.',
    url: 'https://www.rid.org',
    icon: Award,
  },
  {
    title: 'World Federation of the Deaf',
    description: 'International organization representing Deaf people worldwide.',
    url: 'https://wfdeaf.org',
    icon: Globe,
  },
  {
    title: 'ADA: Effective Communication',
    description: 'U.S. Department of Justice guidance on ADA requirements for effective communication.',
    url: 'https://www.ada.gov/resources/effective-communication/',
    icon: FileText,
  },
  {
    title: 'Deaf Culture Centre',
    description: 'Resources and information about Deaf culture, history, and community.',
    url: 'https://www.deafculturecentre.ca',
    icon: Book,
  },
  {
    title: 'Gallaudet University',
    description: 'The world\'s only university designed specifically for Deaf and hard-of-hearing students.',
    url: 'https://www.gallaudet.edu',
    icon: Book,
  },
];

export function ResourcesPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(faqs[0].category);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Resources & <span className="text-[#00A9E0]">FAQ</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn about Deaf culture, sign language interpreting, and accessibility best practices
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A9E0]/10 rounded-full mb-6">
              <HelpCircle className="text-[#00A9E0]" size={32} />
            </div>
            <h2 className="text-3xl lg:text-4xl text-[#14213D] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about sign language interpreting and Deaf culture
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((category, index) => (
              <div key={index} className="border border-[#E6E9EF] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full px-6 py-4 bg-[#F5F7FA] hover:bg-[#E6E9EF] transition-colors text-left flex items-center justify-between"
                >
                  <h3 className="text-xl text-[#14213D] font-semibold">{category.category}</h3>
                  <span className="text-[#00A9E0] text-2xl">
                    {openCategory === category.category ? '−' : '+'}
                  </span>
                </button>
                
                {openCategory === category.category && (
                  <div className="px-6 py-4 bg-white space-y-6">
                    {category.questions.map((faq, qIndex) => (
                      <div key={qIndex}>
                        <h4 className="text-lg text-[#303F9F] mb-2 font-medium">{faq.q}</h4>
                        <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-16 lg:py-24 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A9E0]/10 rounded-full mb-6">
              <Book className="text-[#00A9E0]" size={32} />
            </div>
            <h2 className="text-3xl lg:text-4xl text-[#14213D] mb-4">
              Educational Resources
            </h2>
            <p className="text-xl text-gray-600">
              Recommended organizations and resources for learning more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-lg border border-[#E6E9EF] hover:border-[#00A9E0] hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#00A9E0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-[#00A9E0]" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-[#14213D] mb-2 group-hover:text-[#00A9E0] transition-colors">
                        {resource.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">{resource.description}</p>
                  <div className="flex items-center gap-2 text-[#00A9E0] text-sm font-medium">
                    <span>Visit Website</span>
                    <ExternalLink size={16} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Terminology Guide */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#CB6CE6]/10 rounded-full mb-6">
              <MessageSquare className="text-[#CB6CE6]" size={32} />
            </div>
            <h2 className="text-3xl lg:text-4xl text-[#14213D] mb-4">
              Common Terminology
            </h2>
            <p className="text-xl text-gray-600">
              Understanding key terms in Deaf culture and sign language interpreting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF]">
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">ASL</h3>
              <p className="text-gray-700 text-sm">
                American Sign Language - A complete, natural language with its own grammar and syntax.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF]">
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">BSL</h3>
              <p className="text-gray-700 text-sm">
                British Sign Language - The sign language used in the United Kingdom, distinct from ASL.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF]">
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">VRI</h3>
              <p className="text-gray-700 text-sm">
                Video Remote Interpreting - Interpretation services provided via video conference technology.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF]">
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">CDI</h3>
              <p className="text-gray-700 text-sm">
                Certified Deaf Interpreter - A Deaf or hard-of-hearing interpreter with specialized certification.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF]">
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">RID</h3>
              <p className="text-gray-700 text-sm">
                Registry of Interpreters for the Deaf - National professional organization for interpreters.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF]">
              <h3 className="text-lg text-[#14213D] mb-2 font-semibold">ADA</h3>
              <p className="text-gray-700 text-sm">
                Americans with Disabilities Act - Federal law prohibiting discrimination against people with disabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#14213D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Still Have <span className="text-[#00A9E0]">Questions?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We're here to help! Contact us for personalized guidance and consultation.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00A9E0] text-white px-8 py-4 rounded-md hover:bg-[#303F9F] transition-colors text-lg"
          >
            <MessageSquare size={24} />
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
