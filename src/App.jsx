import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import GenericPage from './pages/GenericPage';

// --- GLOBAL STYLES & UTILITIES ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  :root {
    --bg-light: #FAFAFA;
    --text-light: #0A0A0A;
    --bg-dark: #050505;
    --text-dark: #F9FAFB;
    --accent: #06B6D4;
    --accent-glow: #84CC16;
  }

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overscroll-behavior-y: none; /* Prevents mobile pull-to-refresh glitch over loader */
    background-color: var(--bg-light);
    color: var(--text-light);
    transition: background-color 0.5s ease, color 0.5s ease;
  }

  body.dark {
    background-color: var(--bg-dark);
    color: var(--text-dark);
  }

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  /* Liquid Glass Utility - Adapts to Light/Dark */
  .liquid-glass {
    background: rgba(0, 0, 0, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease;
  }

  .dark .liquid-glass {
    background: rgba(255, 255, 255, 0.02);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.05) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .dark .liquid-glass::before {
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%);
  }

  .bottom-blur-overlay {
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    mask-image: linear-gradient(to top, black 0%, transparent 45%);
    -webkit-mask-image: linear-gradient(to top, black 0%, transparent 45%);
    pointer-events: none;
  }

  .noise-bg {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 50;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }
 
  .dark .noise-bg { opacity: 0.06; filter: invert(1); }

  .text-adaptive {
    font-size: clamp(2.5rem, 8vw, 6rem);
    line-height: 1.05;
  }
`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
 
  // Default to system preference for light/dark mode
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Fallback to dark if window is undefined
  });

  const pageTransitionVariants = {
    initial: { opacity: 0, y: 15, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -15, filter: "blur(8px)", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }
  };

  useEffect(() => {
    // Inject global styles
    const styleTag = document.createElement('style');
    styleTag.innerHTML = globalStyles;
    document.head.appendChild(styleTag);

    // Listen for OS level theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      document.head.removeChild(styleTag);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  // Initialize cinematic smooth scroll for desktop users
  useEffect(() => {
    let lenis;
    let animationFrameId;
   
    const initScroll = async () => {
      // Apply only on desktop view
      if (window.innerWidth > 768) {
        try {
          // Replaced auto-scroller with Lenis for premium mouse-wheel smooth scrolling
          const module = await import('https://esm.sh/@studio-freight/lenis');
          const Lenis = module.default;
         
          lenis = new Lenis({
            duration: 1.5, // Cinematic slow easing
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.7, // Slows down the mouse wheel scroll speed for luxury feel
            touchMultiplier: 2,
          });

          const raf = (time) => {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
          };

          animationFrameId = requestAnimationFrame(raf);
        } catch (err) {
          console.warn("Could not load smooth scroll:", err);
        }
      }
    };

    initScroll();

    return () => {
      // Clean up animation frame and instance on unmount
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`app-container ${isDark ? 'dark' : ''}`}>
       
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500"
            >
              <Navigation />
             
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                      <motion.div
                        variants={pageTransitionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full"
                      >
                        <Home />
                      </motion.div>
                    } />
                    <Route path="/about" element={
                      <motion.div
                        variants={pageTransitionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full"
                      >
                        <About />
                      </motion.div>
                    } />
                    <Route path="/services" element={
                      <motion.div
                        variants={pageTransitionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full"
                      >
                        <Services />
                      </motion.div>
                    } />
                    <Route path="/projects" element={
                      <motion.div
                        variants={pageTransitionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full"
                      >
                        <Projects />
                      </motion.div>
                    } />
                    <Route path="/contact" element={
                      <motion.div
                        variants={pageTransitionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full"
                      >
                        <Contact />
                      </motion.div>
                    } />
                    <Route path="*" element={
                      <motion.div
                        variants={pageTransitionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full"
                      >
                        <GenericPage title={location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(1).slice(1)} />
                      </motion.div>
                    } />
                  </Routes>
                </AnimatePresence>
              </main>

              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}
