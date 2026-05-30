import React from 'react';
import { motion } from 'framer-motion';

const education = [
  {
    id: '01',
    university: 'Pranveer Singh Institute of Technology',
    degree: 'B.Tech -computer science and engineering(AI)',
    year: '2023-2027',
  },
  {
    id: '02',
    university: 'Mount Carmel Intermediate College',
    degree: 'Intermediate and High School',
    year: '2023 & 2021',
  },
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 md:px-24">
      <div className="container mx-auto">
        <div className="section-title-layered">
          <span className="bg">Education</span>
          <h2 className="main">Education</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:glow-border interactive"
            >
              <span className="text-3xl font-mono font-black text-neon-teal/20 group-hover:text-neon-teal transition-colors duration-500 mb-4 block">
                {edu.id}
              </span>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-neon-teal transition-colors duration-500">
                {edu.university}
              </h3>
              <p className="text-text-secondary font-mono text-sm uppercase tracking-widest mb-4">
                {edu.degree}
              </p>
              <span className="text-neon-teal/60 font-mono text-xs tracking-widest">
                {edu.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
