import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Twitter, Linkedin, Github, Mail } from "lucide-react";

export function FooterEnhanced() {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative py-16 border-t border-white/10 overflow-hidden">
      {/* Background with grain drift */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-[#F5F8FA] to-[#EBFAFF] opacity-60"
        animate={shouldReduceMotion ? {} : {
          backgroundPosition: ["0% 0%", "0.2px 0.2px", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "100.2% 100.2%",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg glass-surface flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#2D6AE3]" strokeWidth={2} />
                </div>
                <span className="text-2xl" style={{ fontWeight: 700, color: "#0F172A" }}>
                  Byte&Brisk
                </span>
              </div>
              <p style={{ color: "#475569", fontSize: "0.9375rem", maxWidth: "360px", lineHeight: 1.6 }}>
                Building fast. Thinking deep. Modern software with precision and momentum.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {[
                  { icon: Twitter, label: "Twitter" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Github, label: "GitHub" },
                  { icon: Mail, label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg glass-surface flex items-center justify-center transition-all duration-200"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    whileHover={{ 
                      y: -2,
                      background: "rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 4px 12px rgba(16, 24, 40, 0.12)",
                    }}
                  >
                    <social.icon className="w-5 h-5 text-[#334155]" strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="mb-4" style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#0F172A" }}>
              Services
            </h4>
            <ul className="space-y-3">
              {["SaaS Development", "MVP Build", "Dashboard Design", "API Integration", "Cloud Infrastructure"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[#475569] hover:text-[#2D6AE3] transition-colors duration-200"
                    style={{ fontSize: "0.9375rem" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="mb-4" style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#0F172A" }}>
              Company
            </h4>
            <ul className="space-y-3">
              {["About", "Work", "Process", "Contact", "Blog"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[#475569] hover:text-[#2D6AE3] transition-colors duration-200"
                    style={{ fontSize: "0.9375rem" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="caption">
            © {currentYear} Byte&Brisk. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="caption hover:text-[#2D6AE3] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="caption hover:text-[#2D6AE3] transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
