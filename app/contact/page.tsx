import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import ContactChannels from "@/components/ContactChannels";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request your free homepage mockup from PixelForge Studio. Tell us about your business and we'll get back to you shortly.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something great."
        description="Tell us about your business and we'll design a free homepage mockup — no cost, no obligation."
      />

      <section className="section pt-0">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <ContactChannels />

            <Reveal delay={0.2}>
              <div className="glass-panel p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">
                  Response Time
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist-300">
                  We typically respond within 24 hours on business days with
                  next steps for your free homepage mockup.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
