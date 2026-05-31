import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-24">
      <div className="container mx-auto max-w-4xl text-center">

        {/* Title */}
        <div className="section-title-layered">
          <span className="bg left-1/2 -translate-x-1/2">Contact</span>
          <h2 className="main">Get In Touch</h2>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-8"
        >
          <p className="text-text-secondary max-w-xl">
            Feel free to connect with me on LinkedIn or message me directly on WhatsApp.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 flex-wrap justify-center">

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/shrutikush06/"
              target="_blank"
              className="neon-button flex items-center gap-2"
            >
              <Linkedin size={18} /> LinkedIn
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/916393108661"
              target="_blank"
              className="neon-button flex items-center gap-2"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>

          </div>
        </motion.div>
      </div>
    </section>
  );
};