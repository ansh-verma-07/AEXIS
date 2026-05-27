import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { PageHeader, ParallaxImage } from '../components/UI';

export const Contact = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white dark:bg-[#050505]">
      <PageHeader
        title="Initiate."
        subtitle="Connect with our principals to discuss your next visionary project."
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2940&auto=format&fit=crop"
      />
      <section className="py-16 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-black dark:text-white">Global Headquarters</h2>
             
              {/* Added Image Container for Contact Page */}
              <motion.div
                className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8 shadow-lg dark:shadow-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ParallaxImage src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" className="w-full h-full" alt="Headquarters Office" />
              </motion.div>

              <div className="space-y-6 md:space-y-8">
                <motion.div
                  className="flex items-start gap-4 text-gray-600 dark:text-gray-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="text-cyan-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-black dark:text-white font-semibold text-base md:text-lg mb-1">New York</h4>
                    <p className="text-sm md:text-base">One World Trade Center<br/>Suite 8500<br/>New York, NY 10007</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start gap-4 text-gray-600 dark:text-gray-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Mail className="text-cyan-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-black dark:text-white font-semibold text-base md:text-lg mb-1">Email Inquiry</h4>
                    <p className="text-sm md:text-base">projects@aexis-build.com<br/>careers@aexis-build.com</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start gap-4 text-gray-600 dark:text-gray-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Phone className="text-cyan-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-black dark:text-white font-semibold text-base md:text-lg mb-1">Direct Line</h4>
                    <p className="text-sm md:text-base">+1 (212) 555-0199</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="liquid-glass p-6 md:p-10 rounded-3xl"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2 text-gray-600 dark:text-gray-500">First Name</label>
                    <input type="text" className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2 text-gray-600 dark:text-gray-500">Last Name</label>
                    <input type="text" className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2 text-gray-600 dark:text-gray-500">Company / Organization</label>
                  <input type="text" className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2 text-gray-600 dark:text-gray-500">Project Scope</label>
                  <textarea rows="4" className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"></textarea>
                </div>
                <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 md:py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg">
                  Submit Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
