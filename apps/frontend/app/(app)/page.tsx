import {CallToAction} from "@/components/CallToAction";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LiveStreams from "@/components/LiveStreams";

export default async function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <Hero />
          <LiveStreams />
          <Categories />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
}
