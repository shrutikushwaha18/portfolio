import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, ChevronDown } from 'lucide-react';
import SpiralMesh from './SpiralMesh';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden bg-bg-deep">
      {/* Outer Frame */}
      <div className="absolute inset-4 md:inset-8 border border-neon-teal/20 rounded-[2rem] pointer-events-none z-40" />
      
      {/* Main Content Container */}
      <div className="relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] bg-bg-deep rounded-[2rem] overflow-hidden flex flex-col md:flex-row border border-white/5">
        
        {/* Left Sidebar */}
        <div className="hidden md:flex w-24 h-full flex-col items-center py-6 border-r border-white/5 z-30 bg-bg-deep/50 backdrop-blur-sm">
          {/* Logo */}
          <div className="relative w-12 h-12 flex items-center justify-center mb-8">
            <span className="absolute top-0 left-0 text-neon-teal font-display text-4xl font-black leading-none z-10">A</span>
            <span className="absolute top-2 left-4 text-neon-teal/30 font-display text-4xl font-black leading-none">J</span>
          </div>

          {/* Navigation & Socials Combined for Even Spacing */}
          <div className="flex flex-col gap-4 items-center">
            {['Resume', 'Contact', 'About', 'Projects'].map((item) => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="text-text-secondary hover:text-neon-teal transition-colors text-[8px] uppercase tracking-[0.2em] font-tech py-1"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                {item}
              </button>
            ))}
            <div className="w-4 h-[1px] bg-white/10 my-2" />
            <a href="https://www.linkedin.com/in/aadina-jain-9512a72a2/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-teal transition-colors p-1"><Linkedin size={14} /></a>
            <a href="https://github.com/aadinajain18" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-teal transition-colors p-1"><Github size={14} /></a>
          </div>
        </div>

        {/* Center & Right Content Area */}
        <div className="flex-1 relative flex items-center px-12 md:px-24">
          
          {/* Futuristic Spiral Mesh Animation */}
          <SpiralMesh />

          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="text-text-secondary font-tech tracking-[0.4em] uppercase text-[10px] mb-4">
              I'M SHRUTI KUSHWAHA
            </p>
            <div className="flex flex-col gap-1">
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-neon-teal glow-text">
                Developer
              </h1>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-neon-teal/40">
                Designer
              </h1>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-neon-teal/10">
                Creator
              </h1>
            </div>
          </motion.div>

          {/* Top Right Contact Button (Inside Frame) */}
          <div className="absolute top-6 right-6 z-50 hidden md:block">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-2 border border-neon-teal/40 text-neon-teal text-[10px] uppercase tracking-widest hover:bg-neon-teal hover:text-bg-deep transition-all duration-300 rounded-sm bg-bg-deep/50 backdrop-blur-sm"
            >
              Contact
            </button>
          </div>

          {/* Right Panel Tech Icons - Futuristic Floating Stack */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex items-center gap-4 md:gap-8 z-20">
            {/* Vertical Line */}
            <div className="w-[1px] h-80 bg-gradient-to-b from-transparent via-neon-teal/20 to-transparent hidden lg:block" />
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col gap-2 md:gap-3"
            >
              {[
                { label: 'React', color: '#61dafb' },
                { label: 'Node', color: '#68a063' },
                { label: 'Python', color: '#3776ab' },
                { label: 'AI', color: '#00f5d4' },
                { label: 'Cloud', color: '#4285f4' },
                { label: 'Git', color: '#f05032' }
              ].map((tech, i) => (
                <motion.div
                  key={tech.label}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    x: -10,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ backgroundColor: tech.color }}
                  />
                  
                  {/* Icon Button - Glassmorphism */}
                  <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group-hover:border-neon-teal/40 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                    {/* Inner Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40" />
                    
                    <span className="text-[6px] md:text-[7px] font-tech font-bold text-white/60 group-hover:text-neon-teal transition-colors tracking-tighter z-10">
                      {tech.label}
                    </span>

                    {/* Animated Border */}
                    <motion.div 
                      className="absolute inset-0 rounded-full border border-neon-teal/0 group-hover:border-neon-teal/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Label Tooltip */}
                  <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-bg-deep/80 backdrop-blur-md border border-neon-teal/20 rounded-sm text-[8px] text-neon-teal font-tech uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
                    {tech.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Center Vertical Line (Bottom) */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/20 to-transparent flex justify-center">
            <motion.div 
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[2px] h-4 bg-neon-teal rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
