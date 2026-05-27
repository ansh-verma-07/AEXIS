import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + Math.floor(Math.random() * 25) + 15;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 noise-bg opacity-10"></div>
     
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="text-4xl md:text-6xl font-black tracking-tighter mb-8 flex items-baseline leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          AEXIS<span className="text-cyan-500 ml-1">.</span>
        </motion.div>
       
        <div className="w-64 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mb-4 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-lime-400"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
       
        <div className="flex justify-between w-64 text-xs font-mono text-gray-500 dark:text-gray-400">
          <span>INITIALIZING</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
};
export default Loader;
