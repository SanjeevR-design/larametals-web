'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  Sun, Moon, ArrowRight, ShieldCheck, 
  Truck, Scale, ChevronDown, CheckCircle2,
  Mail, MapPin, Clock, Award
} from 'lucide-react';

export default function HomePage() {
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

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={darkMode ? 'bg-slate-950 text-slate-100 min-h-screen transition-colors duration-300' : 'bg-slate-50 text-slate-900 min-h-screen transition-colors duration-300'}>
      
      {/* Navigation */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-black tracking-wider text-amber-500 flex items-center gap-2">
            LaRa Metals<span className={darkMode ? 'text-white' : 'text-slate-900'}>, LLC</span>
          </a>

          <nav className="hidden md:flex gap-8 font-medium text-sm">
            <a href="#materials" className="hover:text-amber-500 transition-colors duration-200">What We Buy</a>
            <a href="#about" className="hover:text-amber-500 transition-colors duration-200">About Us</a>
            <a href="#contact" className="hover:text-amber-500 transition-colors duration-200">Contact</a>
            <a href="#faq" className="hover:text-amber-500 transition-colors duration-200">FAQ</a>
            <a href="#quote" className="hover:text-amber-500 transition-colors duration-200">Get a Quote</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="mailto:info@larametals.com"
              className="hidden sm:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition text-sm shadow-md"
            >
              <Mail size={16} />
              Email Desk
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-500/20">
              <ShieldCheck size={14} /> Premier Scrap Metal Aggregators & Recyclers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black leading-tight tracking-tight"
          >
            Institutional Service for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Industrial & Commercial Scrap
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
          >
            LaRa Metals, LLC bridges industrial scrap generators, trade contractors, and global foundries with transparent, formula-backed pricing, rapid logistics, and immediate settlement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <a
              href="#quote"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2"
            >
              Request Custom Estimate <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className={`font-semibold text-base px-8 py-4 rounded-xl border transition ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-300 hover:bg-slate-100'}`}
            >
              Contact Information
            </a>
          </motion.div>
        </div>
      </section>

      {/* Materials Section */}
      <motion.section 
        id="materials" 
        className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariant}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight">Accepted Commodities</h2>
          <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>High-volume ferrous and non-ferrous material processing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Non-Ferrous Metals',
              desc: 'Bare bright copper, insulated wire, yellow/red brass, industrial aluminum extrusions, stainless steel.',
              img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Ferrous Scrap',
              desc: 'Heavy melting steel (HMS 1&2), structural beam offcuts, rebar, plate & structural, cast iron.',
              img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Specialty & E-Scrap',
              desc: 'Electric motors, transformers, sealed units, high-temp alloys, carbide, and industrial electronics.',
              img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className={`rounded-2xl overflow-hidden border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section 
        id="about" 
        className={`py-20 px-6 border-y scroll-mt-24 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/70 border-slate-200'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariant}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <Scale size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Certified Weight Transparency</h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Calibrated digital scales with live readouts on every transaction.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <Truck size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Roll-Off Fleet Logistics</h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Dedicated industrial container drops for commercial and jobsite cleanup.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <Award size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Top Dollar Formula Rates</h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Fair, competitive payouts linked directly to major metal exchanges.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariant}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black tracking-tight">Contact Our Trading Desk</h2>
          <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Reach out directly for corporate inquiries, container scheduling, or direct trading rates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-500 mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold mb-1">Corporate Address</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              539 W. Commerce St. Suite 1358<br />
              Dallas, TX 75208
            </p>
          </div>

          <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-500 mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold mb-1">Email Inquiries</h3>
            <a href="mailto:info@larametals.com" className="text-amber-400 font-semibold text-sm hover:underline">
              info@larametals.com
            </a>
            <p className={`text-xs mt-2 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>Responses within 1 business day.</p>
          </div>

          <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-500 mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-bold mb-1">Operating Hours</h3>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Mon - Fri: 7:00 AM - 5:00 PM CST<br />
              Sat: 8:00 AM - 12:00 PM CST
            </p>
          </div>
        </div>
      </motion.section>

      {/* Quote Section */}
      <motion.section 
        id="quote" 
        className="py-16 px-6 max-w-4xl mx-auto scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariant}
      >
        <div className={`p-8 md:p-12 rounded-3xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-3xl font-black">Request a Custom Valuation</h2>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Submit material specifications for immediate pricing review.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name / Company Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-4 rounded-xl border text-sm transition focus:outline-amber-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300'}`}
                required
              />
              <input
                type="tel"
                placeholder="Direct Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full p-4 rounded-xl border text-sm transition focus:outline-amber-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300'}`}
                required
              />
            </div>

            <textarea
              rows={4}
              placeholder="Detail your scrap load (e.g., ~5,000 lbs insulated copper wire, industrial steel beams, jobsite location)..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full p-4 rounded-xl border text-sm transition focus:outline-amber-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300'}`}
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base py-4 rounded-xl transition shadow-lg disabled:opacity-50"
            >
              {loading ? 'Transmitting to Trading Desk...' : 'Submit Quote Request'}
            </button>
          </form>

          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <CheckCircle2 size={18} /> {statusMessage}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        id="faq" 
        className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800 scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariant}
      >
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-xl border overflow-hidden transition ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-semibold flex justify-between items-center"
              >
                {faq.q}
                <ChevronDown className={`transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} size={18} />
              </button>
              {openFaq === idx && (
                <div className={`p-5 pt-0 text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`py-12 border-t text-xs ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-bold text-amber-500 text-lg">LaRa Metals, LLC</div>
            <p className="mt-1">539 W. Commerce St. Suite 1358 • Dallas, TX 75208</p>
          </div>
          <p>© {new Date().getFullYear()} LaRa Metals, LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#materials" className="hover:underline">Materials</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <a href="#quote" className="hover:underline">Quote Desk</a>
            <a href="#faq" className="hover:underline">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}