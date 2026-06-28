import { CursorGlow } from "@/components/CursorGlow";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Memora. Learn how we handle, store, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start bg-pure-black overflow-hidden pt-24 pb-20">
      <div className="noise-overlay" />
      <CursorGlow />
      
      <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
        <div className="glassmorphism p-8 md:p-12 rounded-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50 text-sm mb-12">Last Updated: October 2023</p>

          <div className="space-y-8 text-white/70 leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-serif text-white mb-4">1. Introduction</h2>
              <p>
                Welcome to Memora. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">2. The Data We Collect</h2>
              <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address.</li>
                <li><strong>Content Data:</strong> includes photos, videos, and journal entries you upload to your vault.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">4. Advertising and Cookies</h2>
              <p className="mb-4">
                We use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
              </p>
              <p>
                Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">5. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">6. Your Legal Rights (GDPR)</h2>
              <p className="mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-white mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:privacy@memora.app" className="text-white underline hover:text-white/80 transition-colors">privacy@memora.app</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
