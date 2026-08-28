import { Link } from 'react-router';
import { Cookie, Mail, Shield } from 'lucide-react';

/**
 * The cookie consent banner in index.html links here, so this page has to
 * exist for that consent to mean anything.
 *
 * The disclosures below describe what this site actually does today, verified
 * against index.html: Google Analytics with anonymize_ip, MailerLite, and a
 * single localStorage key holding the consent decision. Keep them in step with
 * that file — tests/guardrails/consent.test.ts pins the behaviour, not the copy.
 *
 * REVIEW NEEDED: retention periods and the controller contact details should be
 * confirmed by WITHdirection before launch.
 */
export function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
            Privacy <span className="text-[#00A9E0]">Policy</span>
          </h1>
          <p className="text-xl text-gray-300">
            What this website collects, who processes it, and how to change your mind.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#00A9E0] rounded-lg flex items-center justify-center flex-shrink-0">
                <Cookie className="text-white" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl text-[#14213D]">Cookies and analytics</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nothing that tracks you runs until you choose to accept it. When you first
                visit, a banner asks for a decision, and no analytics or marketing script
                loads before you make one.
              </p>
              <p>
                If you accept, this site loads Google Analytics with IP anonymisation
                enabled, and MailerLite, which we use for our newsletter. If you decline,
                neither loads at all.
              </p>
              <p>
                Your decision is stored in your own browser under a single key
                (<code className="bg-[#F5F7FA] px-1.5 py-0.5 rounded text-sm">wd_cookie_consent</code>).
                It never leaves your device and we cannot read it.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#303F9F] rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="text-white" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl text-[#14213D]">Changing your mind</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You can withdraw consent at any time, and it is no harder than giving it.
                Clearing this site&rsquo;s data in your browser removes the stored decision
                and the banner will ask again on your next visit.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#CB6CE6] rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl text-[#14213D]">What you send us</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                When you contact us we receive what you choose to tell us — your name,
                your organisation, how to reach you, and what you need. We use it to
                respond to your enquiry and to provide the service you ask for. We do not
                sell it and we do not pass it to third parties for their own marketing.
              </p>
              <p>
                Our work frequently involves confidential settings. Assignment details
                shared with us are treated as confidential and are seen only by the people
                coordinating or delivering that work.
              </p>
            </div>
          </div>

          <div className="bg-[#F5F7FA] border border-[#E6E9EF] rounded-lg p-6">
            <h3 className="text-xl text-[#14213D] mb-3">Questions about your data</h3>
            <p className="text-gray-700 leading-relaxed">
              Write to{' '}
              <a
                href="mailto:info@withdirection.net"
                className="text-[#0078B4] underline underline-offset-2 hover:no-underline"
              >
                info@withdirection.net
              </a>{' '}
              and we will respond directly. You can also{' '}
              <Link to="/contact" className="text-[#0078B4] underline underline-offset-2 hover:no-underline">
                use our contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
