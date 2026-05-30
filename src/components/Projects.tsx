import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'SynapseChat – AI Interaction Engine',
    date: '2026',
    description:
      'Built a real-time AI chat system using Socket.io and OpenAI API. Used LangChain for prompt workflows and created a responsive chat interface.',
    tech: ['Node.js', 'Express', 'Socket.io', 'OpenAI API', 'LangChain'],
  },

  {
    id: '02',
    title: 'Sentiment Analysis System',
    date: '2025',
    description:
      'Developed an NLP-based sentiment analysis model achieving ~75% accuracy using TF-IDF and tokenization. Optimized data pipelines for performance.',
    tech: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow'],
  },

  {
    id: '03',
    title: 'Expense Tracker Application',
    date: '2024',
    description:
      'Built a responsive expense tracker with real-time balance, income, and expense tracking using React and REST APIs.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    github: 'https://lnkd.in/gTwzF8xM',
  }
];


export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-24">
      <div className="container mx-auto">
        <div className="section-title-layered">
          <span className="bg">Projects</span>
          <h2 className="main">Projects</h2>
        </div>

        <div className="flex flex-col gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                scale: 1.02,
                rotateX: index % 2 === 0 ? 2 : -2,
                rotateY: index % 2 === 0 ? -2 : 2,
                z: 50
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="group relative grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8 p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:glow-border perspective-1000"
            >
              <div className="text-4xl font-mono font-black text-neon-teal/20 group-hover:text-neon-teal transition-colors duration-500">
                {project.id}
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="text-2xl font-bold text-text-primary group-hover:text-neon-teal transition-colors duration-500">
                    {project.title}
                  </h3>
                  <div className="flex gap-4 text-text-muted">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-neon-teal transition-colors interactive"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs font-mono tracking-widest text-neon-teal/60 uppercase">
                  {project.date}
                </p>

                <p className="text-text-secondary leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest border border-white/10 rounded-full text-text-muted group-hover:border-neon-teal/30 group-hover:text-text-primary transition-all duration-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
