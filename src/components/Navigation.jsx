import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isHome = location.pathname === '/';
  const useLightText = (isHome && !scrolled) || isDark;

  const getNavLinkClass = (path) => {
    const active = isActive(path);
    if (active) {
      if (scrolled) {
        return isDark 
          ? 'bg-white/10 text-white shadow-sm' 
          : 'bg-black/10 text-black shadow-sm';
      } else {
        return useLightText 
          ? 'bg-white/20 text-white shadow-sm' 
          : 'bg-black/10 text-black shadow-sm';
      }
    } else {
      if (scrolled) {
        return isDark 
          ? 'text-gray-400 hover:text-white' 
          : 'text-gray-600 hover:text-black';
      } else {
        return useLightText 
          ? 'text-white/70 hover:text-white hover:bg-white/10' 
          : 'text-black/70 hover:text-black hover:bg-black/5';
      }
    }
  };

  const getToggleClass = () => {
    if (scrolled) {
      return isDark 
        ? 'bg-white/5 text-white hover:bg-white/10' 
        : 'bg-black/5 text-black hover:bg-black/10';
    } else {
      return useLightText 
        ? 'liquid-glass text-white hover:bg-white/20' 
        : 'liquid-glass text-black hover:bg-black/5';
    }
  };

  const getMobileToggleClass = () => {
    if (isOpen) {
      return isDark ? 'text-white' : 'text-black';
    }
    return useLightText ? 'text-white' : 'text-black';
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-black/5 dark:border-white/5' : 'py-6 md:py-8'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div
            className={`text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-1 z-50 transition-colors ${useLightText ? 'text-white' : 'text-black'}`}
            onClick={() => handleNav('/')}
          >
            AEXIS<span className="text-cyan-500">.</span>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-2 rounded-full px-2 py-2 transition-colors ${scrolled ? 'bg-black/5 dark:bg-white/5' : 'liquid-glass'}`}>
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${getNavLinkClass(link.path)}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4 z-50">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10 ${getToggleClass()}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className={`px-6 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-all flex items-center gap-2 ${useLightText ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              Consultation <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden z-50 p-2 transition-colors ${getMobileToggleClass()}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%', filter: 'blur(10px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-6 text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <button
                    onClick={() => handleNav(link.path)}
                    className={`text-4xl font-light tracking-tight ${
                      isActive(link.path) ? 'text-cyan-500' : 'text-black dark:text-white'
                    }`}
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Theme Toggle moved to the bottom to prevent overlap with logo */}
            <motion.div
              className="absolute bottom-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                <span className="text-sm font-medium uppercase tracking-widest">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
