"use client";
import { useGSAP } from "@gsap/react";
import { Marquee } from "./ui/marquee";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

interface MarqueeItemProps {
  logo: string;
  alt: string;
  styleClass?: string;
}

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
  useGSAP(() => {
    // const textSplit = SplitText.create(".marquee-heading",{
    //   type: "chars"
    // });
    const marqueeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".marquee-heading",
        start: "top 80%", // when top of element hits 80% of viewport height
        toggleActions: "play none none none",
      },
    });

    marqueeTl
      .fromTo(
        ".marquee-heading",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        }
      )
      .fromTo(
        ".marquee-item",
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.5"
      );
  });
  const logos = [
    {
      id: 1,
      logo: "/streamlabs.svg",
      alt: "Streamlabs",
      styleClass: "",
    },
    {
      id: 2,
      logo: "/vMix.svg",
      alt: "vMix",
      styleClass: "",
    },
    {
      id: 3,
      logo: "/restream.svg",
      alt: "restream",
      styleClass: "",
    },
    {
      id: 4,
      logo: "/FFmpeg.svg",
      alt: "FFmpeg",
      styleClass: "",
    }
  ];
  return (
    <div className="flex flex-col items-center lg:my-14 mx-5 marquee-content">
      <h1 className="lg:text-4xl text-white marquee-heading overflow-hidden">
        Compatible with
      </h1>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden marquee-item">
        <Marquee className="[--duration:15s]">
          {logos.map((eachLogo) => (
            <MarqueeItem key={eachLogo.id} {...eachLogo} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
}

export const MarqueeItem = ({ logo, alt, styleClass }: MarqueeItemProps) => {
  return (
    <figure
      className={"relative h-full w-64 cursor-pointer overflow-hidden p-4"}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        <img
          className={`h-14 w-auto object-contain opacity-70 grayscale ${styleClass}`}
          alt={alt}
          src={logo}
        />
      </div>
    </figure>
  );
};
