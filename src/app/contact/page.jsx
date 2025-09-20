"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, ShieldCheck, Mail, Phone, Building } from 'lucide-react';
import { useTheme } from 'next-themes';
import emailjs from '@emailjs/browser';

const contactMethods = [
  {
    title: "Support & Inquiries",
    value: "support@shieldnet.ai",
    icon: <Mail className="h-7 w-7" />,
    href: "mailto:support@shieldnet.ai"
  },
  {
    title: "Sales Department",
    value: "+1 (555) 123-4567",
    icon: <Phone className="h-7 w-7" />,
    href: "tel:+15551234567"
  },
  {
    title: "Headquarters",
    value: "123 Tech Avenue, Silicon Valley, CA 94043",
    icon: <Building className="h-7 w-7" />,
    href: "https://maps.google.com/?q=123+Tech+Avenue,+Silicon+Valley,+CA+94043"
  }
];


const stats = [
    {
      value: "95.99%",
      label: "Fraud Detection Accuracy",
    },
    {
      value: "$10B+",
      label: "Transactions Secured Annually",
    },
    {
      value: "<150ms",
      label: "Average Response Time",
    }
];


const Contact = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px 0px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(serviceId, templateId, formData, publicKey);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delayChildren: 0.3, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.2, 0.6, 0.4, 1] },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative py-24 md:py-32 overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-slate-900 text-slate-50' : 'bg-gray-50 text-slate-900'
      }`}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at top left, ${
              theme === 'dark' ? 'rgba(22, 163, 74, 0.08)' : 'rgba(16, 185, 129, 0.08)'
            }, transparent 70%),
            radial-gradient(circle at bottom right, ${
              theme === 'dark' ? 'rgba(6, 182, 212, 0.08)' : 'rgba(8, 145, 178, 0.08)'
            }, transparent 70%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.p
            variants={itemVariants}
            className={`text-lg font-semibold uppercase tracking-widest ${
              theme === 'dark' ? 'text-emerald-400' : 'text-cyan-600'
            }`}
          >
            Connect With Our Experts
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-2 mb-4"
          >
            Secure Your <span className={theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'}>Inquiry</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`text-lg max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Whether you have questions about our AI-powered fraud detection, need a demo, or want to discuss a partnership, our team is ready to assist.
          </motion.p>
        </motion.div>
        
        
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center"
        >
            {stats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/60'}`}>
                    <p className={`text-4xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'}`}>{stat.value}</p>
                    <p className={`mt-2 text-sm font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
                </motion.div>
            ))}
        </motion.div>


        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-12"
          >
            <motion.div
              variants={itemVariants}
              className={`p-8 md:p-10 rounded-3xl border transition-all duration-500
                ${
                  theme === 'dark'
                    ? 'glass-dark border-slate-700 hover:border-emerald-400/40'
                    : 'glass-light border-slate-200 hover:border-cyan-500/40'
                } shadow-xl backdrop-blur-lg`}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center">
                <ShieldCheck className={`mr-3 h-8 w-8 ${theme === 'dark' ? 'text-emerald-400' : 'text-cyan-600'}`}/>
                Contact Information
              </h3>
              <div className="space-y-8">
                {contactMethods.map((method) => (
                  <motion.div
                    key={method.title}
                    variants={itemVariants}
                    className="flex items-start space-x-5"
                  >
                    <div className={`p-4 rounded-xl shrink-0
                      ${
                        theme === 'dark'
                          ? 'bg-slate-800 text-cyan-400'
                          : 'bg-white text-cyan-600'
                      }`}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {method.title}
                      </h4>
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-md ${
                          theme === 'dark'
                            ? 'text-slate-400 hover:text-cyan-400'
                            : 'text-slate-600 hover:text-cyan-600'
                        } transition-colors break-words`}
                      >
                        {method.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div
              variants={itemVariants}
              className={`relative p-8 md:p-12 rounded-3xl transition-all duration-500
                ${
                  theme === 'dark'
                    ? 'glass-dark border border-slate-700'
                    : 'glass-light border border-slate-200'
                } shadow-2xl`}
            >
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute top-6 right-6 z-20"
                  >
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border
                      ${
                        theme === 'dark'
                          ? 'bg-cyan-900/50 text-cyan-300 border-cyan-700'
                          : 'bg-cyan-100/80 text-cyan-700 border-cyan-300'
                      }`}
                    >
                      <Loader2 className="animate-spin h-5 w-5" />
                      <span className="font-semibold">Sending...</span>
                    </div>
                  </motion.div>
                )}
                {isSubmitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute top-6 right-6 z-20"
                  >
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border
                      ${
                        theme === 'dark'
                          ? 'bg-emerald-900/50 text-emerald-400 border-emerald-700'
                          : 'bg-emerald-100/80 text-emerald-700 border-emerald-300'
                      }`}
                    >
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Message Sent!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none
                        ${
                          theme === 'dark'
                            ? 'bg-slate-800/70 border border-slate-600 text-slate-50 placeholder-slate-500 focus:ring-cyan-400 focus:border-cyan-400'
                            : 'bg-white/70 border border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                        }`}
                      placeholder="e.g. Alex Johnson"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none
                        ${
                          theme === 'dark'
                            ? 'bg-slate-800/70 border border-slate-600 text-slate-50 placeholder-slate-500 focus:ring-cyan-400 focus:border-cyan-400'
                            : 'bg-white/70 border border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                        }`}
                      placeholder="e.g. alex.j@company.com"
                    />
                  </motion.div>
                </div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none
                      ${
                        theme === 'dark'
                          ? 'bg-slate-800/70 border border-slate-600 text-slate-50 placeholder-slate-500 focus:ring-cyan-400 focus:border-cyan-400'
                          : 'bg-white/70 border border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                      }`}
                    placeholder="e.g., Enterprise Plan Inquiry"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={5} required
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none resize-none
                      ${
                        theme === 'dark'
                          ? 'bg-slate-800/70 border border-slate-600 text-slate-50 placeholder-slate-500 focus:ring-cyan-400 focus:border-cyan-400'
                          : 'bg-white/70 border border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                      }`}
                    placeholder="Please describe your requirements or question here..."
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-lg tracking-wide transform-gpu transition-all duration-300 ease-out
                    ${
                      isSubmitting
                        ? 'opacity-70 cursor-wait'
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 hover:shadow-cyan-400/30'
                        : 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white hover:shadow-cyan-500/30'
                    }
                    ${!isSubmitting ? 'hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl' : ''}`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isSubmitting ? (
                      <motion.span key="sending" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="flex items-center">
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Processing...
                      </motion.span>
                    ) : (
                      <motion.span key="send" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="flex items-center">
                        <Send className="mr-3 h-5 w-5" />
                        Send Secure Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;