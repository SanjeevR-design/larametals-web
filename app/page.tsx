'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  ArrowRight, ShieldCheck, 
  Truck, Scale, ChevronDown, CheckCircle2,
  Mail, MapPin, Clock, Award, ExternalLink, Hexagon
} from 'lucide-react';

export default function HomePage() {
  const [formData, setFormData] = useState({ name: '', phone: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    const { error } = await supabase.from('quote_requests').insert([
      {
        name: formData.name,
        phone: formData.phone,
        description: formData.description,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setStatusMessage('Error submitting request. Please try again.');
    } else {
      setStatusMessage('Quote request submitted successfully! Our trading desk will reach out shortly.');
      setFormData({ name: '', phone: '', description: '' });
    }
  };

  const faqs = [
    { q: 'How do you determine current scrap metal prices?', a: 'Our prices track live commodity benchmark formulas (LME/COMEX) updated daily to ensure seller transparency and competitive market rates.' },
    { q: 'Do you offer commercial or industrial roll-off containers?', a: 'Yes. We provide custom container placement and pickup logistics for manufacturing sites, demolition jobs, and contractor yards.' },
    { q: 'How fast do I get paid upon delivery or pickup?', a: 'We offer instant payouts via check, digital transfer, or cash voucher immediately following certified scale weights.' },
  ];

  // Reusable animation variants with TypeScript types
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* OPTION 1 LOGO: Forged Hexagon */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 shadow-md group-hover:shadow-lg transition-all transform group-hover:-translate-y-0.5">
              <Hexagon className="text-white fill-white/20" size={24} />
            </div>
            <span className="font-serif text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-sky-500">
              LaRa Metals
            </span>
          </a>

          <nav className="hidden md:flex gap-8 font-medium text-sm text-slate-600">
            <a href="#materials" className="hover:text-blue-600 transition-colors duration-200">What We Buy</a>
            <a href="#about" className="hover:text-blue-600 transition-colors duration-200">About Us</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors duration-200">Contact</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors duration-200">FAQ</a>
            <a href="#quote" className="hover:text-blue-600 transition-colors duration-200">Get a Quote</a>
          </nav>

          <a
            href="mailto:info@larametals.com"
            className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-full transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
          >
            <Mail size={16} />
            Email Desk
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-28 px-6 overflow-hidden bg-gradient-to-b from-white to-slate-50">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-sky-100/50 rounded-full blur-3xl -z-10 opacity-60"></div>
        
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-8 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-4 py-2 rounded-full border border-blue-200 shadow-sm">
              <ShieldCheck size={14} className="text-blue-600" /> Premier Scrap Metal Aggregators & Recyclers
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-black leading-tight tracking-tight text-slate-900">
            Institutional Service for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
              Industrial & Commercial Scrap
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            LaRa Metals bridges industrial scrap generators, trade contractors, and global foundries with transparent, formula-backed pricing, rapid logistics, and immediate settlement.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center pt-6">
            <a
              href="#quote"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
            >
              Request Custom Estimate <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="font-semibold text-slate-700 text-base px-8 py-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              Contact Information
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Materials Section */}
      <motion.section 
        id="materials" 
        className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="text-center mb-16">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Accepted Commodities</motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-slate-600 max-w-2xl mx-auto">High-volume ferrous and non-ferrous material processing. Click any highlighted material to view industry examples.</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Non-Ferrous */}
          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md transition-all duration-300">
            <div className="relative h-56 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80" alt="Non-Ferrous Metals" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-3 text-slate-900">Non-Ferrous Metals</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                <a href="https://images.unsplash.com/photo-1622322883908-115f02bc5622?auto=format&fit=crop&w=800&q=80" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-4 inline-flex items-center gap-1">Bare bright copper <ExternalLink size={12}/></a>,{' '}
                <a href="https://images.unsplash.com/photo-1584985223011-820ceba4663e?auto=format&fit=crop&w=800&q=80" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-4 inline-flex items-center gap-1">insulated wire <ExternalLink size={12}/></a>,{' '}
                yellow/red brass,{' '}
                <a href="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-4 inline-flex items-center gap-1">industrial aluminum extrusions <ExternalLink size={12}/></a>, and stainless steel.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Ferrous */}
          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md transition-all duration-300">
            <div className="relative h-56 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80" alt="Ferrous Scrap" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-3 text-slate-900">Ferrous Scrap</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                <a href="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-4 inline-flex items-center gap-1">Heavy melting steel (HMS 1&2) <ExternalLink size={12}/></a>,{' '}
                <a href="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-4 inline-flex items-center gap-1">structural beam offcuts <ExternalLink size={12}/></a>,{' '}
                rebar, plate & structural, and cast iron.
              </p>
            </div>
          </motion.div>

          {/* Card 3: E-Scrap */}
          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md transition-all duration-300">
            <div className="relative h-56 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" alt="Specialty & E-Scrap" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-3 text-slate-900">Specialty & E-Scrap</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                <a href="https://images.unsplash.com/photo-1612803875545-a91599540b6e?auto=format&fit=crop&w=800&q=80" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-4 inline-flex items-center gap-1">Electric motors <ExternalLink size={12}/></a>,{' '}
                <a href="https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?auto=format&fit=crop&w=800&q=80" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-4 inline-flex items-center gap-1">transformers <ExternalLink size={12}/></a>,{' '}
                sealed units, high-temp alloys, carbide, and industrial electronics.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section 
        id="about" 
        className="py-24 px-6 bg-white border-y border-slate-100 scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Scale size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Certified Transparency</h3>
              <p className="text-sm mt-2 text-slate-600 leading-relaxed">Calibrated digital scales with live readouts on every transaction ensuring absolute weight accuracy.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-4 rounded-2xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Truck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Roll-Off Fleet Logistics</h3>
              <p className="text-sm mt-2 text-slate-600 leading-relaxed">Dedicated industrial container drops for commercial facilities, manufacturing plants, and jobsite cleanup.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Award size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Top Dollar Formula Rates</h3>
              <p className="text-sm mt-2 text-slate-600 leading-relaxed">Fair, highly competitive payouts linked directly to major metal exchanges for maximum return.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quote & Contact Section (Combined for better flow) */}
      <section className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24 grid md:grid-cols-2 gap-16" id="quote">
        
        {/* Left Side: Contact Info */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="space-y-8"
        >
          <div id="contact">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Contact Our Trading Desk</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-slate-600 text-lg">Reach out directly for corporate inquiries, container scheduling, or direct trading rates.</motion.p>
          </div>

          <div className="space-y-6 pt-4">
            <motion.div variants={fadeUp} className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <MapPin size={28} className="text-blue-600 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Corporate Address</h3>
                <p className="text-slate-600 mt-1">539 W. Commerce St. Suite 1358<br />Dallas, TX 75208</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <Mail size={28} className="text-blue-600 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Email Inquiries</h3>
                <a href="mailto:info@larametals.com" className="text-blue-600 font-medium hover:underline mt-1 block">info@larametals.com</a>
                <p className="text-xs text-slate-400 mt-1">Responses within 1 business day.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <Clock size={28} className="text-blue-600 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Operating Hours</h3>
                <p className="text-slate-600 mt-1">Mon - Fri: 7:00 AM - 5:00 PM CST<br />Sat: 8:00 AM - 12:00 PM CST</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Quote Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-10 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-blue-900/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Request a Custom Valuation</h2>
            <p className="text-slate-500 mb-8 text-sm">Submit material specifications for immediate pricing review.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name / Company Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                  required
                />
                <input
                  type="tel"
                  placeholder="Direct Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                  required
                />
              </div>

              <textarea
                rows={4}
                placeholder="Detail your scrap load (e.g., ~5,000 lbs insulated copper wire, industrial steel beams, jobsite location)..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm resize-none"
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                {loading ? 'Transmitting to Trading Desk...' : 'Submit Quote Request'}
              </button>
            </form>

            <AnimatePresence>
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <CheckCircle2 size={18} className="shrink-0" /> {statusMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-blue-200 transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left font-bold text-slate-800 flex justify-between items-center bg-white"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className={`shrink-0 text-blue-500 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} size={20} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 text-slate-600 leading-relaxed text-sm pb-6"
                  >
                    <div className="pt-2 border-t border-slate-100">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="font-serif text-lg font-bold text-slate-800">LaRa Metals</div>
            <p className="mt-1">539 W. Commerce St. Suite 1358 • Dallas, TX 75208</p>
          </div>
          <p className="font-medium text-slate-400">© 2026 LaRa Metals, LLC. All rights reserved.</p>
          <div className="flex gap-6 font-medium text-slate-600">
            <a href="#materials" className="hover:text-blue-600 transition-colors">Materials</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            <a href="#quote" className="hover:text-blue-600 transition-colors">Quote Desk</a>
          </div>
        </div>
      </footer>
    </div>
  );
}