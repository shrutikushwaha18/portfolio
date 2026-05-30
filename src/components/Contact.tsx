import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Contact error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-24">
      <div className="container mx-auto max-w-4xl">
        <div className="section-title-layered text-center">
          <span className="bg left-1/2 -translate-x-1/2">Contact</span>
          <h2 className="main">Contact</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            Want me on your project? I am looking for work in software engineering in tech, medical, or fintech fields, and would love to be an active team member in creative projects. Let's connect!
          </p>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-neon-teal/10 border border-neon-teal/30 p-8 rounded-2xl text-center flex flex-col items-center gap-4"
            >
              <CheckCircle2 size={48} className="text-neon-teal" />
              <h3 className="text-2xl font-bold text-text-primary">Message Sent!</h3>
              <p className="text-text-secondary">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-4 text-neon-teal hover:underline font-tech text-sm uppercase tracking-widest"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest ml-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="bg-white/[0.03] border-b border-white/10 px-4 py-3 text-text-primary focus:outline-none focus:border-neon-teal transition-colors duration-300 rounded-t-lg font-mono text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest ml-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-white/[0.03] border-b border-white/10 px-4 py-3 text-text-primary focus:outline-none focus:border-neon-teal transition-colors duration-300 rounded-t-lg font-mono text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message here..."
                  className="bg-white/[0.03] border-b border-white/10 px-4 py-3 text-text-primary focus:outline-none focus:border-neon-teal transition-colors duration-300 rounded-t-lg resize-none font-mono text-sm"
                />
              </div>
              
              {status === 'error' && (
                <div className="md:col-span-2 flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                  <AlertCircle size={18} />
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}

              <div className="md:col-span-2 flex justify-center mt-8">
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="neon-button flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  {status !== 'loading' && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
