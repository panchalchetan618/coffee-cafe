import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import HeroPng from "../../assets/coffee2.png";

// Register the TextPlugin
gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const textRef = useRef(null);
  const coffeeRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Split the text into words for animation
    const words = textRef.current.querySelectorAll('.word');
    const coffeeSpan = coffeeRef.current;

    // Set initial states
    gsap.set(words, { 
      opacity: 0, 
      y: 100,
      rotationX: -90,
      transformOrigin: "50% 50% -100px"
    });
    gsap.set(coffeeSpan, { 
      opacity: 0, 
      scale: 0,
      rotation: -180,
      color: "#ffffff"
    });
    gsap.set(buttonRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.8
    });

    // Create a more complex animation sequence
    tl
      // Animate words with 3D flip effect
      .to(words, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: {
          amount: 0.8,
          from: "random",
        },
        ease: "back.out(1.7)"
      })
      // Animate "Coffee" with special effects
      .to(coffeeSpan, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.5")
      // Add a text color animation for "Coffee"
      .to(coffeeSpan, {
        backgroundPosition: "200% center",
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      }, "-=0.5")
      // Animate button with bounce
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "bounce.out"
      }, "-=0.8")
      // Add a subtle floating animation to all words
      .to(words, {
        y: -5,
        duration: 2,
        ease: "sine.inOut",
        stagger: {
          amount: 0.5,
          repeat: -1,
          yoyo: true
        }
      }, "-=0.5")
      // Add a pulsing glow effect to "Coffee"
      .to(coffeeSpan, {
        textShadow: "0 0 20px rgba(255, 165, 0, 0.8), 0 0 30px rgba(255, 165, 0, 0.6), 0 0 40px rgba(255, 165, 0, 0.4)",
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      }, "-=1");

    // Hover animations for interactivity
    const handleWordHover = (word) => {
      gsap.to(word, {
        scale: 1.1,
        color: "#ffa500",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleWordLeave = (word) => {
      gsap.to(word, {
        scale: 1,
        color: "#ffffff",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Add hover effects to words
    words.forEach(word => {
      word.addEventListener('mouseenter', () => handleWordHover(word));
      word.addEventListener('mouseleave', () => handleWordLeave(word));
    });

    // Cleanup function
    return () => {
      words.forEach(word => {
        word.removeEventListener('mouseenter', () => handleWordHover(word));
        word.removeEventListener('mouseleave', () => handleWordLeave(word));
      });
      tl.kill();
    };

  }, []);

  return (
    <>
      <div className="min-h-[100dvh] bg-brandDark flex justify-center items-center text-white overflow-hidden">
        <div className="container pb-8 sm:pb-0 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2"> 
            {/* text content section */}
            <div className="flex flex-col justify-center gap-6 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
              <h1
                ref={textRef}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="word cursor-pointer inline-block">We</span>{" "}
                <span className="word cursor-pointer inline-block">serve</span>{" "}
                <span className="word cursor-pointer inline-block">the</span>{" "}
                <span className="word cursor-pointer inline-block">richest</span>{" "}
                <span
                  ref={coffeeRef}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-400 to-secondary font-cursive inline-block cursor-pointer"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  Coffee
                </span>{" "}
                <span className="word cursor-pointer inline-block">in</span>{" "}
                <span className="word cursor-pointer inline-block">the</span>{" "}
                <span className="word cursor-pointer inline-block">city</span>
              </h1>
              <div>
                <button 
                  ref={buttonRef}
                  className="bg-gradient-to-r from-primary to-secondary border-2 border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 duration-300 text-white py-3 px-6 rounded-full font-semibold transition-all"
                >
                  See flavours
                </button>
              </div>
            </div>
            {/* Image section */}
            <div
              data-aos="zoom-in"
              data-aos-duration="300"
              className="min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 "
            >
              <img
                data-aos-once="true"
                src={HeroPng}
                alt="coffee img"
                className="w-[300px] sm:w-[450px] sm:scale-125 mx-auto spin "
              />
              <div
                data-aos="fade-right"
                data-aos-offset="0"
                className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl absolute bottom-10 right-10 shadow-lg"
              >
                <h1 className="text-white font-semibold">Best Coffee</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
