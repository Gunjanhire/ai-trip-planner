import React, { useEffect, useRef } from "react";
import Button from "../ui/button_new";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Hero() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const travelLocallyRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(heroRef.current, { opacity: 0 });

      gsap.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { color: "#2d4467" },
        {
          color: "#69baf2",
          duration: 1.5,
          repeat: 1,
          yoyo: true,
          ease: "power1.inOut",
        }
      );

      // Travel locally animation
      gsap.fromTo(
        travelLocallyRef.current,
        { color: "#2d4467" },
        {
          color: "#69baf2",
          duration: 1.5,
          repeat: 1,
          yoyo: true,
          ease: "power1.inOut",
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen bg-cover bg-center flex items-start px-6 sm:px-12 lg:px-32 pt-24 sm:pt-28 lg:pt-36"
      style={{ backgroundImage: "url('/hero1.jpg')" }}
    >
      <div className="max-w-5xl w-full">
        <h1
          ref={headingRef}
          className="font-sinethar text-4xl sm:text-5xl lg:text-6xl xl:text-8xl leading-tight -mt-18 sm:-mt-7 "
        >
          No better time to <br className="hidden md:inline" />
          <span ref={travelLocallyRef} className=" text-[#2c4d67]">
            Travel locally
          </span>
        </h1>

        <p
          ref={paragraphRef}
          className="font-passion text-md sm:text-xl lg:text-2xl mt-8 text-[#7c8da7] max-w-3xl"
        >
          Build, personalize, and optimize your itineraries with our free AI
          trip planner. Designed for vacations, workations, and everyday
          adventures.
        </p>

        <div ref={buttonContainerRef} className="mt-6">
          <Link to="/create-trip">
            <Button className="px-6 py-3 text-lg">
              Get Started. It's Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
