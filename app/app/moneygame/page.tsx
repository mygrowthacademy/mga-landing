'use client';

import { useEffect, useState } from 'react';

const TYPEFORM = 'https://form.typeform.com/to/S6qSbgTP';

export default function Page() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

    const target = 512;
    let n = 0;
    const t = setInterval(() => {
      n += Math.ceil((target - n) / 12);
      if (n >= target) { n = target; clearInterval(t); }
      setCount(n);
    }, 40);

    return () => { obs.disconnect(); clearInterval(t); };
  }, []);

  const [sent, setSent] = useState(false);
  const [stripClosed, setStripClosed] = useState(false);
  const handleReach = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const res = await fetch('https://formspree.io/f/mqenvezd', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (res.ok) setSent(true);
    } catch { setSent(true); }
  };

  const go = () => {
    window.location.href = TYPEFORM;
  };

  const pick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    document.querySelectorAll('.ans').forEach((a) => a.classList.remove('sel'));
    el.classList.add('sel');
    const k = el.querySelector('.key');
    if (k) k.innerHTML = 'Opening →';
    setTimeout(go, 450);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        :root{--navy:#272F4F;--terra:#C84739;--blue:#36488F;--jade:#00C9A2;--ink:#0E1222;--ink2:#141A30;--muted:#8A93B2}
        .mga{position:relative;font-family:'Hanken Grotesk',sans-serif;background:#0E1222;color:#EAEEF8;-webkit-font-smoothing:antialiased;overflow-x:hidden}
        .mga ::selection{background:#00C9A2;color:#0E1222}
        .fd{font-family:'Bricolage Grotesque',sans-serif}
        .c-terra{color:var(--terra)}.c-jade{color:var(--jade)}.c-muted{color:var(--muted)}
        .bgink2{background:rgba(20,26,48,.8)}
        .aurora{position:fixed;inset:-30%;z-index:0;filter:blur(90px);opacity:.5;background:radial-gradient(40% 40% at 20% 30%,#36488F 0%,transparent 60%),radial-gradient(35% 35% at 80% 20%,#C84739 0%,transparent 55%),radial-gradient(40% 40% at 60% 80%,#00C9A2 0%,transparent 55%);animation:drift 18s ease-in-out infinite alternate}
        @keyframes drift{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(0,-4%,0) scale(1.1)}}
        .grid-bg{position:fixed;inset:0;z-index:0;opacity:.4;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:54px 54px;-webkit-mask-image:radial-gradient(circle at 50% 30%,#000 0%,transparent 75%);mask-image:radial-gradient(circle at 50% 30%,#000 0%,transparent 75%)}
        .layer{position:relative;z-index:1}
        .chip{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
        .reveal{opacity:0;transform:translateY(22px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
        .reveal.in{opacity:1;transform:none}
        .load{opacity:0;transform:translateY(16px);animation:mgarise .9s cubic-bezier(.2,.7,.2,1) forwards}
        @keyframes mgarise{to{opacity:1;transform:none}}
        .ans{position:relative;cursor:pointer;transition:transform .25s cubic-bezier(.2,.7,.2,1),box-shadow .25s,border-color .25s,background .25s}
        .ans:hover{transform:translateY(-6px)}
        .ans .key{transition:transform .25s,opacity .25s}
        .ans:hover .key{transform:translateX(4px)}
        .ans.sel{transform:translateY(-6px) scale(1.01)}
        .ans-blue:hover,.ans-blue.sel{border-color:#36488F;box-shadow:0 0 0 1px #36488F,0 24px 60px -20px rgba(54,72,143,.8)}
        .ans-terra:hover,.ans-terra.sel{border-color:#C84739;box-shadow:0 0 0 1px #C84739,0 24px 60px -20px rgba(200,71,57,.75)}
        .ans-jade:hover,.ans-jade.sel{border-color:#00C9A2;box-shadow:0 0 0 1px #00C9A2,0 24px 60px -20px rgba(0,201,162,.6)}
        .pill-glow-terra{box-shadow:0 0 0 1px rgba(200,71,57,.5),0 16px 44px -12px rgba(200,71,57,.7)}
        .float{animation:floaty 6s ease-in-out infinite}
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .barfill{width:0;animation:fill 1.4s .4s cubic-bezier(.3,.8,.3,1) forwards}
        @keyframes fill{to{width:14%}}
        .hov-blue:hover{border-color:#36488F}.hov-terra:hover{border-color:#C84739}.hov-jade:hover{border-color:#00C9A2}
        .mga input::placeholder{color:rgba(255,255,255,.5)}
      `}} />

      <div className="mga">
        <div className="aurora" />
        <div className="grid-bg" />

        <div className="layer">
          {/* QUEST BAR */}
          <nav className="fixed top-0 inset-x-0 z-40 chip border-b border-white/10" style={{ background: 'rgba(14,18,34,.7)' }}>
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <a href="#top" className="flex items-center"><img src="/mga-logo.png" alt="MyGrowth Academy" className="h-6 w-auto" /></a>
              <div className="hidden sm:flex items-center gap-3 ml-auto text-[12px] c-muted">
                <span className="font-semibold text-white/80">MONEY SELFIE</span>
                <span className="h-1.5 w-28 rounded-full bg-white/10 overflow-hidden"><span className="block h-full barfill rounded-full" style={{ background: 'linear-gradient(90deg,#36488F,#00C9A2)' }} /></span>
                <span>Q1 of 7 · 8 min</span>
              </div>
            </div>
          </nav>

          {/* HERO = THE GAME */}
          <header id="top" className="relative min-h-screen flex items-center pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-6 w-full text-center">
              <p className="load inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.22em] uppercase c-jade mb-7 chip bg-white/5 border border-white/10 rounded-full px-4 py-1.5" style={{ animationDelay: '.05s' }}>
                <span className="w-2 h-2 rounded-full float" style={{ background: '#00C9A2' }} />We&apos;ve been where you are
              </p>
              <h1 className="load fd font-extrabold text-5xl md:text-7xl leading-[.98] tracking-[-0.02em] mb-6" style={{ animationDelay: '.12s' }}>
                You&apos;re doing everything right.<br /><span className="c-terra">So why are you still stuck?</span>
              </h1>
              <p className="load max-w-xl mx-auto text-white/65 text-lg font-light leading-relaxed mb-12" style={{ animationDelay: '.22s' }}>
                It starts with your money, the floor everything else stands on. Begin with one honest question.
              </p>

              <div className="load" style={{ animationDelay: '.3s' }}>
                <p className="fd font-bold text-2xl md:text-3xl mb-2">How does money make you feel most of the time?</p>
                <p className="c-muted text-[14px] mb-8">Choose the one that&apos;s most true right now. There&apos;s no right answer.</p>
                <div className="space-y-3 max-w-2xl mx-auto text-left">
                  <button onClick={pick} className="ans ans-blue w-full bgink2 chip border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <span className="fd font-bold text-base flex-none w-7 h-7 grid place-items-center rounded-md" style={{ color: '#7E8FE0', background: 'rgba(54,72,143,.18)' }}>A</span>
                    <span className="font-semibold text-[16px] leading-snug flex-1">Anxious - even when things are technically okay</span>
                    <span className="key text-[15px] c-muted flex-none">→</span>
                  </button>
                  <button onClick={pick} className="ans ans-terra w-full bgink2 chip border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <span className="fd font-bold text-base flex-none w-7 h-7 grid place-items-center rounded-md" style={{ color: '#E8775F', background: 'rgba(200,71,57,.18)' }}>B</span>
                    <span className="font-semibold text-[16px] leading-snug flex-1">Frustrated - I&apos;m trying, but it keeps not adding up</span>
                    <span className="key text-[15px] c-muted flex-none">→</span>
                  </button>
                  <button onClick={pick} className="ans ans-jade w-full bgink2 chip border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <span className="fd font-bold text-base flex-none w-7 h-7 grid place-items-center rounded-md c-jade" style={{ background: 'rgba(0,201,162,.16)' }}>C</span>
                    <span className="font-semibold text-[16px] leading-snug flex-1">Confused - I&apos;m honestly not sure where it goes</span>
                    <span className="key text-[15px] c-muted flex-none">→</span>
                  </button>
                  <button onClick={pick} className="ans ans-blue w-full bgink2 chip border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <span className="fd font-bold text-base flex-none w-7 h-7 grid place-items-center rounded-md" style={{ color: '#7E8FE0', background: 'rgba(54,72,143,.18)' }}>D</span>
                    <span className="font-semibold text-[16px] leading-snug flex-1">Fine, but I know I could be doing more</span>
                    <span className="key text-[15px] c-muted flex-none">→</span>
                  </button>
                  <button onClick={pick} className="ans ans-terra w-full bgink2 chip border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <span className="fd font-bold text-base flex-none w-7 h-7 grid place-items-center rounded-md" style={{ color: '#E8775F', background: 'rgba(200,71,57,.18)' }}>E</span>
                    <span className="font-semibold text-[16px] leading-snug flex-1">Pretty good - I just want to be smarter about it</span>
                    <span className="key text-[15px] c-muted flex-none">→</span>
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[13px] c-muted">
                  <span><span className="text-white font-bold">{count >= 512 ? '512+' : count}</span> started this week</span>
                  <span className="hidden sm:inline opacity-30">|</span>
                  <span className="c-jade">Free</span><span className="opacity-30">/</span><span>Instant</span><span className="opacity-30">/</span><span>No credit card</span>
                </div>
                <p className="mt-5 text-[11px] tracking-[0.18em] uppercase" style={{ color: 'rgba(138,147,178,.6)' }}>Real people · Real numbers · No stock photos</p>
              </div>
            </div>
          </header>

          {/* TEASER */}
          <section className="reveal max-w-4xl mx-auto px-6 py-10">
            <div className="rounded-2xl border border-white/10 chip bg-white/5 p-7 md:flex items-center gap-6">
              <span className="fd font-extrabold text-3xl c-jade whitespace-nowrap">$53K→$130K</span>
              <p className="text-white/80 font-light text-[17px] leading-relaxed mt-3 md:mt-0">&ldquo;I set up one automatic transfer the day my paycheck hit, before I could touch it. That one change started everything.&rdquo; <span className="c-muted">— James</span></p>
            </div>
          </section>

          {/* THE TRAP */}
          <section className="py-24 md:py-32">
            <div className="max-w-3xl mx-auto px-6">
              <p className="reveal text-[12px] font-bold tracking-[0.22em] uppercase c-terra mb-5">The trap</p>
              <h2 className="reveal fd font-extrabold text-4xl md:text-5xl leading-[1.04] mb-8">You&apos;re not failing.<br />You&apos;re scattered.</h2>
              <div className="reveal space-y-5 text-[17px] leading-[1.7] text-white/70 font-light max-w-[60ch]">
                <p>You buy the course. You start the diet. You wake up at 5am. It feels like progress. Then life gets busy, you ease off for a week, and it all slips away. Not because you&apos;re weak. Because none of it was holding anything else up.</p>
              </div>
              <div className="reveal mt-10 rounded-2xl border border-white/10 chip bg-white/5 p-7">
                <p className="fd font-bold text-2xl md:text-3xl leading-snug">&ldquo;A pile of bricks isn&apos;t a house. A pile of habits isn&apos;t a life.&rdquo;</p>
                <p className="c-muted mt-3">You&apos;re running as hard as you can, and staying in the exact same spot.</p>
              </div>
            </div>
          </section>

          {/* SKILL TREE */}
          <section className="py-24 md:py-32">
            <div className="max-w-5xl mx-auto px-6">
              <div className="reveal max-w-2xl mb-14">
                <p className="text-[12px] font-bold tracking-[0.22em] uppercase c-jade mb-5">Your skill tree</p>
                <h2 className="fd font-extrabold text-4xl md:text-5xl leading-[1.05] mb-4">We work three things, together.</h2>
                <p className="text-white/60 font-light">Not a course you watch once. The three stats that decide how far you get, leveled one at a time.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <div className="reveal rounded-2xl border border-white/10 chip bg-white/5 p-7 hov-blue transition-colors" style={{ boxShadow: '0 20px 60px -40px #36488F' }}>
                  <div className="flex items-center justify-between"><span className="fd font-extrabold text-lg" style={{ color: '#7E8FE0' }}>INCOME</span><span className="text-[11px] c-muted">LVL 1</span></div>
                  <div className="h-1.5 rounded-full bg-white/10 mt-4 mb-5 overflow-hidden"><span className="block h-full rounded-full" style={{ width: '66%', background: '#36488F' }} /></div>
                  <p className="text-white/65 font-light text-[15px] leading-relaxed">Stop trading every hour for dollars. Earn more without eating your whole life.</p>
                </div>
                <div className="reveal rounded-2xl border border-white/10 chip bg-white/5 p-7 hov-terra transition-colors" style={{ boxShadow: '0 20px 60px -40px #C84739' }}>
                  <div className="flex items-center justify-between"><span className="fd font-extrabold text-lg" style={{ color: '#E8775F' }}>ENERGY</span><span className="text-[11px] c-muted">LVL 1</span></div>
                  <div className="h-1.5 rounded-full bg-white/10 mt-4 mb-5 overflow-hidden"><span className="block h-full rounded-full" style={{ width: '50%', background: '#C84739' }} /></div>
                  <p className="text-white/65 font-light text-[15px] leading-relaxed">Stop running on empty. Get your energy back, so you&apos;re not too wiped to use the rest.</p>
                </div>
                <div className="reveal rounded-2xl border border-white/10 chip bg-white/5 p-7 hov-jade transition-colors" style={{ boxShadow: '0 20px 60px -40px #00C9A2' }}>
                  <div className="flex items-center justify-between"><span className="fd font-extrabold text-lg c-jade">DIRECTION</span><span className="text-[11px] c-muted">LVL 1</span></div>
                  <div className="h-1.5 rounded-full bg-white/10 mt-4 mb-5 overflow-hidden"><span className="block h-full rounded-full" style={{ width: '75%', background: '#00C9A2' }} /></div>
                  <p className="text-white/65 font-light text-[15px] leading-relaxed">Stop guessing what&apos;s next. Cut the noise, so the few things that matter get done.</p>
                </div>
              </div>
              <p className="reveal text-center fd font-bold text-2xl md:text-3xl mt-12 text-white/90">We don&apos;t pile more onto your plate. We help you clear it.</p>
            </div>
          </section>

          {/* LEADERBOARD */}
          <section className="py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-6">
              <div className="reveal mb-12">
                <p className="text-[12px] font-bold tracking-[0.22em] uppercase c-terra mb-5">The leaderboard</p>
                <h2 className="fd font-extrabold text-4xl md:text-5xl leading-[1.05]">Real people. Real numbers.</h2>
                <p className="c-muted mt-3 font-light">No stock photos. No invented quotes.</p>
              </div>
              <div className="space-y-3">
                <div className="reveal flex items-center gap-5 rounded-xl border border-white/10 chip bg-white/5 p-5"><span className="fd font-extrabold text-2xl c-muted w-8">1</span><div className="flex-1"><span className="font-semibold text-lg">James</span><p className="text-white/55 text-[14px] font-light">One automatic transfer before he could touch it.</p></div><span className="fd font-extrabold c-jade text-lg whitespace-nowrap">$53K→$130K</span></div>
                <div className="reveal flex items-center gap-5 rounded-xl border border-white/10 chip bg-white/5 p-5"><span className="fd font-extrabold text-2xl c-muted w-8">2</span><div className="flex-1"><span className="font-semibold text-lg">Victor</span><p className="text-white/55 text-[14px] font-light">Machine operator, no degree, zero savings.</p></div><span className="fd font-extrabold c-jade text-lg whitespace-nowrap">Income x3</span></div>
                <div className="reveal flex items-center gap-5 rounded-xl border border-white/10 chip bg-white/5 p-5"><span className="fd font-extrabold text-2xl c-muted w-8">3</span><div className="flex-1"><span className="font-semibold text-lg">Jason</span><p className="text-white/55 text-[14px] font-light">Four years to a real system.</p></div><span className="fd font-extrabold c-jade text-lg whitespace-nowrap">Debt gone</span></div>
                <div className="reveal flex items-center gap-5 rounded-xl border border-white/10 chip bg-white/5 p-5"><span className="fd font-extrabold text-2xl c-muted w-8">4</span><div className="flex-1"><span className="font-semibold text-lg">George</span><p className="text-white/55 text-[14px] font-light">Grew up hearing money doesn&apos;t grow on trees.</p></div><span className="fd font-extrabold c-jade text-lg whitespace-nowrap">+300% / 3yr</span></div>
              </div>
              <p className="reveal c-muted text-[13px] mt-8 font-light">None of them started ahead of you. Each began with one honest look. <span className="opacity-60">Results vary; outcomes depend on effort and consistency.</span></p>
            </div>
          </section>

          {/* WHO */}
          <section className="py-20 md:py-24">
            <div className="max-w-3xl mx-auto px-6 reveal rounded-3xl border border-white/10 chip bg-white/5 p-10">
              <p className="text-[12px] font-bold tracking-[0.22em] uppercase c-jade mb-5">The team behind it</p>
              <h2 className="fd font-extrabold text-3xl md:text-4xl leading-tight mb-5">We didn&apos;t learn this from a book.</h2>
              <p className="text-white/70 font-light text-[17px] leading-relaxed">Kanth and Shaku spent 30 years building this in their own lives first. We teach it because we&apos;ve watched it change people we care about, and we&apos;ve never gotten tired of seeing it happen.</p>
            </div>
          </section>

          {/* FINAL = GAME AGAIN */}
          <section className="py-28 md:py-36 text-center">
            <div className="max-w-2xl mx-auto px-6">
              <h2 className="reveal fd font-extrabold text-4xl md:text-6xl leading-[1.04] mb-6">Stop pushing harder. There&apos;s a way through, and it&apos;s <span className="c-terra">simpler</span> than you think.</h2>
              <p className="reveal text-white/65 text-lg font-light mb-9">Pick the one that sounds like you. Your Money Selfie does the rest in 8 minutes.</p>
              <button onClick={go} className="reveal inline-flex items-center gap-2 text-white font-bold text-base px-9 py-5 rounded-full transition-all pill-glow-terra" style={{ background: '#C84739' }}>Start my free Money Selfie <span>→</span></button>
              <p className="reveal c-muted text-[13px] mt-5">Free · Instant results · No credit card</p>
            </div>
          </section>

          <footer className="border-t border-white/10 py-10">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5 text-[13px] c-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mga-logo.png" alt="MyGrowth Academy" className="h-6 w-auto" />
              <div className="flex gap-5 font-medium"><a href="#" className="hover:text-white">Instagram</a><a href="#" className="hover:text-white">TikTok</a><a href="#" className="hover:text-white">YouTube</a><a href="#" className="hover:text-white">LinkedIn</a></div>
              <button onClick={go} className="c-terra font-bold">Start my Money Selfie →</button>
            </div>
            <p className="max-w-5xl mx-auto px-6 mt-7 pt-6 border-t border-white/5 text-[11px] text-white/25 text-center">© 2025 MyGrowth.Academy · Not financial advice. Results vary. Individual outcomes depend on effort and consistency.</p>
          </footer>

          <div className="h-40 md:h-24" />
        </div>

        {!stripClosed && (
          <div className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10" style={{ background: '#272F4F' }}>
            <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-[15px] leading-tight">Have a question before you start?</p>
                <p className="text-white/55 text-[13px] leading-tight">Drop your email and question — Kanth or Shaku replies within 24 hours.</p>
              </div>
              {sent ? (
                <p className="text-white text-[14px] md:pr-6">Thanks. Kanth or Shaku will reply within 24 hours.</p>
              ) : (
                <form onSubmit={handleReach} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <input type="email" name="email" required placeholder="your@email.com" className="rounded-lg px-4 py-2.5 text-[14px] text-white outline-none" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)' }} />
                  <input type="text" name="message" placeholder="Question..." className="rounded-lg px-4 py-2.5 text-[14px] text-white outline-none" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)' }} />
                  <button type="submit" className="rounded-lg px-5 py-2.5 font-bold text-[14px] text-white whitespace-nowrap" style={{ background: '#C84739' }}>Reach Out →</button>
                </form>
              )}
              <button onClick={() => setStripClosed(true)} aria-label="Dismiss" className="text-white/40 hover:text-white/80 text-2xl leading-none px-1 self-end md:self-center">×</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
