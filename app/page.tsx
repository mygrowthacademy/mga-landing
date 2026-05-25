'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const TYPEFORM_URL = 'https://8hm5qhmx5pp.typeform.com/to/S6qSbgTP';

// Defer the founders section to load after hero renders
const FoundersSection = dynamic(() => Promise.resolve(FoundersSectionComponent), {
  ssr: false,
  loading: () => null
});

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(e.target); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>
      {children}
    </div>
  );
}

function EmailCapture({ dark = false, source = 'inline-section', inline = false }: { dark?: boolean; source?: string; inline?: boolean }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !message.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mqenvezd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message, source })
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setMessage('');
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Something went wrong. Try again.');
      }
    } catch {
      setError('Network error. Try again.');
    }
  };

  if (submitted) {
    return <div className={`text-center ${dark ? 'text-blue-200' : 'text-gray-600'} font-black`}>Got it. Kanth or Shaku will reply within 24 hours.</div>;
  }

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 font-black text-sm focus:outline-none focus:border-white/40" />
        <input type="text" placeholder="Your question" value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 font-black text-sm focus:outline-none focus:border-white/40" />
        <button type="submit" className="px-6 py-3 bg-[#00C9A2] hover:bg-[#00A380] text-[#272F4F] font-black rounded-lg transition-colors whitespace-nowrap">Send</button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${inline ? 'md:flex-row' : ''}`}>
      <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`px-4 py-3 rounded-xl border ${dark ? 'bg-white/10 border-white/20 text-white placeholder-white/50' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'} font-black focus:outline-none`} />
      <input type="text" placeholder="Your question" value={message} onChange={(e) => setMessage(e.target.value)} className={`px-4 py-3 rounded-xl border ${dark ? 'bg-white/10 border-white/20 text-white placeholder-white/50' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'} font-black focus:outline-none`} />
      <button type="submit" className={`px-6 py-3 font-black rounded-xl transition-colors whitespace-nowrap ${dark ? 'bg-[#00C9A2] hover:bg-[#00A380] text-[#272F4F]' : 'bg-[#272F4F] hover:bg-[#1a1f2e] text-white'}`}>Send</button>
      {error && <p className="text-red-400 text-sm font-black">{error}</p>}
    </form>
  );
}

