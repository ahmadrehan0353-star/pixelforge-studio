import LiveSitePreview from "@/components/LiveSitePreview";

export default function DeviceMockup({
  title,
  liveUrl,
}: {
  title: string;
  liveUrl?: string;
}) {
  return (
    <div className="relative w-full max-w-md">
      {/* MacBook mockup */}
      <div className="relative rounded-t-xl border border-white/[0.1] bg-ink-800 p-2 shadow-panel">
        <div className="flex items-center gap-1.5 rounded-t-lg bg-ink-700 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#FF6159]" />
          <span className="h-2 w-2 rounded-full bg-[#FFC02E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="aspect-[16/10] w-full overflow-hidden bg-mesh-radial bg-ink-900">
          {liveUrl ? (
            <LiveSitePreview url={liveUrl} viewport="desktop" className="h-full" />
          ) : (
            <div className="flex h-full flex-col gap-2 p-4">
              <div className="h-2 w-1/3 rounded-full bg-white/[0.14]" />
              <div className="mt-2 h-8 w-2/3 rounded-md bg-forge-gradient/40" />
              <div className="h-2 w-3/4 rounded-full bg-white/[0.08]" />
              <div className="h-2 w-1/2 rounded-full bg-white/[0.08]" />
              <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
                <div className="rounded-lg bg-white/[0.05]" />
                <div className="rounded-lg bg-white/[0.05]" />
                <div className="rounded-lg bg-white/[0.05]" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto h-2 w-3/4 rounded-b-xl bg-ink-600" />
      <div className="mx-auto h-1 w-1/3 rounded-b-lg bg-ink-500" />

      {/* Phone mockup */}
      <div className="absolute -bottom-6 -right-6 w-24 rounded-[1.4rem] border-4 border-ink-700 bg-ink-800 p-1 shadow-panel sm:w-28">
        <div className="aspect-[9/19] w-full overflow-hidden rounded-[1rem] bg-mesh-radial bg-ink-900">
          {liveUrl ? (
            <LiveSitePreview url={liveUrl} viewport="mobile" className="h-full" />
          ) : (
            <div className="flex h-full flex-col gap-1.5 p-2">
              <div className="h-1.5 w-1/2 rounded-full bg-white/[0.14]" />
              <div className="mt-1 h-4 w-full rounded bg-forge-gradient/40" />
              <div className="h-1.5 w-3/4 rounded-full bg-white/[0.08]" />
              <div className="mt-1 flex-1 rounded bg-white/[0.05]" />
            </div>
          )}
        </div>
      </div>

      <span className="sr-only">{title} website preview</span>
    </div>
  );
}
