import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime;
      const duration = 2000;
      const targetValue = parseInt(value, 10);
     
      if (isNaN(targetValue)) {
        setDisplayValue(value);
        return;
      }

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.floor(easeOut * targetValue));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayValue(targetValue);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

export const RevealText = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em] pb-1"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "120%", opacity: 0, filter: "blur(10px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "100px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + (i * 0.04)
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
};

export const ParallaxImage = ({ src, alt, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover absolute inset-0"
      />
    </div>
  );
};

export const ScrollMorphDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"]
  });
 
  // Smoothly scales width from 85% to 100% and border-radius from huge curve to 0
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["10vw", "0vw"]);
 
  return (
    <section className="bg-white dark:bg-[#050505] transition-colors duration-500 w-full flex justify-center pt-10 pb-4 md:pt-20 md:pb-8 relative z-20">
      <div ref={ref} className="w-full h-[35vh] md:h-[70vh] flex justify-center px-4 md:px-0">
         <motion.div
           style={{ scale, borderRadius }}
           className="w-full h-full overflow-hidden relative shadow-2xl dark:shadow-none bg-black"
         >
           <ParallaxImage
             src="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=2940&auto=format&fit=crop"
             alt="Morph Highlight"
             className="w-full h-full brightness-75 dark:brightness-50"
           />
           <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-black/25 dark:bg-black/45 z-10">
             <h2 className="text-white text-3xl sm:text-5xl md:text-8xl font-black tracking-widest uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
               Future Built
             </h2>
           </div>
         </motion.div>
      </div>
    </section>
  );
};

export const PageHeader = ({ title, subtitle, bgImage }) => (
  <section className="pt-32 md:pt-48 pb-16 md:pb-20 px-6 md:px-12 bg-gray-50 dark:bg-[#080808] relative overflow-hidden transition-colors duration-500 min-h-[40vh] md:min-h-[50vh] flex flex-col justify-end">
    {bgImage && (
      <>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src={bgImage} alt="Header Background" className="w-full h-full object-cover opacity-20 dark:opacity-30 object-center" />
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80 dark:to-transparent"></div>
      </>
    )}
    <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/20 dark:bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen z-0" />
   
    <div className="container mx-auto max-w-5xl relative z-10 mt-12 md:mt-0">
      <motion.h1
        className="text-adaptive font-black tracking-tighter mb-4 md:mb-6 text-black dark:text-white"
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 font-light max-w-2xl"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);
