import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader, ParallaxImage, RevealText, AnimatedNumber } from '../components/UI';

export const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white dark:bg-[#050505]">
      <PageHeader
        title="Our Story."
        subtitle="Two decades of redefining architectural limits and engineering excellence across the globe."
        bgImage="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2940&auto=format&fit=crop"
      />
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden h-[400px] md:h-[600px] w-full shadow-2xl dark:shadow-none"
            >
              <ParallaxImage src="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=2940&auto=format&fit=crop" className="w-full h-full" alt="Construction site" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-black dark:text-white"><RevealText text="Visionaries in Concrete & Steel." /></h2>
              <div className="space-y-4 md:space-y-6 text-gray-600 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed">
                <p>
                  Founded in 1999, AEXIS began with a singular vision: to construct not just buildings, but enduring legacies. We believe that true engineering art lies at the intersection of aesthetic beauty and unyielding structural integrity.
                </p>
                <p>
                  Our multidisciplinary team of architects, structural engineers, and master builders collaborate seamlessly to deliver turnkey mega-projects. From conceptual blueprints to final handover, our process is defined by military precision and luxury finish.
                </p>
              </div>
             
              <div className="mt-10 md:mt-12 grid grid-cols-2 gap-6 md:gap-8">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-cyan-500 mb-1 md:mb-2 flex items-baseline">
                    <AnimatedNumber value="100" />%
                  </div>
                  <div className="text-xs md:text-sm uppercase tracking-wider font-medium text-black dark:text-white">Safety Record</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-lime-500 mb-1 md:mb-2 flex items-baseline">
                    <AnimatedNumber value="40" />+
                  </div>
                  <div className="text-xs md:text-sm uppercase tracking-wider font-medium text-black dark:text-white">Global Markets</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
