"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";

export default function Hero() {
  useGSAP(() => {
    const stream = SplitText.create(".stream", {
      type: "chars",
    });
    const bolt = SplitText.create(".bolt", {
      type: "chars",
    });
    const para = SplitText.create(".sub-heading p", {
      type: "words, lines",
    });

    const t1 = gsap.timeline({
      delay: 1,
    });

    t1.to(".content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        stream.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        bolt.chars,
        {
          yPercent: -100,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        para.lines,
        {
          rotationX: -100,
          transformOrigin: "50% 50% -160px",
          opacity: 0,
          duration: 0.8,
          ease: "power3",
          stagger: 0.25,
        },
        "-=0.5"
      )
      .fromTo(
        ".button-group",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );
  });
  return (
    <section className="relative mx-auto overflow-hidden section-content">
      <div className="content w-full py-12 md:py-24 lg:py-16 translate-y-10 opacity-0 flex justify-center items-center flex-col gap-y-2 size-full">
        <div className="mb-8">
          <div className="relative z-10 w-full h-full flex flex-col 2xl:justify-center items-center translate-y-10 2xl:pt-0 md:pt-32 pt-24">
            <div className="">
              <h1 className="stream overflow-hidden 2xl:text-9xl md:text-[6.5rem] text-[3.3rem] font-bold 2xl:mb-0 mb-5">
                <span className="font-brand">Stream</span> Beyond
              </h1>
            </div>
            <div
              style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
              className="-rotate-3 z-10 border-[.5vw] border-background bg-[#1fd5f9] text-scroll px-2 w-fit"
            >
              <h1 className="uppercase 2xl:text-9xl md:text-[6.5rem] text-[3.3rem] font-bold 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                Boundaries
              </h1>
            </div>
            <h1 className="bolt overflow-hidden 2xl:text-9xl md:text-[6.5rem] text-[3.3rem] font-bold 2xl:mb-0 mb-5">
              Create With <span className="font-brand">Bolt</span>
            </h1>
          </div>
        </div>
        <div className="sub-heading my-6">
          <p className="text-2xl text-center lg:max-w-2xl text-muted-foreground">
            Spin up a live Ingress, link it to OBS or any RTMP-compatible
            broadcaster, and start pushing high-quality, low-latency streams—no
            extra configuration needed.
          </p>
        </div>
        <div className="button-group">
          <Link href={"/browse"}>
            <button className="Btn-Container">
              <span className="text capitalize">let's go!</span>
              <span className="icon-Container">
                <svg
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="1.61321"
                    cy="1.61321"
                    r="1.5"
                    fill="black"
                  ></circle>
                  <circle
                    cx="5.73583"
                    cy="1.61321"
                    r="1.5"
                    fill="black"
                  ></circle>
                  <circle
                    cx="5.73583"
                    cy="5.5566"
                    r="1.5"
                    fill="black"
                  ></circle>
                  <circle
                    cx="9.85851"
                    cy="5.5566"
                    r="1.5"
                    fill="black"
                  ></circle>
                  <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
                  <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
                  <circle
                    cx="5.73583"
                    cy="13.4434"
                    r="1.5"
                    fill="black"
                  ></circle>
                  <circle
                    cx="9.85851"
                    cy="13.4434"
                    r="1.5"
                    fill="black"
                  ></circle>
                  <circle
                    cx="1.61321"
                    cy="17.3868"
                    r="1.5"
                    fill="black"
                  ></circle>
                  <circle
                    cx="5.73583"
                    cy="17.3868"
                    r="1.5"
                    fill="black"
                  ></circle>
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
