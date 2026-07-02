import ConsultationButton from "./ConsultationButton";

// The persistent CTA becomes a fixed bottom bar on mobile (PRD section 5).
export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper p-3 md:hidden">
      <ConsultationButton className="w-full text-ink" />
    </div>
  );
}
