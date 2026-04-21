'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const TYPEFORM_URL = 'https://8hm5qhmx5pp.typeform.com/to/S6qSbgTP';

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
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

export default function Home() {
  const [popupOpen, setPopupOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-white text-gray-900 overflow-x-hidden" style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>

      {/* POPUP */}
      {popupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(15,20,40,0.55)' }}>
          <div className="absolute inset-0" onClick={() => setPopupOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-[#C84739] via-[#36488F] to-[#00C9A2]" />
            <button onClick={() => setPopupOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors text-sm font-bold">✕</button>
            <div className="px-10 pt-9 pb-9">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00C9A2] mb-4">QUICK QUESTION</div>
              <h2 className="text-3xl font-black text-[#272F4F] leading-tight mb-4">
                Something's not adding up… right?
              </h2>
              <p className="text-gray-500 text-base mb-6 leading-relaxed">
                Take the free Money Selfie. See exactly what's working and what's quietly draining you.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A2] flex-shrink-0" />
                <span>5 minutes</span>
                <span className="text-gray-200 mx-1">·</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A2] flex-shrink-0" />
                <span>12 questions</span>
                <span className="text-gray-200 mx-1">·</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A2] flex-shrink-0" />
                <span>Free — no credit card</span>
              </div>
              <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center bg-[#C84739] hover:bg-[#A63A2F] text-white font-black py-4 rounded-2xl transition-all duration-200 text-base shadow-lg shadow-red-100 hover:scale-[1.01]">
                Show Me What's Going On →
              </a>
              <p className="text-center text-xs text-gray-400 mt-4">No sales call · Instant results</p>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo-full.svg" alt="MyGrowth Academy" width={160} height={48} className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['#system', '#results', '#founders'].map((href, i) => (
              <a key={href} href={href} className="text-sm text-gray-500 hover:text-[#272F4F] font-medium transition-colors">
                {['The System', 'Results', 'About'][i]}
              </a>
            ))}
            <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer"
              className="bg-[#C84739] hover:bg-[#A63A2F] text-white text-sm font-black px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-sm">
              Start Your Audit →
            </a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-gray-600" />
              <div className="w-6 h-0.5 bg-gray-600" />
              <div className="w-4 h-0.5 bg-gray-600" />
            </div>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-4">
            {['#system', '#results', '#founders'].map((href, i) => (
              <a key={href} href={href} className="block text-gray-600 font-medium" onClick={() => setMenuOpen(false)}>
                {['The System', 'Results', 'About'][i]}
              </a>
            ))}
            <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer"
              className="block bg-[#C84739] text-white font-black px-5 py-3 rounded-xl text-center">
              Start Your Audit →
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="min-h-screen bg-[#272F4F] flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#36488F]/25 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#C84739]/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00C9A2]/5 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-[#00C9A2] mb-8 border border-[#00C9A2]/25 px-5 py-2 rounded-full bg-[#00C9A2]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A2] animate-pulse" />
              MULTI-GROWTH ARCHITECTURE
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.0] mb-6 tracking-tight">
              The Great<br />
              <span className="text-[#C84739] relative">Cancellation.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl md:text-2xl text-blue-200/70 max-w-2xl mx-auto mb-5 leading-relaxed font-light">
              Your life is currently a zero-sum game.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="text-blue-200/50 text-base md:text-lg max-w-xl mx-auto mb-6 space-y-2">
              <p>You work harder to earn more... but your health pays the tax.</p>
              <p>You build discipline in the gym... but your business loses focus.</p>
              <p>You learn new skills... but your bank account doesn't notice.</p>
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-white font-black text-xl md:text-2xl italic mb-12">
              You aren't growing. You're just vibrating in place.
            </p>
          </FadeIn>
          <FadeIn delay={500}>
            <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-[#C84739] hover:bg-[#A63A2F] text-white font-black text-lg md:text-xl px-10 py-5 md:py-6 rounded-2xl transition-all duration-200 shadow-2xl shadow-red-900/40 hover:scale-105 hover:shadow-red-900/60">
              Run Your 8-Minute System Audit →
            </a>
            <p className="text-blue-300/40 text-sm mt-4">Free · Results are instant · Hard truths included</p>
          </FadeIn>
        </div>
      </section>

      {/* THE TRAP */}
      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="text-xs font-black tracking-[0.2em] text-[#36488F] mb-5">THE TRAP</div>
            <h2 className="text-5xl md:text-6xl font-black text-[#272F4F] leading-tight mb-10">The "Better" Illusion</h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-6">
              Most people don't fail because they are lazy. They fail because they are{' '}
              <strong className="text-[#272F4F]">efficient at the wrong things.</strong>
            </p>
            <p className="text-gray-500 text-xl mb-6">You've fallen for the Improvement Loop:</p>
            <div className="space-y-4 mb-12">
              {['You buy the course.', 'You start the diet.', 'You wake up at 5 AM.'].map((item, i) => (
                <FadeIn key={item} delay={i * 80}>
                  <div className="flex items-center gap-5 bg-gray-50 rounded-2xl px-8 py-5 border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C84739] flex-shrink-0" />
                    <span className="text-gray-800 font-bold text-lg">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <p className="text-gray-600 text-xl leading-relaxed mb-10">
              It feels like progress, but it's actually <strong className="text-[#272F4F]">Entropy.</strong> Because your habits aren't connected, they have no shelf life. The moment you stop pushing, the progress evaporates.
            </p>
            <div className="bg-[#FAEAE8] border-l-4 border-[#C84739] rounded-2xl px-10 py-8">
              <p className="text-[#C84739] font-black text-2xl leading-snug">
                You're building a castle on a treadmill — and the timer is running out.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ROOT CAUSE */}
      <section className="py-28 bg-[#F4F5F8]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="text-xs font-black tracking-[0.2em] text-[#36488F] mb-5">ROOT CAUSE</div>
            <h2 className="text-5xl md:text-6xl font-black text-[#272F4F] leading-tight mb-10">Growth Without Architecture</h2>
            <p className="text-gray-600 text-xl mb-10">Self-improvement is a scam when sold as a collection of habits.</p>
            <div className="border-t-2 border-b-2 border-[#272F4F]/10 py-12 my-10">
              <p className="text-4xl md:text-5xl font-black italic text-[#272F4F] leading-tight">
                "A pile of bricks isn't a house.<br />A pile of habits isn't a life."
              </p>
            </div>
            <div className="bg-[#272F4F] text-white rounded-2xl px-10 py-8 mb-10">
              <p className="text-2xl font-black">If your growth isn't structural, it's decorative.</p>
            </div>
            <p className="text-gray-600 text-xl leading-relaxed">
              Most people try to <em>balance</em> their lives. Balance is for the mediocre. MGA is about{' '}
              <strong className="text-[#272F4F]">Integration.</strong> When your income feeds your energy, and your energy fuels your direction, growth becomes the path of least resistance.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* MECHANISM */}
      <section id="system" className="py-28 bg-[#272F4F]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00C9A2] mb-4">THE MECHANISM</div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">The MGA Compounding Engine</h2>
              <p className="text-blue-200/60 text-lg max-w-2xl mx-auto">
                This is not coaching. This is <strong className="text-white">Infrastructure.</strong> We align the three variables that determine your ceiling.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              { num: '01', title: 'ASYMMETRIC INCOME', desc: 'Stop trading time. We install high-leverage skill pathways designed for maximum output with minimum friction.', color: '#C84739' },
              { num: '02', title: 'BIOLOGICAL LONGEVITY', desc: 'Stop burning out. We treat your physiology as a high-performance energy plant, not a vanity project.', color: '#36488F' },
              { num: '03', title: 'DECISION ARCHITECTURE', desc: 'Stop guessing. We give you a No-Go filter that kills 90% of your distractions so the remaining 10% actually moves the needle.', color: '#00C9A2' },
            ].map((p, i) => (
              <FadeIn key={p.num} delay={i * 100}>
                <div className="h-full rounded-2xl p-8 bg-white/5 border border-white/10 relative overflow-hidden hover:bg-white/8 transition-colors group">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ background: p.color }} />
                  <div className="text-xs font-black mb-4" style={{ color: p.color }}>{p.num}</div>
                  <h3 className="text-white font-black text-lg mb-4 leading-tight">{p.title}</h3>
                  <p className="text-blue-200/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="bg-gradient-to-r from-[#C84739]/10 via-white/5 to-[#00C9A2]/10 border border-white/10 rounded-2xl px-8 py-6 text-center">
              <p className="text-white font-black text-xl">MGA doesn't add more to your plate. <span className="text-[#00C9A2]">It replaces the plate.</span></p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-xs font-black tracking-[0.2em] text-[#36488F] mb-5">THE TRANSFORMATION</div>
              <h2 className="text-5xl md:text-6xl font-black text-[#272F4F] leading-tight">From Effort to Momentum</h2>
              <p className="text-gray-400 mt-5 text-xl">In 90 days, the feeling of work changes.</p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: 'The Fog Clears', desc: 'You stop asking "What should I do?" and start executing the obvious.', num: '01' },
              { title: 'The Floor Rises', desc: 'Your bad days become more productive than your old good days.', num: '02' },
              { title: 'The Baseline Stacks', desc: 'Your income and health finally start trending in the same direction.', num: '03' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-[#F4F5F8] rounded-2xl p-10 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                  <div className="text-xs font-black text-[#C84739] tracking-widest mb-5">{item.num}</div>
                  <h3 className="font-black text-[#272F4F] text-3xl mb-5">{item.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black italic text-[#272F4F]">
                Stop hunting for breakthroughs.<br />Start trusting the output.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-28 bg-[#272F4F]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00C9A2] mb-4">THE MATH</div>
              <h2 className="text-4xl md:text-5xl font-black text-white">Real People. Real Numbers.</h2>
              <p className="text-blue-200/50 mt-4">We don't use stock photos and invented quotes.</p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { ini: 'J', color: '#C84739', name: 'James', stats: ['$53K → $130K', '$65K → $160K investments'], quote: 'Output increased. Hours decreased. I set up one automatic transfer the day my paycheck hit — before I could touch it. That\'s it. But it was the habits around it that changed me.' },
              { ini: 'V', color: '#36488F', name: 'Victor', stats: ['Income tripled', 'Six-figure savings', 'Energy at 40 > 25'], quote: 'Started as a machine operator. No degree. Zero savings. Wasn\'t looking for inspiration. Was looking for a system. Same city. Different foundation.' },
              { ini: 'Ja', color: '#00A380', name: 'Jason', stats: ['Six-figure debt gone', 'Income +39%', 'Six-figure savings'], quote: 'I started showing up differently in every area — not just financially. Four years after getting a real system: no debt. Income up 39%.' },
              { ini: 'G', color: '#8B6914', name: 'George', stats: ['300% asset growth', '3 years'], quote: 'Grew up hearing money doesn\'t grow on trees. Three years later: There\'s a spring in our shoes now. I walk differently at work.' },
            ].map((s, i) => (
              <FadeIn key={s.name} delay={i * 80}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-sm flex-shrink-0" style={{ background: s.color }}>
                      {s.ini}
                    </div>
                    <div>
                      <div className="text-white font-black text-lg mb-2">{s.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {s.stats.map((st) => (
                          <span key={st} className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-blue-200">{st}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-200/60 text-sm leading-relaxed italic">"{s.quote}"</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-8 bg-[#C84739]/10 border border-[#C84739]/20 rounded-2xl px-8 py-5 text-center">
              <p className="text-white font-black">These people didn't start ahead of you. Every one of them began with a clear, honest look.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOR / NOT FOR */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="text-xs font-black tracking-[0.2em] text-[#36488F] mb-5">FIT CHECK</div>
              <h2 className="text-5xl md:text-6xl font-black text-[#272F4F]">Be honest with yourself.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-[#00C9A2]/30 rounded-2xl p-10 hover:border-[#00C9A2]/60 transition-colors">
                <div className="text-xs font-black tracking-widest text-[#00A380] mb-8">THIS IS FOR YOU IF</div>
                <div className="space-y-6">
                  {['You are already successful but feel remarkably fragile.', 'You hate hacks and want a permanent operating system.', 'You are ready to kill good opportunities to hunt great ones.'].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#00C9A2] flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-sm font-black">✓</div>
                      <p className="text-gray-700 text-lg leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#F4F5F8] rounded-2xl p-10 border border-gray-200">
                <div className="text-xs font-black tracking-widest text-gray-400 mb-8">DO NOT JOIN IF</div>
                <div className="space-y-6">
                  {['You are a content junkie who never builds.', 'You prioritize looking busy over being effective.', 'You think more effort is the solution to a broken system.'].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-sm font-black">✕</div>
                      <p className="text-gray-400 text-lg leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="founders" className="py-28 bg-[#272F4F]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 md:order-1">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#C84739]/20 to-[#36488F]/20 rounded-3xl blur-2xl" />
                <Image src="/founders.png" alt="Kanth and Shaku" width={600} height={750}
                  className="relative rounded-3xl w-full object-cover shadow-2xl" style={{ maxHeight: '550px', objectPosition: 'top' }} />
              </div>
              <div className="order-1 md:order-2">
                <div className="text-[10px] font-black tracking-[0.2em] text-[#00C9A2] mb-4">OUR STORY</div>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  We didn't build MGA from a theory.
                </h2>
                <p className="text-blue-200/70 text-lg leading-relaxed mb-5">
                  Kanth and Shaku have spent over 30 years building the exact things MGA teaches. Not as consultants. As practitioners. Their health, their income, their community — built through the same system.
                </p>
                <p className="text-blue-200/70 text-lg leading-relaxed mb-8">
                  They've watched people come in skeptical and leave transformed. Not because of a program. Because of a relationship with people who actually care.
                </p>
                <blockquote className="border-l-4 border-[#00C9A2] pl-6">
                  <p className="text-white text-xl font-black italic leading-snug">
                    "We've never gotten tired of watching that happen. We never will."
                  </p>
                </blockquote>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROTOCOL */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#36488F] mb-4">THE PROTOCOL</div>
              <h2 className="text-4xl md:text-5xl font-black text-[#272F4F] leading-tight">Start with clarity. Then decide.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12 relative">
              <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-[#36488F] via-[#7B66BC] to-[#C84739]" />
              {[
                { num: '1', title: 'The Audit', desc: '8 minutes to find the leak.', color: '#36488F', tag: 'Free' },
                { num: '2', title: 'The Blueprint', desc: 'A customized map of your misalignments.', color: '#36488F', tag: 'Free' },
                { num: '3', title: 'The 10-Day Installation', desc: 'We build the system together. $99 — fully refunded if you do the work.', color: '#C84739', tag: '$99 refundable' },
              ].map((step, i) => (
                <FadeIn key={step.num} delay={i * 100}>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center font-black text-white text-3xl mx-auto mb-6 shadow-xl relative z-10" style={{ background: step.color }}>
                      {step.num}
                    </div>
                    <h3 className="font-black text-[#272F4F] text-xl mb-3">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{step.desc}</p>
                    <span className="inline-block text-xs font-black px-3 py-1 rounded-full" style={{ background: i < 2 ? '#E8F5EE' : '#FAEAE8', color: i < 2 ? '#00A380' : '#C84739' }}>
                      {step.tag}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="bg-[#EEF1FA] rounded-2xl px-8 py-6 text-center mb-12">
              <p className="text-[#272F4F] font-black text-lg">
                If you finish the 10 days and don't see the signal, <span className="text-[#C84739]">you don't pay.</span>
              </p>
              <p className="text-gray-500 text-sm mt-2">We don't want satisfied customers. We want compounding assets.</p>
            </div>
            <div className="text-center">
              <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer"
                className="inline-block bg-[#C84739] hover:bg-[#A63A2F] text-white font-black text-xl px-12 py-6 rounded-2xl transition-all duration-200 shadow-2xl shadow-red-100 hover:shadow-red-200 hover:scale-105">
                Start Your Audit →
              </a>
              <p className="text-gray-400 text-sm mt-4">Free to start · 8 minutes · No credit card</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#F4F5F8]">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="text-xs font-black tracking-[0.2em] text-[#36488F] mb-5">FAQ</div>
              <h2 className="text-4xl md:text-5xl font-black text-[#272F4F]">Common questions,<br />honest answers.</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Is the audit free?', a: 'Yes. The 12 questions and your full Money Picture report are completely free. No credit card required.' },
                { q: 'Why the $99?', a: 'Because free programs get treated like free programs. We also refund it completely — if you do the work, you don\'t pay anything. So the real question is: are you serious enough to put $99 down knowing you get it back?' },
                { q: 'What is MGA, exactly?', a: 'A mentorship system with over 30 years of results. Real health, real income, real growth — through consistent systems and honest, sustained mentorship.' },
                { q: 'What are the 10 days like?', a: 'About 30 minutes a day. Read a few pages, watch a short video, send a brief note. Two live conversations with Kanth and Shaku — that\'s where real clarity tends to happen.' },
              ].map((faq) => (
                <details key={faq.q} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group cursor-pointer">
                  <summary className="px-8 py-6 font-black text-[#272F4F] text-xl flex items-center justify-between hover:bg-gray-50 transition-colors list-none">
                    {faq.q}
                    <span className="text-[#C84739] font-black text-2xl group-open:rotate-45 transition-transform duration-300 flex-shrink-0 ml-4 leading-none">+</span>
                  </summary>
                  <div className="px-8 pb-6 text-gray-600 leading-relaxed text-lg">{faq.a}</div>
                </details>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-36 bg-[#272F4F] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C84739]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#36488F]/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-blue-200/50 text-xl mb-3">Stop working on yourself.</p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-12">
              Start building<br />
              the system that<br />
              <span className="text-[#C84739]">works for you.</span>
            </h2>
            <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-[#C84739] hover:bg-[#A63A2F] text-white font-black text-xl md:text-2xl px-14 py-7 rounded-2xl transition-all duration-200 shadow-2xl shadow-red-900/50 hover:scale-105 hover:shadow-red-900/70">
              Start Your Audit →
            </a>
            <p className="text-blue-300/30 text-sm mt-6">Free to start · 8 minutes · No credit card · Hard truths included</p>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111827] py-14">
        <div className="max-w-6xl mx-auto px-6">

          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="flex items-center">
              <Image src="/logo-full.svg" alt="MyGrowth Academy" width={140} height={42} className="h-9 w-auto opacity-80" />
            </div>
            <div className="flex items-center gap-5">
              {/* Facebook */}
              <a href="https://www.facebook.com/mygrowth.academy/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877F2]/20 flex items-center justify-center transition-all hover:scale-110 group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#1877F2] stroke-white/40"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/mygrowth.academy/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500/20 flex items-center justify-center transition-all hover:scale-110 group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-pink-400 stroke-white/40"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" className="group-hover:stroke-pink-400 stroke-white/40"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" className="group-hover:fill-pink-400 fill-white/40"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/channel/UCftnOx2THDA2SlgzyWAVPuQ" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-all hover:scale-110 group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="2" className="group-hover:stroke-red-400 stroke-white/40"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="group-hover:stroke-red-400 stroke-white/40"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/mygrowth-academy/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0A66C2]/20 flex items-center justify-center transition-all hover:scale-110 group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#0A66C2] stroke-white/40"/>
                  <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#0A66C2] stroke-white/40"/>
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" className="group-hover:stroke-[#0A66C2] stroke-white/40"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@mygrowth.academy" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110 group">
                <svg width="16" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white stroke-white/40"/>
                </svg>
              </a>
            </div>
            <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer"
              className="text-[#00C9A2] text-sm font-black hover:text-[#00A380] transition-colors whitespace-nowrap">
              Start Your Audit →
            </a>
          </div>

          {/* Middle row — links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/25 text-sm mb-10 border-t border-white/5 pt-8">
            <a href="https://www.mygrowthacademy.coach/" target="_blank" rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors">Main Website</a>
            <span>·</span>
            <span className="hover:text-white/40 cursor-pointer transition-colors">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white/40 cursor-pointer transition-colors">Terms</span>
            <span>·</span>
            <span className="hover:text-white/40 cursor-pointer transition-colors">Contact</span>
          </div>

          {/* Bottom row */}
          <div className="text-center text-white/15 text-xs">
            © 2025 MyGrowth.Academy · Not financial or medical advice. Results vary. Individual outcomes depend on effort and consistency.
          </div>

        </div>
      </footer>

    </main>
  );
}
