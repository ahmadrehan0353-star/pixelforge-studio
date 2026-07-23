import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section flex flex-col items-center text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 max-w-md text-mist-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  );
}