function FoundersSectionComponent() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} id="founders" className="py-28 bg-[#272F4F]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#C84739]/20 to-[#36488F]/20 rounded-3xl blur-2xl" />
              <Image src="/founders.png" alt="Kanth and Shaku" width={600} height={750} className="relative rounded-3xl w-full object-cover shadow-2xl" style={{ maxHeight: '550px', objectPosition: 'top' }} loading="lazy" quality={75} />
            </div>
            <div className="order-1 md:order-2">
              <div className="text-xs font-black tracking-[0.2em] text-[#00C9A2] mb-4">OUR STORY</div>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">We didn't build MGA from a theory.</h2>
              <p className="text-blue-200/70 text-xl leading-relaxed mb-5">Kanth and Shaku have spent over 30 years building the exact things MGA teaches. Not as consultants. As practitioners. Their health, their income, their community — built through the same system.</p>
              <p className="text-blue-200/70 text-xl leading-relaxed mb-8">They've watched people come in skeptical and leave transformed. Not because of a program. Because of a relationship with people who actually care.</p>
              <blockquote className="border-l-4 border-[#00C9A2] pl-6"><p className="text-white text-2xl font-black italic leading-snug">"We've never gotten tired of watching that happen. We never will."</p></blockquote>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupFired, setPopupFired] = useState(false);
  const popupTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (popupFired) return;

    const handleMouseLeave = () => {
      if (!popupFired) {
        setPopupOpen(true);
        setPopupFired(true);
      }
    };

    const handleScroll = () => {
      if (popupFired) return;
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 40 && scrollPercent <= 60) {
        setPopupOpen(true);
        setPopupFired(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    popupTimeoutRef.current = setTimeout(() => {
      if (!popupFired) {
        setPopupOpen(true);
        setPopupFired(true);
      }
    }, 22000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    };
  }, [popupFired]);

  return (
    <main className="bg-white">
      {popupOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative">
            <button onClick={() => setPopupOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">×</button>
            <div className="text-center mb-6">
              <div className="text-sm font-black tracking-[0.2em] text-[#36488F] mb-3">QUICK QUESTION?</div>
              <h3 className="text-2xl font-black text-[#272F4F] mb-3">Not sure if MGA is right for you?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Drop your email and a quick question. Kanth or Shaku will reply within 24 hours.</p>
            </div>
            <EmailCapture source="popup" />
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-[#272F4F] text-white p-4 z-30 transform transition-transform duration-500" style={{ transform: 'translateY(0)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-black">Have a question before you start?</p>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input type="email" id="bottomEmail" placeholder="your@email.com" className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm font-black focus:outline-none" />
            <button onClick={() => {
              const email = (document.getElementById('bottomEmail') as HTMLInputElement)?.value;
              if (email) {
                fetch('https://formspree.io/f/mqenvezd', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, message: 'From sticky bar', source: 'sticky-bar' })
                }).then(() => {
                  alert('Got it. Kanth or Shaku will reply within 24 hours.');
                  (document.getElementById('bottomEmail') as HTMLInputElement).value = '';
                });
              }
            }} className="px-4 py-2 bg-[#00C9A2] hover:bg-[#00A380] text-[#272F4F] font-black rounded-lg transition-colors whitespace-nowrap text-sm">Send</button>
          </div>
          <button onClick={() => (document.querySelector('.fixed.bottom-0') as HTMLElement)?.style.setProperty('transform', 'translateY(100%)')} className="text-white/50 hover:text-white ml-2">×</button>
        </div>
      </div>

      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Image src="/logo-full.png" alt="MyGrowth Academy" width={180} height={48} className="object-contain" style={{ height: '66px', width: 'auto' }} priority quality={80} />
          <button onClick={() => {}} className="text-gray-600 hover:text-gray-900 text-2xl">☰</button>
        </div>
      </header>

      <section className="relative max-w-5xl mx-auto px-6 py-6 md:py-28 text-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#36488F]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C84739]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-[#6BCEFF] to-[#00C9A2] rounded-full">
            <p className="text-xs font-bold tracking-widest text-[#212C35] uppercase">Multi-growth architecture</p>
          </div>

          <h1 className="text-4xl md:text-8xl font-black text-[#272F4F] leading-[1.0] mb-6 tracking-tight">
            The Great <span className="text-[#C84739]">Cancellation.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">Your life is currently a zero-sum game.</p>

          <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
            <p>You work harder to earn more... but your health pays the tax.</p>
            <p>You build discipline in the gym... but your business loses focus.</p>
            <p>You learn new skills... but your bank account doesn't notice.</p>
          </div>

          <p className="text-2xl md:text-3xl font-black italic text-[#272F4F] leading-snug mb-12">
            You aren't growing. You're just vibrating in place.
          </p>

          <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#C84739] hover:bg-[#A63A2F] text-white font-black text-2xl md:text-3xl px-10 md:px-16 py-5 md:py-7 rounded-3xl transition-all duration-200 shadow-2xl shadow-red-200 hover:shadow-red-300 hover:scale-105">
            Run Your 8-Minute System Audit →
          </a>

          <p className="text-gray-400 text-sm md:text-base mt-6 font-black">Free · Results are instant · Hard truths included</p>
        </div>
      </section>

      <section className="py-28 bg-[#272F4F]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center">
              <div className="text-xs font-black tracking-[0.2em] text-[#00C9A2] mb-4">REAL PEOPLE</div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">We've watched this pattern repeat<br />for over 30 years.</h2>
              <p className="text-blue-200/70 text-lg md:text-xl leading-relaxed">People come in skeptical. They leave different. Not because of hype. Because of a system that actually works.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-28 bg-white"><div className="max-w-6xl mx-auto px-6"><FadeIn><div className="text-center mb-16"><div className="text-sm font-black tracking-[0.2em] text-[#36488F] mb-5">THE TRANSFORMATION</div><h2 className="text-5xl md:text-6xl font-black text-[#272F4F] leading-tight">From Effort to Momentum</h2><p className="text-gray-400 mt-5 text-xl">In 90 days, the feeling of work changes.</p></div></FadeIn><div className="grid md:grid-cols-3 gap-6 mb-16">{[{ title: 'The Fog Clears', desc: 'You stop asking "What should I do?" and start executing the obvious.', num: '01' }, { title: 'The Floor Rises', desc: 'Your bad days become more productive than your old good days.', num: '02' }, { title: 'The Baseline Stacks', desc: 'Your income and health finally start trending in the same direction.', num: '03' }].map((item, i) => (<FadeIn key={item.title} delay={i * 100}><div className="bg-[#F4F5F8] rounded-2xl p-10 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 h-full"><div className="text-sm font-black text-[#C84739] tracking-widest mb-5">{item.num}</div><h3 className="font-black text-[#272F4F] text-3xl mb-5">{item.title}</h3><p className="text-gray-500 text-xl leading-relaxed">{item.desc}</p></div></FadeIn>))}</div><FadeIn><div className="text-center"><p className="text-3xl md:text-4xl font-black italic text-[#272F4F]">Stop hunting for breakthroughs.<br />Start trusting the output.</p></div></FadeIn></div></section>

      <section id="results" className="py-28 bg-[#272F4F]"><div className="max-w-6xl mx-auto px-6"><FadeIn><div className="text-center mb-16"><div className="text-xs font-black tracking-[0.2em] text-[#00C9A2] mb-4">THE MATH</div><h2 className="text-5xl md:text-6xl font-black text-white">Real People. Real Numbers.</h2><p className="text-blue-200/50 mt-4 text-lg">We don't use stock photos and invented quotes.</p></div></FadeIn><div className="grid md:grid-cols-2 gap-5">{[{ ini: 'J', color: '#C84739', name: 'James', stats: ['$53K → $130K', '$65K → $160K investments'], quote: 'Output increased. Hours decreased. I set up one automatic transfer the day my paycheck hit — before I could touch it. But it was the habits around it that changed me.' }, { ini: 'V', color: '#36488F', name: 'Victor', stats: ['Income tripled', 'Six-figure savings', 'Energy at 40 > 25'], quote: 'Started as a machine operator. No degree. Zero savings. Wasn\'t looking for inspiration. Was looking for a system. Same city. Different foundation.' }, { ini: 'Ja', color: '#00A380', name: 'Jason', stats: ['Six-figure debt gone', 'Income +39%', 'Six-figure savings'], quote: 'I started showing up differently in every area — not just financially. Four years after getting a real system: no debt. Income up 39%.' }, { ini: 'G', color: '#8B6914', name: 'George', stats: ['300% asset growth', '3 years'], quote: 'Grew up hearing money doesn\'t grow on trees. Three years later: There\'s a spring in our shoes now. I walk differently at work.' }].map((s, i) => (<FadeIn key={s.name} delay={i * 80}><div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors h-full"><div className="flex items-start gap-4 mb-5"><div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-sm flex-shrink-0" style={{ background: s.color }}>{s.ini}</div><div><div className="text-white font-black text-lg mb-2">{s.name}</div><div className="flex flex-wrap gap-2">{s.stats.map((st) => (<span key={st} className="text-sm font-bold px-3 py-1 rounded-full bg-white/10 text-blue-200">{st}</span>))}</div></div></div><p className="text-blue-200/60 text-base leading-relaxed italic">"{s.quote}"</p></div></FadeIn>))}</div><FadeIn><div className="mt-8 bg-[#C84739]/10 border border-[#C84739]/20 rounded-2xl px-8 py-5 text-center"><p className="text-white font-black text-lg">These people didn't start ahead of you. Every one of them began with a clear, honest look.</p></div></FadeIn></div></section>

      <section className="py-28 bg-white"><div className="max-w-6xl mx-auto px-6"><FadeIn><div className="text-center mb-14"><div className="text-sm font-black tracking-[0.2em] text-[#36488F] mb-5">FIT CHECK</div><h2 className="text-5xl md:text-6xl font-black text-[#272F4F]">Be honest with yourself.</h2></div><div className="grid md:grid-cols-2 gap-8"><div className="bg-white border-2 border-[#00C9A2]/30 rounded-2xl p-10 hover:border-[#00C9A2]/60 transition-colors"><div className="text-sm font-black tracking-widest text-[#00A380] mb-8">THIS IS FOR YOU IF</div><div className="space-y-6">{['You are already successful but feel remarkably fragile.', 'You hate hacks and want a permanent operating system.', 'You are ready to kill good opportunities to hunt great ones.'].map((item) => (<div key={item} className="flex items-start gap-4"><div className="w-6 h-6 rounded-full bg-[#00C9A2] flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-sm font-black">✓</div><p className="text-gray-700 text-xl leading-relaxed">{item}</p></div>))}</div></div><div className="bg-[#F4F5F8] rounded-2xl p-10 border border-gray-200"><div className="text-sm font-black tracking-widest text-gray-400 mb-8">DO NOT JOIN IF</div><div className="space-y-6">{['You are a content junkie who never builds.', 'You prioritize looking busy over being effective.', 'You think more effort is the solution to a broken system.'].map((item) => (<div key={item} className="flex items-start gap-4"><div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-sm font-black">✕</div><p className="text-gray-400 text-xl leading-relaxed">{item}</p></div>))}</div></div></div></FadeIn></div></section>

      <section className="py-20 bg-[#272F4F] relative overflow-hidden"><div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 right-0 w-96 h-96 bg-[#36488F]/20 rounded-full blur-3xl" /><div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C84739]/10 rounded-full blur-3xl" /></div><div className="relative max-w-5xl mx-auto px-6 text-center"><FadeIn><div className="text-xs font-black tracking-[0.2em] text-[#00C9A2] mb-3">GOT A QUESTION?</div><h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">Not sure if this is for you?</h2><p className="text-blue-200/60 text-base md:text-lg mb-6 leading-relaxed">Drop your email and question. Kanth or Shaku will personally reply within 24 hours — no automation, no assistant.</p><div className="flex justify-center mb-4"><EmailCapture dark source="inline-section" inline={true} /></div><p className="text-blue-300/30 text-xs">No spam. No list. Just a real reply from a real person.</p></FadeIn></div></section>

      <FoundersSection />

      <section className="py-28 bg-white"><div className="max-w-6xl mx-auto px-6"><FadeIn><div className="text-center mb-16"><div className="text-xs font-black tracking-[0.2em] text-[#36488F] mb-4">THE PROTOCOL</div><h2 className="text-5xl md:text-6xl font-black text-[#272F4F] leading-tight">Start with clarity. Then decide.</h2></div><div className="grid md:grid-cols-3 gap-8 mb-12 relative"><div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-[#36488F] via-[#7B66BC] to-[#C84739]" />{[{ num: '1', title: 'The Audit', desc: '8 minutes to find the leak.', color: '#36488F', tag: 'Free' }, { num: '2', title: 'The Blueprint', desc: 'A customized map of your misalignments.', color: '#36488F', tag: 'Free' }, { num: '3', title: 'The 10-Day Installation', desc: 'We build the system together. $99 — fully refunded if you do the work.', color: '#C84739', tag: '$99 refundable' }].map((step, i) => (<FadeIn key={step.num} delay={i * 100}><div className="text-center"><div className="w-20 h-20 rounded-full flex items-center justify-center font-black text-white text-3xl mx-auto mb-6 shadow-xl relative z-10" style={{ background: step.color }}>{step.num}</div><h3 className="font-black text-[#272F4F] text-2xl mb-3">{step.title}</h3><p className="text-gray-500 text-base leading-relaxed mb-3">{step.desc}</p><span className="inline-block text-xs font-black px-3 py-1 rounded-full" style={{ background: i < 2 ? '#E8F5EE' : '#FAEAE8', color: i < 2 ? '#00A380' : '#C84739' }}>{step.tag}</span></div></FadeIn>))}</div><div className="bg-[#EEF1FA] rounded-2xl px-8 py-6 text-center mb-12"><p className="text-[#272F4F] font-black text-xl">If you finish the 10 days and don't see the signal, <span className="text-[#C84739]">you don't pay.</span></p><p className="text-gray-500 text-base mt-2">We don't want satisfied customers. We want compounding assets.</p></div><div className="text-center"><a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#C84739] hover:bg-[#A63A2F] text-white font-black text-xl px-12 py-6 rounded-2xl transition-all duration-200 shadow-2xl shadow-red-100 hover:shadow-red-200 hover:scale-105">Start Your Audit →</a><p className="text-gray-400 text-sm mt-4">Free to start · 8 minutes · No credit card</p></div></FadeIn></div></section>

      <section className="py-24 bg-[#F4F5F8]"><div className="max-w-3xl mx-auto px-6"><FadeIn><div className="text-center mb-14"><div className="text-sm font-black tracking-[0.2em] text-[#36488F] mb-5">FAQ</div><h2 className="text-5xl md:text-6xl font-black text-[#272F4F]">Common questions,<br />honest answers.</h2></div><div className="space-y-4">{[{ q: 'Is the audit free?', a: 'Yes. The 12 questions and your full Money Picture report are completely free. No credit card required.' }, { q: 'Why the $99?', a: 'Because free programs get treated like free programs. We also refund it completely — if you do the work, you don\'t pay anything.' }, { q: 'What is MGA, exactly?', a: 'A mentorship system with over 30 years of results. Real health, real income, real growth — through consistent systems and honest, sustained mentorship.' }, { q: 'What are the 10 days like?', a: 'About 30 minutes a day. Read a few pages, watch a short video, send a brief note. Two live conversations with Kanth and Shaku — that\'s where real clarity tends to happen.' }].map((faq) => (<details key={faq.q} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group cursor-pointer"><summary className="px-8 py-6 font-black text-[#272F4F] text-2xl flex items-center justify-between hover:bg-gray-50 transition-colors list-none">{faq.q}<span className="text-[#C84739] font-black text-2xl group-open:rotate-45 transition-transform duration-300 flex-shrink-0 ml-4 leading-none">+</span></summary><div className="px-8 pb-6 text-gray-600 leading-relaxed text-xl">{faq.a}</div></details>))}</div></FadeIn></div></section>

      <section className="py-36 bg-[#272F4F] relative overflow-hidden"><div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C84739]/10 rounded-full blur-3xl" /><div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#36488F]/20 rounded-full blur-3xl" /></div><div className="relative max-w-3xl mx-auto px-6 text-center"><FadeIn><p className="text-blue-200/50 text-xl mb-3">Stop working on yourself.</p><h2 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-12">Start building<br />the system that<br /><span className="text-[#C84739]">works for you.</span></h2><a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#C84739] hover:bg-[#A63A2F] text-white font-black text-xl md:text-2xl px-14 py-7 rounded-2xl transition-all duration-200 shadow-2xl shadow-red-900/50 hover:scale-105">Start Your Audit →</a><p className="text-blue-300/30 text-sm mt-6">Free to start · 8 minutes · No credit card · Hard truths included</p></FadeIn></div></section>

      <footer className="bg-[#111827] py-10"><div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"><span className="text-white/40 text-sm font-black">MyGrowth.Academy</span><div className="flex items-center gap-5">{[{ label: 'FB', href: 'https://www.facebook.com/mygrowth.academy/', hover: 'hover:text-[#1877F2]' }, { label: 'IG', href: 'https://www.instagram.com/mygrowth.academy/', hover: 'hover:text-pink-400' }, { label: 'YT', href: 'https://www.youtube.com/channel/UCftnOx2THDA2SlgzyWAVPuQ', hover: 'hover:text-red-400' }, { label: 'LI', href: 'https://www.linkedin.com/company/mygrowth-academy/', hover: 'hover:text-[#0A66C2]' }, { label: 'TT', href: 'https://www.tiktok.com/@mygrowth.academy', hover: 'hover:text-white' }, { label: 'Website', href: 'https://www.mygrowthacademy.coach/', hover: 'hover:text-[#00C9A2]' }].map(({ label, href, hover }) => (<a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`text-white/30 ${hover} transition-colors text-sm font-bold`}>{label}</a>))}</div><a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="text-[#00C9A2] text-sm font-black hover:text-[#00A380] transition-colors">Start Your Audit →</a></div><div className="max-w-6xl mx-auto px-6 mt-6 pt-6 border-t border-white/5 text-center text-white/15 text-xs">© 2025 MyGrowth.Academy · Not financial or medical advice. Results vary. Individual outcomes depend on effort and consistency.</div></footer>
    </main>
  );
}
