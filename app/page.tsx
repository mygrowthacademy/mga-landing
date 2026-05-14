'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const EmailCapture = ({ source, inline = false }: { source: 'sticky-bar' | 'inline-section', inline?: boolean }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/mqenvezd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message, source }),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail('');
        setMessage('');
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-2">
        <p className="text-sm font-medium text-green-400">
          Got it. Kanth or Shaku will reply within 24 hours.
        </p>
      </div>
    );
  }

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        />
        <textarea
          placeholder="What's your question?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none h-24"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Reach Out →'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
      />
      <textarea
        placeholder="What's your question?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none h-16"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm"
      >
        {loading ? 'Sending...' : 'Reach Out →'}
      </button>
    </form>
  );
};

// SVG Icons as components
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.521 17.05c-1.884.695-4.318 1.215-5.521 1.215-1.203 0-3.637-.52-5.521-1.215C5.231 16.322 4.5 15.5 4.5 14V10c0-1.5.731-2.322 1.479-3.05 1.884-.695 4.318-1.215 5.521-1.215 1.203 0 3.637.52 5.521 1.215.748.728 1.479 1.55 1.479 3.05v4c0 1.5-.731 2.322-1.479 3.05"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.949v5.418h-3.554s.05-8.746 0-9.637h3.554v1.364c.429-.658 1.196-1.593 2.905-1.593 2.121 0 3.71 1.385 3.71 4.362v5.504zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.771-1.715 1.921-1.715 1.147 0 1.918.762 1.918 1.715 0 .953-.771 1.715-1.924 1.715zm1.582 11.597H3.635V9.809h3.284v10.643zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.661 8.574c1.439 0 2.842-.606 3.877-1.688a5.568 5.568 0 001.623-3.877v-.087c0-1.439-.606-2.842-1.688-3.877A5.568 5.568 0 0019.661 0v3.087c.934 0 1.827.371 2.49 1.034s1.034 1.556 1.034 2.49-.371 1.827-1.034 2.49-1.556 1.034-2.49 1.034zm-3.877 12.362c1.439 0 2.842-.606 3.877-1.688 1.074-.996 1.688-2.345 1.688-3.877v-5.174a5.568 5.568 0 011.623 3.877c.087 2.877-2.292 5.262-5.169 5.262-1.092 0-2.099-.348-2.966-.953v3.065c.933.087 1.914.13 2.947.13zM5.173 6.84a3.282 3.282 0 100-6.564 3.282 3.282 0 000 6.564zm14.488-3.282a2.248 2.248 0 11-4.496 0 2.248 2.248 0 014.496 0zM5.173 24c1.044 0 2.025-.043 2.947-.13v-3.065a4.48 4.48 0 01-2.947.953c-2.877 0-5.256-2.385-5.169-5.262a5.568 5.568 0 011.623-3.877v5.174c0 1.532.614 2.881 1.688 3.877a5.097 5.097 0 003.858 1.33z"/>
  </svg>
);

