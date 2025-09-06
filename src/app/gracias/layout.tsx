import FooterSection from "@/components/footer";

export default function GraciasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      <FooterSection />
    </div>
  );
}
