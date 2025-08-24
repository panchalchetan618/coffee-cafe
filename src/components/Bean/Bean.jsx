import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import coffeeBeanOne from "../../assets/bean_one.png";
import coffeeBeanTwo from "../../assets/bean_two.png";

const beans = [
  { src: coffeeBeanOne, size: 40 },
  { src: coffeeBeanTwo, size: 50 },
  { src: coffeeBeanOne, size: 35 },
  { src: coffeeBeanTwo, size: 45 },
  { src: coffeeBeanOne, size: 55 },
  { src: coffeeBeanOne, size: 40 },
  { src: coffeeBeanTwo, size: 50 },
  { src: coffeeBeanOne, size: 35 },
  { src: coffeeBeanTwo, size: 45 },
  { src: coffeeBeanOne, size: 55 },
];

const CoffeeBeanBackground = () => {
  const { scrollY } = useScroll();

  return (
    <>
      {beans.map((bean, i) => {
        // Random initial horizontal positions (20% to 80% of screen width)
        const initialLeft = 20 + Math.random() * 60 + "%";
        // Random upward movement range (max = half of viewport height)
        const maxUp = -Math.random() * window.innerHeight * 0.5;

        // Scroll-based animation
        const y = useTransform(scrollY, [0, 1500], [0, maxUp]);
        const x = useTransform(scrollY, [0, 1500], [0, (Math.random() - 0.5) * 100]); // small left-right drift
        const rotate = useTransform(scrollY, [0, 1500], [0, Math.random() * 360]);
        const scale = useTransform(scrollY, [0, 1500], [0.5, 1.2]);

        return (
          <motion.img
            key={i}
            src={bean.src}
            alt="Coffee Bean"
            className="fixed pointer-events-none select-none z-0 opacity-75"
            style={{
              width: bean.size,
              bottom: 0,
              left: initialLeft,
              x,
              y,
              rotate,
              scale,
              transform: "translateX(-50%)",
            }}
          />
        );
      })}
    </>
  );
};

export default CoffeeBeanBackground;
