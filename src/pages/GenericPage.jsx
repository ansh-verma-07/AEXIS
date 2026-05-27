import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxImage } from '../components/UI';

export const GenericPage = ({ title }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center text-center px-6 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500 pt-20">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover opacity-10 dark:opacity-20" alt="Background" />
    </div>
    <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent to-white dark:to-[#050505]"></div>
   
    <div className="container relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-12 md:mt-0">
      <motion.div
        className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl dark:shadow-none relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
         <ParallaxImage src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop" className="w-full h-full" alt={title} />
         <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6">
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl">{title}</h1>
         </div>
      </motion.div>
      <p className="text-xl text-gray-600 dark:text-gray-500 font-light">Cinematic experience in development.</p>
    </div>
  </motion.div>
);

export default GenericPage;
