import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const navItems = [
  { name: 'Projects', id: 'projects' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
  { name: 'Resume', id: 'resume' },
];

export const VerticalNav: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-20 hidden md:flex flex-col items-center justify-between py-12 z-50 bg-bg-deep/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-neon-teal font-display text-3xl font-bold glow-text cursor-pointer"
          onClick={() => scrollTo('home')}
        >
          AJ
        </motion.div>
        
        <div className="h-32 w-[1px] bg-white/10" />
      </div>

      <div className="flex flex-col items-center gap-12">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => scrollTo(item.id)}
            className="group relative flex items-center justify-center"
          >
            <span className="vertical-text uppercase tracking-[0.4em] text-[10px] font-tech text-text-primary/60 group-hover:text-neon-teal transition-colors duration-300" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              {item.name}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-8 w-full">
        <div className="h-32 w-[1px] bg-white/10" />
        <div className="flex flex-col gap-8 text-text-primary/40">
          <a href="https://www.linkedin.com/in/aadina-jain-9512a72a2/" target="_blank" rel="noopener noreferrer" className="hover:text-neon-teal transition-colors"><Linkedin size={16} /></a>
          <a href="https://github.com/aadinajain18" target="_blank" rel="noopener noreferrer" className="hover:text-neon-teal transition-colors"><Github size={16} /></a>
        </div>
      </div>
    </nav>
  );
};
