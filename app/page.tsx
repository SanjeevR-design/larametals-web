'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  ArrowRight, ShieldCheck, 
  Truck, Scale, ChevronDown, CheckCircle2,
  Mail, MapPin, Clock, Award, ExternalLink, Hexagon,
  Sun, Moon
} from 'lucide-react';

export default function HomePage() {
  // Set dark mode to true by default
  const [darkMode, setDarkMode] = useState(true);
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
    <div className={`min-h-screen font-sans transition-colors duration-300 selection:bg-blue-500/30 selection:text-blue-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Navigation */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-sm transition-colors duration-300 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 shadow-md group-hover:shadow-lg transition-all transform group-hover:-translate-y-0.5">
              <Hexagon className="text-white fill-white/20" size={24} />
            </div>
            <span className={`font-serif text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? 'from-blue-400 to-sky-300' : 'from-blue-800 to-sky-500'}`}>
              LaRa Metals
            </span>
          </a>

          <nav className={`hidden md:flex gap-8 font-medium text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <a href="#materials" className={`transition-colors duration-200 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>What We Buy</a>
            <a href="#about" className={`transition-colors duration-200 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>About Us</a>
            <a href="#contact" className={`transition-colors duration-200 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Contact</a>
            <a href="#faq" className={`transition-colors duration-200 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>FAQ</a>
            <a href="#quote" className={`transition-colors duration-200 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Get a Quote</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full transition-colors ${darkMode ? 'bg-slate-900 hover:bg-slate-800 text-blue-400' : 'bg-slate-100 hover:bg-slate-200 text-blue-600'}`}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="mailto:info@larametals.com"
              className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-full transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
            >
              <Mail size={16} />
              Email Desk
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative py-28 px-6 overflow-hidden ${darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-white to-slate-50'}`}>
        {/* Subtle background decoration */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 rounded-full blur-3xl -z-10 opacity-60 ${darkMode ? 'bg-blue-900/20' : 'bg-sky-100/50'}`}></div>
        
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-8 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <span className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full border shadow-sm ${darkMode ? 'bg-blue-900/30 text-blue-300 border-blue-800/50' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
              <ShieldCheck size={14} className={darkMode ? "text-blue-400" : "text-blue-600"} /> Premier Scrap Metal Aggregators & Recyclers
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className={`text-5xl sm:text-7xl font-black leading-tight tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Institutional Service for <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? 'from-blue-400 to-sky-300' : 'from-blue-600 to-sky-400'}`}>
              Industrial & Commercial Scrap
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
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
              className={`font-semibold text-base px-8 py-4 rounded-full border transition-all shadow-sm ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
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
          <motion.h2 variants={fadeUp} className={`text-3xl md:text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Accepted Commodities</motion.h2>
          <motion.p variants={fadeUp} className={`mt-3 max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>High-volume ferrous and non-ferrous material processing. Click any highlighted material to view industry examples.</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Non-Ferrous */}
          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className={`rounded-3xl overflow-hidden border shadow-md transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="relative h-56 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80" alt="Non-Ferrous Metals" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8">
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Non-Ferrous Metals</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <a href="https://www.google.com/search?q=bare+bright+copper+scrap&tbm=isch" target="_blank" rel="noopener noreferrer" className={`font-semibold underline underline-offset-4 inline-flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>Bare bright copper <ExternalLink size={12}/></a>,{' '}
                <a href="https://www.google.com/search?q=insulated+copper+wire+scrap&tbm=isch" target="_blank" rel="noopener noreferrer" className={`font-semibold underline underline-offset-4 inline-flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>insulated wire <ExternalLink size={12}/></a>,{' '}
                yellow/red brass,{' '}
                <a href="https://www.google.com/search?q=industrial+aluminum+extrusions+scrap&tbm=isch" target="_blank" rel="noopener noreferrer" className={`font-semibold underline underline-offset-4 inline-flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>industrial aluminum extrusions <ExternalLink size={12}/></a>, and stainless steel.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Ferrous */}
          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className={`rounded-3xl overflow-hidden border shadow-md transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="relative h-56 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80" alt="Ferrous Scrap" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8">
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Ferrous Scrap</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <a href="https://www.google.com/search?q=heavy+melting+steel+hms+1+and+2+scrap&tbm=isch" target="_blank" rel="noopener noreferrer" className={`font-semibold underline underline-offset-4 inline-flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>Heavy melting steel (HMS 1&2) <ExternalLink size={12}/></a>,{' '}
                <a href="https://www.google.com/search?q=structural+steel+beam+scrap&tbm=isch" target="_blank" rel="noopener noreferrer" className={`font-semibold underline underline-offset-4 inline-flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>structural beam offcuts <ExternalLink size={12}/></a>,{' '}
                rebar, plate & structural, and cast iron.
              </p>
            </div>
          </motion.div>

          {/* Card 3: E-Scrap */}
          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className={`rounded-3xl overflow-hidden border shadow-md transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="relative h-56 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" alt="Specialty & E-Scrap" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8">
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Specialty & E-Scrap</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <a href="https://www.google.com/search?q=electric+motor+scrap&tbm=isch" target="_blank" rel="noopener noreferrer" className={`font-semibold underline underline-offset-4 inline-flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>Electric motors <ExternalLink size={12}/></a>,{' '}
                <a href="https://www.google.com/search?q=copper+transformer+scrap&tbm=isch" target="_blank" rel="noopener noreferrer" className={`font-semibold underline underline-offset-4 inline-flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>transformers <ExternalLink size={12}/></a>,{' '}
                sealed units, high-temp alloys, carbide, and industrial electronics.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section 
        id="about" 
        className={`py-24 px-6 border-y scroll-mt-24 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center space-y-4 group">
            <div className={`p-4 rounded-2xl transition-colors duration-300 shadow-sm ${darkMode ? 'bg-blue-900/30 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
              <Scale size={32} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Certified Transparency</h3>
              <p className={`text-sm mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Calibrated digital scales with live readouts on every transaction ensuring absolute weight accuracy.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center text-center space-y-4 group">
            <div className={`p-4 rounded-2xl transition-colors duration-300 shadow-sm ${darkMode ? 'bg-sky-900/30 text-sky-400 group-hover:bg-sky-600 group-hover:text-white' : 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white'}`}>
              <Truck size={32} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Roll-Off Fleet Logistics</h3>
              <p className={`text-sm mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Dedicated industrial container drops for commercial facilities, manufacturing plants, and jobsite cleanup.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center text-center space-y-4 group">
            <div className={`p-4 rounded-2xl transition-colors duration-300 shadow-sm ${darkMode ? 'bg-emerald-900/30 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'}`}>
              <Award size={32} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Top Dollar Formula Rates</h3>
              <p className={`text-sm mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Fair, highly competitive payouts linked directly to major metal exchanges for maximum return.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quote & Contact Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24 grid md:grid-cols-2 gap-16" id="quote">
        
        {/* Left Side: Contact Info */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="space-y-8"
        >
          <div id="contact">
            <motion.h2 variants={fadeUp} className={`text-3xl md:text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Contact Our Trading Desk</motion.h2>
            <motion.p variants={fadeUp} className={`mt-3 text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Reach out directly for corporate inquiries, container scheduling, or direct trading rates.</motion.p>
          </div>

          <div className="space-y-6 pt-4">
            <motion.div variants={fadeUp} className={`flex items-start gap-4 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <MapPin size={28} className={`shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Corporate Address</h3>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>539 W. Commerce St. Suite 1358<br />Dallas, TX 75208</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className={`flex items-start gap-4 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <Mail size={28} className={`shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Email Inquiries</h3>
                <a href="mailto:info@larametals.com" className={`font-medium hover:underline mt-1 block ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>info@larametals.com</a>
                <p className="text-xs text-slate-500 mt-1">Responses within 1 business day.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className={`flex items-start gap-4 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <Clock size={28} className={`shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Operating Hours</h3>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Mon - Fri: 7:00 AM - 5:00 PM CST<br />Sat: 8:00 AM - 12:00 PM CST</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Quote Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800 shadow-lg' : 'bg-white border-slate-100 shadow-xl shadow-blue-900/5'}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-10 ${darkMode ? 'bg-blue-900/10' : 'bg-blue-50'}`}></div>
            
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Request a Custom Valuation</h2>
            <p className={`mb-8 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Submit material specifications for immediate pricing review.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name / Company Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white'}`}
                  required
                />
                <input
                  type="tel"
                  placeholder="Direct Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white'}`}
                  required
                />
              </div>

              <textarea
                rows={4}
                placeholder="Detail your scrap load (e.g., ~5,000 lbs insulated copper wire, industrial steel beams, jobsite location)..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm resize-none ${darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white'}`}
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
                  className={`p-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold ${darkMode ? 'bg-emerald-900/20 border-emerald-800/50 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}
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
          <h2 className={`text-3xl md:text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl border overflow-hidden transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-blue-200'}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className={`w-full p-6 text-left font-bold flex justify-between items-center ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-800'}`}
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className={`shrink-0 transition-transform duration-300 ${darkMode ? 'text-blue-400' : 'text-blue-500'} ${openFaq === idx ? 'rotate-180' : ''}`} size={20} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`px-6 leading-relaxed text-sm pb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                  >
                    <div className={`pt-2 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
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
      <footer className={`py-12 border-t text-xs ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className={`font-serif text-lg font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>LaRa Metals</div>
            <p className="mt-1">539 W. Commerce St. Suite 1358 • Dallas, TX 75208</p>
          </div>
          <p className="font-medium text-slate-500">© 2026 LaRa Metals, LLC. All rights reserved.</p>
          <div className={`flex gap-6 font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <a href="#materials" className={`transition-colors ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Materials</a>
            <a href="#contact" className={`transition-colors ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Contact</a>
            <a href="#quote" className={`transition-colors ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Quote Desk</a>
          </div>
        </div>
      </footer>
    </div>
  );
}