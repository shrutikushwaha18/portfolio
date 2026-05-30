import React, { useState } from 'react';
import SpiralBackground from './components/SpiralBackground';
import HeroSection from './components/HeroSection';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Home, User, GraduationCap, Code, FileText } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home', icon: <Home size={16} /> },
    { name: 'Projects', id: 'projects', icon: <Code size={16} /> },
    { name: 'About', id: 'about', icon: <User size={16} /> },
    { name: 'Resume', id: 'resume', icon: <FileText size={16} /> },
    { name: 'Education', id: 'education', icon: <GraduationCap size={16} /> },
    { name: 'Contact', id: 'contact', icon: <Mail size={16} /> },
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/shrutikushwaha18', icon: <Github size={18} /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shrutikush06', icon: <Linkedin size={18} /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-neon-teal/30">
      <SpiralBackground />
      
      {/* Mobile Menu Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-20 z-[100] px-6 flex items-center justify-between bg-bg-deep/40 backdrop-blur-md border-b border-white/5">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <span className="absolute top-0 left-0 text-neon-teal font-display text-3xl font-black leading-none z-10">S</span>
          <span className="absolute top-1.5 left-3 text-neon-teal/30 font-display text-3xl font-black leading-none">K</span>
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 rounded-full bg-bg-mid/80 backdrop-blur-md border border-neon-teal/20 text-neon-teal glow-box transition-all duration-300 active:scale-90"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-24 right-6 w-[calc(100vw-3rem)] max-w-xs max-h-[calc(100vh-8rem)] bg-bg-deep/95 backdrop-blur-xl border border-neon-teal/20 rounded-2xl overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] scrollbar-hide"
            >
              <div className="p-6 flex flex-col gap-1">
                <p className="text-[10px] font-tech text-neon-teal/50 uppercase tracking-[0.3em] mb-4 px-2">Navigation</p>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="flex items-center gap-4 w-full p-3 rounded-xl text-text-secondary hover:text-neon-teal hover:bg-white/5 transition-all group"
                  >
                    <span className="text-neon-teal/40 group-hover:text-neon-teal transition-colors">
                      {link.icon}
                    </span>
                    <span className="text-sm font-tech uppercase tracking-widest">{link.name}</span>
                  </button>
                ))}

                <div className="h-[1px] bg-white/5 my-4 mx-2" />

                <p className="text-[10px] font-tech text-neon-teal/50 uppercase tracking-[0.3em] mb-4 px-2">Socials</p>
                <div className="flex gap-2 px-2 pb-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center p-3 rounded-xl bg-white/5 text-text-secondary hover:text-neon-teal hover:bg-white/10 transition-all border border-white/5 hover:border-neon-teal/20"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="relative z-10">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HeroSection />
            <Projects />
            <About />
            <Education />
            <Contact />
            
            <footer className="py-12 px-6 border-t border-white/5 text-center">
              <div className="container mx-auto">
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.5em]">
                  © 2026 Shruti Kushwaha • Built with React & Three.js
                </p>
              </div>
            </footer>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Menu */}
    </div>
  );
}
