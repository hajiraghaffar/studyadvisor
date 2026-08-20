import React, { useState } from 'react';
import { Mail, CheckCircle, Bell, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!agreed) {
      setError('Please agree to receive updates');
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase.from('newsletter_subscriptions').insert({
        email: email,
        subscribed: true,
      });

      if (dbError) {
        if (dbError.code === '23505') {
          setError('This email is already subscribed!');
        } else {
          throw dbError;
        }
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        setAgreed(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#e6f0fa]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-[#1E3A8F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bell className="w-7 h-7 text-[#1E3A8F]" />
          </div>
          <h2 className="text-[28px] font-bold text-[#1E3A8F] mb-2">Stay Updated with Admission Alerts</h2>
          <p className="text-[16px] text-gray-600 mb-8">
            Get deadlines, program updates, and counseling tips directly in your inbox.
          </p>

          {submitted ? (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#00C7B1]/30">
              <CheckCircle className="w-12 h-12 text-[#00C7B1] mx-auto mb-3" />
              <h3 className="text-[18px] font-bold text-[#1E3A8F] mb-1">You're Subscribed!</h3>
              <p className="text-[14px] text-gray-500">Thank you for subscribing. You'll receive admission alerts and updates.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 py-3.5 text-[16px] border-2 rounded-lg focus:outline-none transition-colors ${
                      error ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#00C7B1]'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-[#00C7B1] text-white text-[15px] font-semibold rounded-lg hover:bg-[#00b5a1] transition-all shadow-md hover:shadow-lg active:scale-[0.98] shrink-0 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>

              {error && (
                <p className="text-[13px] text-red-500 text-left">{error}</p>
              )}

              <label className="flex items-start gap-2 cursor-pointer justify-center">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => { setAgreed(e.target.checked); setError(''); }}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#00C7B1] focus:ring-[#00C7B1] accent-[#00C7B1]"
                />
                <span className="text-[13px] text-gray-500">
                  I agree to receive updates and accept the{' '}
                  <button type="button" className="text-[#1E3A8F] hover:underline font-medium">privacy policy</button>
                </span>
              </label>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
