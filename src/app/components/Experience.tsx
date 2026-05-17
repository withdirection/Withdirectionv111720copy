import { Heart, Target, Users } from 'lucide-react';
import unFlagsImage from 'figma:asset/0375baa168bf04c56aa03b7c5a21f228281fa189.png';
import conferenceImage from 'figma:asset/f8de3ca95d86129de658f03985c5b63b01ec54ce.png';
import bluePattern from 'figma:asset/bf45d3a67b22b59000eb0fa44033475e8a68fe85.png';

export function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img src={bluePattern} alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Image Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img
                src={conferenceImage}
                alt="Professional interpreters at international conference"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-[#14213D] mb-2 font-semibold">Large-Scale Events</h4>
              <p className="text-gray-600">
                Expert interpretation for conferences, summits, and audiences of all sizes
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img
                src={unFlagsImage}
                alt="International flags representing global reach"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-[#14213D] mb-2 font-semibold">Global Perspectives</h4>
              <p className="text-gray-600">
                Understanding diverse cultures and communication needs across international contexts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}