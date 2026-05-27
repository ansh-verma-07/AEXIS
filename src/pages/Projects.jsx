import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader, ParallaxImage } from '../components/UI';

export const Projects = () => {
  const projects = [
    { title: "The Meridian", type: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
    { title: "Eco District", type: "Masterplan", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607" },
    { title: "Horizon Bridge", type: "Infrastructure", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f" },
    { title: "Oasis Terminal", type: "Aviation", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05" },
    { title: "Lumina Towers", type: "Residential", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00" },
    { title: "Apex Stadium", type: "Sports", img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white dark:bg-[#050505]">
      <PageHeader
        title="Selected Works."
        subtitle="A curated gallery of our most ambitious and structurally complex achievements."
        bgImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2940&auto=format&fit=crop"
      />
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                className="group relative h-[350px] md:h-[500px] overflow-hidden cursor-pointer rounded-2xl md:rounded-none shadow-lg dark:shadow-none"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.7 }}
              >
                <ParallaxImage
                  src={`${proj.img}?q=80&w=1000&auto=format&fit=crop`}
                  className="w-full h-full transition-transform duration-1000 group-hover:scale-110"
                  alt={proj.title}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex flex-col items-center justify-center">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{proj.title}</h3>
                    <span className="text-cyan-400 tracking-widest uppercase text-xs font-semibold">{proj.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Projects;
