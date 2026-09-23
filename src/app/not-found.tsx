import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted">We couldn&apos;t find that lesson or page.</p>
      <ButtonLink href="/dashboard" className="mt-6">
        Back to dashboard
      </ButtonLink>
    </div>
  );
}
