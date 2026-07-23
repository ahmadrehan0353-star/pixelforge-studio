import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of service for working with PixelForge Studio.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section className="section max-w-3xl">
        <div className="space-y-8 text-sm leading-relaxed text-mist-300">
          <p>
            This placeholder Terms of Service covers general use of this
            website and engagement with PixelForge Studio. Replace this
            content with your studio&apos;s actual terms before launch.
          </p>
          <div>
            <h2 className="font-display text-xl text-white">Free Mockups</h2>
            <p className="mt-2">
              Free homepage mockups are provided at our discretion to
              prospective clients. There is no obligation to proceed with a
              full project after receiving a mockup.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Project Engagements</h2>
            <p className="mt-2">
              Full website projects are governed by a separate agreement
              outlining scope, pricing, timeline, and revisions, provided
              once a mockup is approved.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to
              hello@pixelforgestudio.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