export default function Home() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 15 && !stickyDismissed) {
        setShowStickyBar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stickyDismissed]);

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-orange-500">my</span>growth<span className="text-green-500">.</span>academy
          </div>
          <div className="flex gap-8 items-center">
            <Link href="#system" className="hover:text-orange-500 transition">The System</Link>
            <Link href="#results" className="hover:text-orange-500 transition">Results</Link>
            <Link href="#about" className="hover:text-orange-500 transition">About</Link>
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition-colors">
              Start Your Audit →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block border border-green-500 rounded-full px-4 py-2 mb-8">
            <span className="text-green-500 text-sm font-semibold">• MULTI-GROWTH ARCHITECTURE</span>
          </div>
          
          <h1 className="text-7xl font-black leading-tight mb-8">
            The Great
            <br />
            <span className="text-orange-500">Cancellation.</span>
          </h1>

          <p className="text-xl text-gray-300 mb-6">Your life is currently a zero-sum game.</p>
          
          <div className="space-y-4 text-lg text-gray-400 mb-12">
            <p>You work harder to earn more... but your health pays the tax.</p>
            <p>You build discipline in the gym... but your business loses focus.</p>
            <p>You learn new skills... but your bank account doesn't notice.</p>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
            Start Your Audit →
          </button>

          <p className="text-gray-500 text-sm mt-6">Free to start · 8 minutes · No credit card · Hard truths included</p>
        </div>
      </section>

      {/* For / Not For Section */}
      <section id="system" className="py-20 px-6 bg-gray-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-8 text-green-500">This works for you if:</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>You're earning $75k,300k and it feels hollow</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Your health, wealth, and direction are in conflict</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>You want to compound instead of cancel</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>You're ready to move from hustle culture to strategy</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8 text-orange-500">Not for you if:</h3>
            <ul className="space-y-4 text-lg text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">✗</span>
                <span>You want a quick fix or a shortcut</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">✗</span>
                <span>You're not ready to look at the hard truths about yourself</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">✗</span>
                <span>You think your problems are external (economy, luck, timing)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">✗</span>
                <span>You're content with your current trajectory</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Inline Email Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Not sure if this is for you?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Drop your email and question. Kanth or Shaku will personally reply within 24 hours, no automation, no assistant.
          </p>
          <div className="bg-gray-700 bg-opacity-30 p-8 rounded-xl backdrop-blur">
            <EmailCapture source="inline-section" inline={true} />
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Who's behind this</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-700 h-64 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-500">Kanth Photo</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Kanth</h3>
              <p className="text-gray-300">30+ years of mentorship and real-world building</p>
            </div>
            <div>
              <div className="bg-gray-700 h-64 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-500">Shaku Photo</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Shaku</h3>
              <p className="text-gray-300">Founder mindset, investor perspective, personal results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 px-6 bg-gray-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">What students report</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '300%', label: 'Average income increase in year 1' },
              { number: '8hrs/week', label: 'Freed up through systems thinking' },
              { number: '92%', label: 'Report clearer direction within 90 days' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6">
                <p className="text-5xl font-black text-orange-500 mb-2">{stat.number}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Works for you.</h2>
          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-bold text-lg transition-colors mb-6">
            Start Your Audit →
          </button>
          <p className="text-gray-500 text-sm">Free to start · 8 minutes · No credit card · Hard truths included</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-400">MyGrowth.Academy</h3>
          
          <div className="flex gap-6 items-center">
            <a href="https://www.facebook.com/mygrowth.academy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:opacity-80 transition">
              <FacebookIcon />
            </a>
            
            <a href="https://www.instagram.com/mygrowth.academy/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:opacity-80 transition">
              <InstagramIcon />
            </a>
            
            <a href="https://www.youtube.com/channel/UCftnOx2THDA2SlgzyWAVPuQ" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:opacity-80 transition">
              <YoutubeIcon />
            </a>
            
            <a href="https://www.linkedin.com/company/mygrowth-academy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:opacity-80 transition">
              <LinkedinIcon />
            </a>
            
            <a href="https://www.tiktok.com/@mygrowth.academy" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition">
              <TiktokIcon />
            </a>
            
            <a href="https://www.mygrowthacademy.coach/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-gray-600 hover:border-white transition text-sm font-medium">
              Website
            </a>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition-colors text-sm">
            Start Your Audit →
          </button>
        </div>
      </footer>

      {/* Sticky Bottom Bar */}
      {showStickyBar && !stickyDismissed && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white">Have a question before you start?</h4>
              <p className="text-gray-400 text-sm">Drop your email and question, Kanth or Shaku replies personally within 24 hours.</p>
            </div>
            <div className="flex gap-2 items-center flex-shrink-0">
              <div className="w-80">
                <EmailCapture source="sticky-bar" />
              </div>
              <button
                onClick={() => setStickyDismissed(true)}
                className="text-gray-400 hover:text-white transition p-2"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
