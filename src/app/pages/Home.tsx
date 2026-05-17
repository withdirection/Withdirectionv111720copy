import { Hero } from '../components/Hero';
import { CompanyOverview } from '../components/CompanyOverview';
import { Services } from '../components/Services';
import { CustomSolutionCTA } from '../components/CustomSolutionCTA';
import { About } from '../components/About';
import { UNSection } from '../components/UNSection';
import { Testimonials } from '../components/Testimonials';
import { CommunityResourcesTeaser } from '../components/CommunityResourcesTeaser';
import { Partnerships } from '../components/Partnerships';
import { Contact } from '../components/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CompanyOverview />
      <About />
      <UNSection />
      <Testimonials />
      <CommunityResourcesTeaser />
      <CustomSolutionCTA />
      <Partnerships />
      <Contact />
    </>
  );
}