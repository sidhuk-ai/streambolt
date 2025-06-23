"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
export default function MessageSection() {
  useGSAP(() => {
    const message = SplitText.create(".message", {
      type: "words",
    });

    gsap.to(message.words, {
      color: "#ffffff",
      stagger: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".message-container",
        scrub: true,
        start: "5% center",
        end: "center center",
        // pin: true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-container",
        start: "center center",
      },
    });

    tl.fromTo(
      ".streamMsg",
      {
        clipPath: "inset(0% 100% 0% 0%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      ".boltMsg",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)', // spring bounce
      },
      '-=0.5' // slight overlap with Stream
    )
  });

  return (
    <section className="h-dvh flex flex-col justify-center items-center relative message-container">
      <div className="flex items-center justify-center my-4 border border-streambolt-400 px-4 py-2 rounded-full lg:gap-4">
        <Sparkles className="fill-streambolt-400 size-4 stroke-streambolt-400" />
        <h1 className="text-base pb-1 text-white/90">Presenting StreamBolt</h1>
      </div>
      <div className="container mx-auto relative flex flex-col 2xl:gap-2 justify-center items-center">
        <p className="2xl:text-7xl font-semibold font-outfit">
          Take control of your streaming in seconds.
        </p>
        <p className="2xl:text-7xl font-semibold font-outfit text-center text-white/50 message">
          With StreamBolt, launch your own live “Ingress” and push your screen
          to any RTMP destination. No complex setup, no plugins—just
          lightning-fast configuration, real-time chat, emoji reactions, and
          multi-platform streaming out of the box.
        </p>
        <p className="2xl:text-7xl font-semibold font-outfit text-center text-streambolt-400">
          And that's what{" "}
          <span className="font-brand inline-block streamMsg">Stream</span>
          <span className="font-brand inline-block boltMsg">Bolt</span>{" "}
          delivers.
        </p>
      </div>
    </section>
  );
}
