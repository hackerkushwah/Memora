import { CursorGlow } from "@/components/CursorGlow";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions of use for Memora.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start bg-pure-black overflow-hidden pt-24 pb-20">
      <div className="noise-overlay" />
      <CursorGlow />
      
      <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
        <div className="glassmorphism p-8 md:p-12 rounded-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Terms & Conditions</h1>
          <p className="text-white/50 text-sm mb-12">Last Updated: October 2023</p>

          <div className="space-y-8 text-white/70 leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-serif text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By viewing or using Memora, you agree to be bound by all of these Terms and Conditions. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">2. User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">3. Content Ownership and Rights</h2>
              <p className="mb-4">
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (&quot;Content&quot;). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
              </p>
              <p>
                By posting Content to the Service, you grant us the right and license to store and display that Content exclusively within the scope of providing the Service to you. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">4. Acceptable Use Policy</h2>
              <p className="mb-4">You agree not to use the Service:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>In any way that violates any applicable national or international law or regulation.</li>
                <li>To exploit, harm, or attempt to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
                <li>To impersonate or attempt to impersonate Memora, a Memora employee, another user, or any other person or entity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">5. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Memora and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall Memora, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">7. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
