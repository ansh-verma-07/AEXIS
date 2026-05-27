import React, { useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowRight, Building2, Map, TreePine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { RevealText, ParallaxImage, ScrollMorphDivider, AnimatedNumber } from '../components/UI';

export const Home = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      {/* HERO SECTION */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-black pt-28 pb-20 md:pt-0 md:pb-0">
        {/* Background Video */}
        <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4" type="video/mp4" />
          </video>
          {/* Overlay to ensure text readability even in light mode, as video is inherently dark */}
          <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? 'bg-black/60 mix-blend-multiply' : 'bg-black/30'}`}></div>
        </motion.div>

        {/* Bottom Blur Mask */}
        <div className="absolute inset-0 z-0 bottom-blur-overlay"></div>

        {/* Hero Content - Text remains white here because the video underneath is dark */}
        <div className="container relative z-10 px-6 md:px-12 w-full flex-grow flex flex-col justify-center">
          <div className="max-w-5xl text-white">
            <motion.div
              className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {['25+ Years Experience', '150+ Projects', 'Award Winning', 'Smart Infrastructure'].map((tag, i) => (
                <span key={i} className="liquid-glass text-[10px] sm:text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium border-white/20">
                  {tag}
                </span>
              ))}
            </motion.div>

            <h1 className="text-adaptive font-bold tracking-tighter mb-4 md:mb-6">
              <RevealText text="Engineering Tomorrow's" delay={0.6} />
              <br />
              <RevealText text="Skylines." delay={0.9} className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white" />
            </h1>
           
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl font-light leading-relaxed mb-8 md:mb-10"
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Premium civil engineering and infrastructure solutions crafted with precision, innovation, and visionary architecture.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <button
                onClick={() => handleNav('/projects')}
                className="liquid-glass w-full sm:w-auto px-6 md:px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2 group border border-white/20"
              >
                Explore Projects <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleNav('/contact')}
                className="bg-white text-black w-full sm:w-auto px-6 md:px-8 py-4 rounded-full font-medium hover:scale-[1.02] transition-transform shadow-xl"
              >
                Get Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- NEW PARALLAX MORPHING DIVIDER TO BRIDGE THE GAP --- */}
      <ScrollMorphDivider />

      {/* SERVICES PREVIEW */}
      <section className="pb-24 pt-4 md:pb-32 md:pt-8 relative bg-white dark:bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 md:mb-4 text-black dark:text-white">
                <RevealText text="Mastering the Built Environment" />
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-light">
                Comprehensive end-to-end solutions for monumental structures and sustainable urban landscapes.
              </p>
            </div>
            <button
              onClick={() => handleNav('/services')}
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black dark:text-white hover:text-cyan-500 dark:hover:text-cyan-500 transition-colors"
            >
              View All Services <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Commercial Towers", desc: "State-of-the-art high-rises combining architectural brilliance with structural integrity.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
              { icon: Map, title: "Urban Infrastructure", desc: "Smart city planning, bridges, and transport hubs designed for future mobility.", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop" },
              { icon: TreePine, title: "Sustainable Dev", desc: "LEED-certified construction minimizing environmental impact while maximizing efficiency.", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop" }
            ].map((srv, i) => (
              <motion.div
                key={i}
                className="liquid-glass p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-500 cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
              >
                {/* Background Image on Hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
                  <img src={srv.img} alt={srv.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                </div>
               
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform bg-white/50 dark:bg-black/50 backdrop-blur-md">
                    <srv.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-black dark:text-white">{srv.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gray-100 dark:bg-zinc-900 transition-colors duration-500">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-black/10 dark:divide-white/10">
            {[
              { num: "150", suffix: "+", label: "Completed Projects" },
              { num: "25", suffix: "", label: "Years Excellence" },
              { num: "40", suffix: "+", label: "Industry Awards" },
              { num: "12", suffix: "B", label: "Value Delivered ($)" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="pl-4 md:pl-12 flex flex-col justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-500 dark:from-white dark:to-gray-500 flex items-baseline">
                  <AnimatedNumber value={stat.num} /><span className="text-cyan-500">{stat.suffix}</span>
                </div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 md:py-32 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="container mx-auto px-6 md:px-12">
           <div className="mb-16 md:mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6 text-black dark:text-white">
                <RevealText text="Visionary Portfolios" />
              </h2>
              <p className="text-gray-600 dark:text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-light">
                Explore our hallmark developments shaping modern skylines and infrastructure worldwide.
              </p>
           </div>

           <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Left Column */}
              <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
                {[
                  { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop", title: "Apex Tower", tag: "Commercial", h: "h-[350px] md:h-[600px]", delay: 0 },
                  { img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2950&auto=format&fit=crop", title: "Echo Residences", tag: "Residential", h: "h-[350px] md:h-[400px]", delay: 0 },
                ].map((proj, i) => (
                  <motion.div
                    key={i}
                    className={`group relative overflow-hidden rounded-3xl ${proj.h}`}
                    initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, delay: proj.delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ParallaxImage
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10 pointer-events-none">
                      <span className="text-cyan-400 text-xs md:text-sm font-semibold mb-2">{proj.tag}</span>
                      <h3 className="text-white text-2xl md:text-3xl font-bold translate-y-10 group-hover:translate-y-0 transition-transform duration-500">{proj.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column */}
              <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8 md:pt-20">
                {[
                  { img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2831&auto=format&fit=crop", title: "Lumina Bridge", tag: "Infrastructure", h: "h-[350px] md:h-[400px]", delay: 0.2 },
                  { img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2944&auto=format&fit=crop", title: "Nexus Museum", tag: "Cultural", h: "h-[350px] md:h-[600px]", delay: 0.2 },
                ].map((proj, i) => (
                  <motion.div
                    key={i}
                    className={`group relative overflow-hidden rounded-3xl ${proj.h}`}
                    initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, delay: proj.delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ParallaxImage
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10 pointer-events-none">
                      <span className="text-cyan-400 text-xs md:text-sm font-semibold mb-2">{proj.tag}</span>
                      <h3 className="text-white text-2xl md:text-3xl font-bold translate-y-10 group-hover:translate-y-0 transition-transform duration-500">{proj.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
           
           <div className="mt-16 md:mt-20 flex justify-center">
             <button
                onClick={() => handleNav('/projects')}
                className="px-8 md:px-10 py-4 md:py-5 rounded-full border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-medium text-sm md:text-base"
              >
               View Full Portfolio
             </button>
           </div>
        </div>
      </section>
     
      {/* CTA SECTION */}
      <section className="py-32 md:py-40 relative overflow-hidden flex items-center justify-center text-center bg-white dark:bg-[#050505]">
        <div className="absolute inset-0 bg-cyan-50 dark:bg-cyan-900/20 mix-blend-overlay z-0 transition-colors duration-500"></div>
        <div className="container relative z-10 px-6">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 max-w-4xl mx-auto leading-tight text-black dark:text-white">
            Let's Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-lime-500">Future</span> Together.
          </h2>
          <button
            onClick={() => handleNav('/contact')}
            className="bg-black dark:bg-white text-white dark:text-black px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Start a Project
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
