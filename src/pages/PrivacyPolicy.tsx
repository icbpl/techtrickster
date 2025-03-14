
import Layout from '../components/layout/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-lg border border-border">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground">
                This Privacy Policy explains how we collect, use, process, and disclose your information, 
                including personal information, in conjunction with your access to and use of our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-3">
                We collect various types of information to provide and improve our services to you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Information you provide to us (e.g., when you register for an account)</li>
                <li>Information we automatically collect (e.g., cookies and analytics data)</li>
                <li>Information from third parties (e.g., social media platforms)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Providing and improving our services</li>
                <li>Communicating with you</li>
                <li>Personalizing content and advertisements</li>
                <li>Analyzing usage patterns</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Cookies and Similar Technologies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to track activity on our website and 
                hold certain information. Cookies are files with a small amount of data which may include 
                an anonymous unique identifier. You can instruct your browser to refuse all cookies or to 
                indicate when a cookie is being sent.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our website may contain links to third-party websites. We have no control over and 
                assume no responsibility for the content, privacy policies, or practices of any 
                third-party sites or services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@oktrik.com.
              </p>
            </section>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
            Last Updated: May 1, 2023
          </div>
        </div>
      </div>
    </Layout>
  );
}
