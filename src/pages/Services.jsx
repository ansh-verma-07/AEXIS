import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PageHeader, ParallaxImage, RevealText } from '../components/UI';

export const Services = () => {
  const servicesList = [
    { title: "Civil Construction", desc: "Heavy infrastructure, highways, and massive earthworks executed with cutting-edge machinery.", img: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea" },
    { title: "Structural Engineering", desc: "Advanced load analysis, seismic design, and innovative material utilization for skyscrapers.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
    { title: "Architecture Planning", desc: "Award-winning design studio creating iconic facades and optimized interior spaces.", img: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8" },
    { title: "Smart Infrastructure", desc: "Integration of IoT, sustainable energy grids, and automated building management systems.", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white dark:bg-[#050505]">
      <PageHeader
        title="Expertise."
        subtitle="Comprehensive capabilities spanning the entire lifecycle of monumental construction."
        bgImage="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop"
      />
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-24 md:space-y-32">
            {servicesList.map((srv, i) => (
              <motion.div
                key={i}
                className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden relative group shadow-xl dark:shadow-none">
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500 pointer-events-none"></div>
                  <ParallaxImage
                    src={`${srv.img}?q=80&w=2831&auto=format&fit=crop`}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                    alt={srv.title}
                  />
                </div>
                <div className="w-full md:w-1/2 md:px-12">
                  <div className="text-cyan-500 font-mono text-xs md:text-sm mb-3 md:mb-4">0{i + 1} // EXPERTISE</div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-black dark:text-white"><RevealText text={srv.title} delay={0.2} /></h2>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-500 font-light mb-6 md:mb-8">{srv.desc}</p>
                  <button className="flex items-center gap-2 font-semibold uppercase tracking-wider text-xs md:text-sm text-black dark:text-white hover:text-cyan-500 dark:hover:text-cyan-500 transition-colors">
                    Explore Capability <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
