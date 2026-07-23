import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PixelForge Studio collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="section max-w-3xl prose-invert">
        <div className="space-y-8 text-sm leading-relaxed text-mist-300">
          <p>
            This placeholder Privacy Policy outlines how PixelForge Studio
            handles information submitted through this website. Replace this
            content with your studio&apos;s actual policy before launch.
          </p>
          <div>
            <h2 className="font-display text-xl text-white">Information We Collect</h2>
            <p className="mt-2">
              We collect the information you provide through our contact form,
              including your name, business name, email, phone number, and
              project details, solely to respond to your inquiry.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">How We Use It</h2>
            <p className="mt-2">
              Information submitted is used only to evaluate your project and
              communicate with you about it. We do not sell or share your
              information with third parties.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Contact</h2>
            <p className="mt-2">
              Questions about this policy can be sent to
              hello@pixelforgestudio.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
