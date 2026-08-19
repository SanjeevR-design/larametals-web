'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, Phone, Calendar, LogOut, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Check for an active session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchQuotes();
      else setLoading(false);
    });

    // Listen for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchQuotes();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setAuthError(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setQuotes([]);
  };

  const fetchQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error(error);
    else setQuotes(data || []);
    
    setLoading(false);
  };

  if (loading && !session) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-blue-500"><Loader2 className="animate-spin" size={32}/></div>;
  }

  // SECURE LOGIN SCREEN
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-sm shadow-xl text-center">
          <div className="w-16 h-16 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">Secure Portal</h2>
          
          <input 
            type="email" 
            placeholder="Admin Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          
          {authError && <p className="text-red-400 text-sm mb-4">{authError}</p>}
          
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" size={20}/> : 'Authenticate'}
          </button>
        </form>
      </div>
    );
  }

  // SECURE DASHBOARD
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Quote Requests</h1>
            <p className="text-slate-500 mt-1">Live incoming leads from larametals.com</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors">
            <LogOut size={16}/> Secure Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500 font-medium flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" size={20}/> Decrypting database...
            </div>
          ) : quotes.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-medium">No quote requests found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
                    <th className="p-4 font-bold">Date Received</th>
                    <th className="p-4 font-bold">Contact Name</th>
                    <th className="p-4 font-bold">Phone Number</th>
                    <th className="p-4 font-bold">Material Description</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 text-sm text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-2"><Calendar size={14}/> {new Date(quote.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4 font-semibold text-slate-900">{quote.name}</td>
                      <td className="p-4 text-sm text-blue-600 font-medium">
                        <a href={`tel:${quote.phone}`} className="flex items-center gap-2 hover:underline"><Phone size={14}/> {quote.phone}</a>
                      </td>
                      <td className="p-4 text-sm text-slate-600 max-w-md">{quote.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}