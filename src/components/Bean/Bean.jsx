import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import coffeeBeanOne from "../../assets/bean_one.png";
import coffeeBeanTwo from "../../assets/bean_two.png";

const beans = [
  { src: coffeeBeanOne, size: 45 },
  { src: coffeeBeanTwo, size: 38 },
  { src: coffeeBeanOne, size: 50 },
  { src: coffeeBeanTwo, size: 42 },
  { src: coffeeBeanOne, size: 60 },
  { src: coffeeBeanTwo, size: 37 },
  { src: coffeeBeanOne, size: 52 },
  { src: coffeeBeanTwo, size: 33 },
  { src: coffeeBeanOne, size: 48 },
  { src: coffeeBeanTwo, size: 57 },
  { src: coffeeBeanOne, size: 44 },
  { src: coffeeBeanTwo, size: 53 },
  { src: coffeeBeanOne, size: 36 },
  { src: coffeeBeanTwo, size: 49 },
  { src: coffeeBeanOne, size: 56 },
  { src: coffeeBeanTwo, size: 39 },
  { src: coffeeBeanOne, size: 55 },
  { src: coffeeBeanTwo, size: 34 },
  { src: coffeeBeanOne, size: 46 },
  { src: coffeeBeanTwo, size: 59 },
];

const CoffeeBeanBackground = () => {
  const { scrollYProgress } = useScroll();

  // Generate consistent random values for each bean
  const beanProperties = useMemo(() => 
    beans.map(() => ({
      initialLeft: 20 + Math.random() * 60,
      maxUp: Math.random() * 0.5, // Random upward movement (0 to 50% of viewport)
      xDrift: (Math.random() - 0.5) * 100,
      rotationAmount: Math.random() * 360,
    })), []
  );

  return (
    <>
      {beans.map((bean, i) => {
        const props = beanProperties[i];
        
        // Upward movement capped at 50% of viewport height
        const yUp = useTransform(
          scrollYProgress,
          [0, 0.8], // Move up during first 80% of scroll
          [0, -window.innerHeight * props.maxUp]
        );

        // Small horizontal drift
        const xDrift = useTransform(
          scrollYProgress,
          [0, 1],
          [0, props.xDrift]
        );

        // Continuous rotation
        const rotate = useTransform(
          scrollYProgress,
          [0, 1],
          [0, props.rotationAmount]
        );

        // Scale animation
        const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1.2]);

        return (
          <motion.img
            key={i}
            src={bean.src}
            alt="Coffee Bean"
            className="fixed pointer-events-none select-none z-0"
            style={{
              width: bean.size,
              bottom: 0,
              left: `${props.initialLeft}%`,
              x: xDrift,
              y: yUp,
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
