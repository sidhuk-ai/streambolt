import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import MessageSection from "@/components/MessageSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <MarqueeSection />
      <MessageSection />
      <section className="h-dvh"></section>
    </div>
  );
}