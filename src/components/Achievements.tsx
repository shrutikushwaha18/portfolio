import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const achievements = [
  {
    title: 'NATURAL LANGUAGE PROCESSING WITH PROBABILISTIC MODELS',
    date: 'APR 2024',
    platform: 'DeepLearning.AI',
  },
  {
    title: 'NATURAL LANGUAGE PROCESSING WITH SEQUENCE MODELS',
    date: 'APR 2024',
    platform: 'DeepLearning.AI',
  },
  {
    title: 'NATURAL LANGUAGE PROCESSING WITH CLASSIFICATION AND VECTOR SPACES',
    date: 'APR 2024',
    platform: 'DeepLearning.AI',
  },
];

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 px-6 md:px-24">
      <div className="container mx-auto">
        <div className="section-title-layered">
          <span className="bg">Achievements</span>
          <h2 className="main">Achievements</h2>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex items-center justify-between p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="p-3 rounded-lg bg-neon-teal/5 text-neon-teal group-hover:bg-neon-teal group-hover:text-bg-deep transition-all duration-300">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-text-primary group-hover:text-neon-teal transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] font-tech text-text-muted uppercase tracking-widest">{item.date}</span>
                    <span className="text-[10px] font-tech text-neon-teal uppercase tracking-widest">{item.platform}</span>
                  </div>
                </div>
              </div>
              <a href="#" className="text-text-muted hover:text-neon-teal transition-colors">
                <ExternalLink size={18} />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <button className="neon-button text-xs">
            View All Certifications
          </button>
        </div>
      </div>
    </section>
  );
};
