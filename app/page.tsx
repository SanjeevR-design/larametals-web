'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  ArrowRight, ShieldCheck, Truck, Scale, ChevronDown, CheckCircle2,
  Mail, MapPin, Clock, Award, Hexagon, Sun, Moon, 
  ClipboardCheck, BadgeDollarSign, HardHat, Factory, Cpu, Plane, Leaf, Recycle, BarChart3
} from 'lucide-react';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', phone: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // New state to control the popup image modal
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    const { error } = await supabase.from('quote_requests').insert([
      { name: formData.name, phone: formData.phone, description: formData.description },
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

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
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
          
          {/* TWEAK 1: Upsized Logo & Text */}
          <a href="#" className="flex items-center gap-4 group">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 shadow-md group-hover:shadow-lg transition-all transform group-hover:-translate-y-0.5">
              <Hexagon className="text-white fill-white/20" size={30} />
            </div>
            <span className={`font-serif text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? 'from-blue-400 to-sky-300' : 'from-blue-800 to-sky-500'}`}>
              LaRa Metals
            </span>
          </a>

          <nav className={`hidden md:flex gap-8 font-medium text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <a href="#process" className={`transition-colors duration-200 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Process</a>
            <a href="#materials" className={`transition-colors duration-200 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Materials</a>
            <a href="#industries" className={`transition-colors duration-200 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Industries</a>
            <a href="#faq" className={`transition-colors duration-200 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full transition-colors ${darkMode ? 'bg-slate-900 hover:bg-slate-800 text-blue-400' : 'bg-slate-100 hover:bg-slate-200 text-blue-600'}`}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="#quote" className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-full transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
              <Mail size={16} /> Quote Desk
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative py-28 px-6 overflow-hidden ${darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-white to-slate-50'}`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 rounded-full blur-3xl -z-10 opacity-60 ${darkMode ? 'bg-blue-900/20' : 'bg-sky-100/50'}`}></div>
        <motion.div className="max-w-5xl mx-auto text-center space-y-8 relative z-10" variants={staggerContainer} initial="hidden" animate="visible">
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
            <a href="#quote" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2">
              Request Custom Estimate <ArrowRight size={18} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURE 1: How It Works Timeline */}
      <motion.section id="process" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <div className="text-center mb-16">
          <motion.h2 variants={fadeUp} className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Streamlined Processing</motion.h2>
          <motion.p variants={fadeUp} className={`mt-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Four steps from industrial scrap generation to immediate payout.</motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className={`hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 z-0 ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
          {[
            { icon: ClipboardCheck, title: '1. Request & Grade', desc: 'Submit specs. Our desk provides rapid pricing based on live exchange formulas.' },
            { icon: Truck, title: '2. Logistics & Dispatch', desc: 'We deploy roll-off containers to your site or schedule freight transport.' },
            { icon: Scale, title: '3. Certified Weigh-In', desc: 'Material is processed over our calibrated digital scales for absolute accuracy.' },
            { icon: BadgeDollarSign, title: '4. Immediate Settlement', desc: 'Instant payout via wire, check, or digital transfer—no waiting.' },
          ].map((step, idx) => (
            <motion.div key={idx} variants={fadeUp} className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-md border-4 ${darkMode ? 'bg-slate-900 border-slate-950 text-blue-400' : 'bg-white border-slate-50 text-blue-600'}`}>
                <step.icon size={36} />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Materials Section */}
      <motion.section id="materials" className={`py-24 px-6 border-y scroll-mt-24 ${darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-200'}`} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <div className="text-center mb-16 max-w-7xl mx-auto">
          <motion.h2 variants={fadeUp} className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Accepted Commodities</motion.h2>
          <motion.p variants={fadeUp} className={`mt-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Click any highlighted material to view industry examples.</motion.p>
        </div>

        {/* TWEAK 2: Button Triggers for Modal Images */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={fadeUp} whileHover={{ y: -8 }} className={`rounded-3xl overflow-hidden border shadow-md transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80" alt="Non-Ferrous Metals" className="w-full h-48 object-cover" />
            <div className="p-8">
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Non-Ferrous Metals</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <button type="button" onClick={() => setActiveImage('https://images.unsplash.com/photo-1622322883908-115f02bc5622?auto=format&fit=crop&w=1200&q=80')} className={`font-semibold underline underline-offset-4 decoration-2 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>Bare bright copper</button>,{' '}
                <button type="button" onClick={() => setActiveImage('https://images.unsplash.com/photo-1584985223011-820ceba4663e?auto=format&fit=crop&w=1200&q=80')} className={`font-semibold underline underline-offset-4 decoration-2 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>insulated wire</button>,{' '}
                yellow/red brass, and stainless steel.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -8 }} className={`rounded-3xl overflow-hidden border shadow-md transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80" alt="Ferrous Scrap" className="w-full h-48 object-cover" />
            <div className="p-8">
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Ferrous Scrap</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <button type="button" onClick={() => setActiveImage('https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80')} className={`font-semibold underline underline-offset-4 decoration-2 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>Heavy melting steel (HMS 1&2)</button>,{' '}
                <button type="button" onClick={() => setActiveImage('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80')} className={`font-semibold underline underline-offset-4 decoration-2 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>structural beam offcuts</button>,{' '}
                and cast iron.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -8 }} className={`rounded-3xl overflow-hidden border shadow-md transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" alt="E-Scrap" className="w-full h-48 object-cover" />
            <div className="p-8">
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Specialty & E-Scrap</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <button type="button" onClick={() => setActiveImage('https://images.unsplash.com/photo-1612803875545-a91599540b6e?auto=format&fit=crop&w=1200&q=80')} className={`font-semibold underline underline-offset-4 decoration-2 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>Electric motors</button>,{' '}
                <button type="button" onClick={() => setActiveImage('https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?auto=format&fit=crop&w=1200&q=80')} className={`font-semibold underline underline-offset-4 decoration-2 ${darkMode ? 'text-blue-400 hover:text-blue-300 decoration-blue-800' : 'text-blue-600 hover:text-blue-800 decoration-blue-200'}`}>transformers</button>,{' '}
                carbide, and industrial electronics.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURE 2: Industries Served */}
      <motion.section id="industries" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <div className="text-center mb-16">
          <motion.h2 variants={fadeUp} className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Industries We Serve</motion.h2>
          <motion.p variants={fadeUp} className={`mt-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Custom recycling programs tailored to high-volume commercial sectors.</motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: HardHat, title: 'Demolition & Construction', desc: 'Jobsite cleanup, structural steel recovery, and roll-off services.' },
            { icon: Factory, title: 'Manufacturing & Stamping', desc: 'Offcuts, turnings, and industrial production scrap management.' },
            { icon: Cpu, title: 'Telecom & Data Centers', desc: 'Secure processing for obsolete electronics, wiring, and servers.' },
            { icon: Plane, title: 'Aerospace & Automotive', desc: 'High-temp alloys, aluminum extrusions, and specialty metals.' },
          ].map((ind, idx) => (
            <motion.div key={idx} variants={fadeUp} className={`p-8 rounded-2xl border transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
              <ind.icon className={`mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={32} />
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{ind.title}</h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FEATURE 3: Sustainability & ESG Section */}
      <motion.section className={`py-20 px-6 border-y ${darkMode ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100'}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div variants={fadeUp} className="md:w-1/2 space-y-6">
            <span className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full border ${darkMode ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
              <Leaf size={14} /> ESG Compliant Recycling
            </span>
            <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>Building a Zero-Landfill Future.</h2>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Corporate sustainability is no longer optional. Partnering with LaRa Metals ensures your industrial scrap is repurposed efficiently, lowering carbon footprints and helping your firm hit its environmental, social, and governance (ESG) targets.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><Recycle className="text-emerald-500" size={20}/> <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>100% Repurposed</span></div>
              <div className="flex items-center gap-2"><BarChart3 className="text-emerald-500" size={20}/> <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Data-Driven Tracking</span></div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="md:w-1/2 w-full">
            <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80" alt="Scrap Processing" className="rounded-3xl shadow-xl border border-emerald-500/20 object-cover h-80 w-full grayscale-[20%]" />
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURE 4: Interactive Map & Contact */}
      <section className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24" id="contact">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8">
            <div>
              <motion.h2 variants={fadeUp} className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Facility & Operations</motion.h2>
              <motion.p variants={fadeUp} className={`mt-3 text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Dallas-based yard equipped for heavy industrial processing.</motion.p>
            </div>
            <motion.div variants={fadeUp} className={`rounded-3xl overflow-hidden border shadow-md h-64 w-full ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.3414902302324!2d-96.81577772346914!3d32.77526688537552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e991559c5dce5%3A0xc665dc3500c8bdf4!2s539%20W%20Commerce%20St%2C%20Dallas%2C%20TX%2075208!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus`} width="100%" height="100%" style={{ border: 0, filter: darkMode ? 'invert(90%) hue-rotate(180deg)' : 'none' }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
               <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <MapPin className={`mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={20}/>
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Location</h4>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>539 W. Commerce St.<br/>Dallas, TX 75208</p>
               </div>
               <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <Clock className={`mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={20}/>
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Hours (CST)</h4>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Mon-Fri: 7am - 5pm<br/>Sat: 8am - 12pm</p>
               </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} id="quote">
            <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800 shadow-lg' : 'bg-white border-slate-100 shadow-xl'}`}>
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-10 ${darkMode ? 'bg-blue-900/10' : 'bg-blue-50'}`}></div>
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Request a Custom Valuation</h2>
              <p className={`mb-8 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Submit specs for our trading desk.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" placeholder="Full Name / Company Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'}`} required />
                <input type="tel" placeholder="Direct Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'}`} required />
                <textarea rows={4} placeholder="Detail your scrap load..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm resize-none ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'}`} required ></textarea>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all">
                  {loading ? 'Transmitting...' : 'Submit Quote Request'}
                </button>
              </form>

              <AnimatePresence>
                {statusMessage && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 24 }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-xl bg-emerald-900/20 text-emerald-400 border border-emerald-800/50 flex items-center justify-center gap-2 text-sm font-semibold">
                    <CheckCircle2 size={18} /> {statusMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`rounded-2xl border overflow-hidden transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-blue-200'}`}>
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className={`w-full p-6 text-left font-bold flex justify-between items-center ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-800'}`}>
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className={`shrink-0 transition-transform duration-300 ${darkMode ? 'text-blue-400' : 'text-blue-500'} ${openFaq === idx ? 'rotate-180' : ''}`} size={20} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`px-6 leading-relaxed text-sm pb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className={`pt-2 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>{faq.a}</div>
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
          <p className="font-medium">© 2026 LaRa Metals, LLC. All rights reserved.</p>
        </div>
      </footer>

      {/* TWEAK 2: Image Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeImage}
              alt="Material Close-up"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevents the image itself from closing when clicked directly
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}