'use client';

import { useEffect, useState } from 'react';

const TYPEFORM = 'https://form.typeform.com/to/S6qSbgTP';

const OPTIONS = [
  { L: 'A', t: 'Anxious - even when things are technically okay', c: 'blue', r: '-5deg' },
  { L: 'B', t: "Frustrated - I'm trying, but it keeps not adding up", c: 'terra', r: '3deg' },
  { L: 'C', t: "Confused - I'm honestly not sure where it goes", c: 'jade', r: '-2deg' },
  { L: 'D', t: 'Fine, but I know I could be doing more', c: 'blue', r: '4deg' },
  { L: 'E', t: 'Pretty good - I just want to be smarter about it', c: 'terra', r: '-3deg' },
];

const TICKER1 = 'REAL PEOPLE • REAL NUMBERS • NO STOCK PHOTOS • ';
const TICKER2 = '$53K → $130K • INCOME x3 • DEBT GONE • +300% / 3YR • ';

export default function Page() {
  const [count, setCount] = useState(0);
  const [sent, setSent] = useState(false);
  const [stripClosed, setStripClosed] = useState(false);
  const [stripOpen, setStripOpen] = useState(false);

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

  const go = () => { window.location.href = TYPEFORM; };

  const pick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    document.querySelectorAll('.sticker').forEach((a) => a.classList.remove('sel'));
    el.classList.add('sel');
    setTimeout(go, 380);
  };

  const handleReach = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const res = await fetch('https://formspree.io/f/mqenvezd', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (res.ok) setSent(true);
    } catch { setSent(true); }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        :root{--terra:#C84739;--blue:#36488F;--jade:#00C9A2;--ink:#0B0F1E}
        .mga{position:relative;font-family:'Hanken Grotesk',sans-serif;background:#0B0F1E;color:#EAEEF8;-webkit-font-smoothing:antialiased;overflow-x:hidden}
        .mga ::selection{background:#00C9A2;color:#0B0F1E}
        .fd{font-family:'Unbounded',sans-serif}
        .c-terra{color:var(--terra)}.c-jade{color:var(--jade)}.c-blue{color:#7E8FE0}.c-muted{color:#8A93B2}
        .chip{-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
        .aurora{position:fixed;inset:-25%;z-index:0;filter:blur(80px);opacity:.55;background:radial-gradient(38% 38% at 18% 28%,#36488F 0%,transparent 60%),radial-gradient(34% 34% at 82% 18%,#C84739 0%,transparent 55%),radial-gradient(40% 40% at 60% 82%,#00C9A2 0%,transparent 55%);animation:drift 16s ease-in-out infinite alternate}
        @keyframes drift{from{transform:translate3d(0,0,0) scale(1) rotate(0deg)}to{transform:translate3d(2%,-5%,0) scale(1.15) rotate(8deg)}}
        .grid-bg{position:fixed;inset:0;z-index:0;opacity:.35;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(circle at 50% 25%,#000,transparent 78%);mask-image:radial-gradient(circle at 50% 25%,#000,transparent 78%)}
        .layer{position:relative;z-index:1}
        .reveal{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
        .reveal.in{opacity:1;transform:none}
        .load{opacity:0;transform:translateY(18px);animation:rise .8s cubic-bezier(.2,.7,.2,1) forwards}
        @keyframes rise{to{opacity:1;transform:none}}
        /* sticker answers */
        .sticker{rotate:var(--r,0deg);cursor:pointer;transition:rotate .25s cubic-bezier(.34,1.56,.64,1),scale .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s,background .2s}
        .sticker:hover{rotate:0deg;scale:1.07}
        .sticker.sel{rotate:0deg;scale:1.1}
        .s-blue{background:rgba(54,72,143,.18);border:2px solid rgba(54,72,143,.6)}
        .s-blue:hover,.s-blue.sel{box-shadow:0 16px 44px -10px rgba(54,72,143,.95)}
        .s-terra{background:rgba(200,71,57,.18);border:2px solid rgba(200,71,57,.6)}
        .s-terra:hover,.s-terra.sel{box-shadow:0 16px 44px -10px rgba(200,71,57,.9)}
        .s-jade{background:rgba(0,201,162,.16);border:2px solid rgba(0,201,162,.55)}
        .s-jade:hover,.s-jade.sel{box-shadow:0 16px 44px -10px rgba(0,201,162,.75)}
        .b-blue{background:#36488F}.b-terra{background:#C84739}.b-jade{background:#00C9A2;color:#0B0F1E}
        /* marquee */
        .mwrap{overflow:hidden;width:100%}
        .marq{display:inline-flex;white-space:nowrap;width:max-content;animation:marq 24s linear infinite;will-change:transform}
        .marq.rev{animation-direction:reverse;animation-duration:30s}
        @keyframes marq{to{transform:translateX(-50%)}}
        .outline{color:transparent;-webkit-text-stroke:2px var(--jade)}
        /* fun motion */
        .float{animation:floaty 6s ease-in-out infinite}
        .float2{animation:floaty 8s ease-in-out infinite}
        @keyframes floaty{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(8deg)}}
        .spin{animation:spin 14s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        .pulse{animation:pulse 2.2s ease-in-out infinite}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(200,71,57,.55),0 18px 50px -12px rgba(200,71,57,.7)}50%{box-shadow:0 0 0 14px rgba(200,71,57,0),0 18px 50px -12px rgba(200,71,57,.7)}}
        .livedot{animation:blink 1.3s ease-in-out infinite}
        @keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}
        .wob{animation:wob 4s ease-in-out infinite}
        @keyframes wob{0%,100%{rotate:-4deg}50%{rotate:4deg}}
        .barfill{animation:fill 1.6s .3s cubic-bezier(.34,1.56,.64,1) forwards;width:0}
        @keyframes fill{to{width:var(--w)}}
        .mga input::placeholder{color:rgba(255,255,255,.5)}
        @media (prefers-reduced-motion: reduce){
          .aurora,.marq,.float,.float2,.spin,.pulse,.livedot,.wob,.barfill{animation:none!important}
          .barfill{width:var(--w)!important}
        }
      `}} />

      <div className="mga">
        <div className="aurora" />
        <div className="grid-bg" />

        <div className="layer">
          {/* NAV */}
          <nav className="fixed top-0 inset-x-0 z-40 chip border-b border-white/10" style={{ background: 'rgba(11,15,30,.72)' }}>
            <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <a href="#top" className="flex items-center"><img src="/mga-logo.png" alt="MyGrowth Academy" className="h-6 w-auto" /></a>
              <button onClick={go} className="fd font-bold text-[12px] md:text-[13px] px-4 py-2 rounded-full text-white" style={{ background: '#C84739' }}>START →</button>
            </div>
          </nav>

          {/* HERO */}
          <header id="top" className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden">
            {/* floating stickers */}
            <svg className="absolute left-[6%] top-[22%] w-10 h-10 float c-jade" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0l2.4 7.6L22 12l-7.6 2.4L12 24l-2.4-9.6L2 12l7.6-2.4z"/></svg>
            <svg className="absolute right-[8%] top-[30%] w-8 h-8 float2 c-terra" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0l2.4 7.6L22 12l-7.6 2.4L12 24l-2.4-9.6L2 12l7.6-2.4z"/></svg>
            <span className="absolute left-[12%] bottom-[14%] w-6 h-6 rounded-full spin" style={{ border: '3px solid rgba(126,143,224,.6)' }} aria-hidden />
            <span className="absolute right-[14%] bottom-[20%] w-5 h-5 rounded-md wob" style={{ background: 'rgba(0,201,162,.5)' }} aria-hidden />

            <div className="max-w-5xl mx-auto px-5 w-full text-center relative">
              <p className="load inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] uppercase c-jade mb-6 chip bg-white/5 border border-white/10 rounded-full px-4 py-1.5 wob" style={{ animationDelay: '.05s' }}>
                <span className="w-2 h-2 rounded-full livedot" style={{ background: '#00C9A2' }} />We&apos;ve been where you are
              </p>

              <h1 className="load fd font-extrabold leading-[0.92] tracking-[-0.01em] text-[2.6rem] sm:text-6xl md:text-7xl mb-5" style={{ animationDelay: '.12s' }}>
                You&apos;re doing<br />everything <span className="c-jade">right.</span><br />
                <span className="relative inline-block">So why are you still <span className="c-terra">stuck?</span>
                  <svg className="absolute -bottom-3 left-0 w-full" height="14" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden><path d="M3 9 Q 80 2 150 8 T 297 6" fill="none" stroke="#C84739" strokeWidth="5" strokeLinecap="round" /></svg>
                </span>
              </h1>

              <p className="load max-w-lg mx-auto text-white/60 text-base md:text-lg mb-9" style={{ animationDelay: '.22s' }}>
                It starts with your money, the floor everything else stands on. Begin with one honest question.
              </p>

              {/* THE ONE QUESTION */}
              <div className="load" style={{ animationDelay: '.3s' }}>
                <p className="fd font-bold text-xl md:text-3xl mb-1">How does money make you feel most of the time?</p>
                <p className="c-muted text-[13px] md:text-[14px] mb-7">Choose the one that&apos;s most true right now. There&apos;s no right answer.</p>

                <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
                  {OPTIONS.map((o) => (
                    <button key={o.L} onClick={pick} className={`sticker s-${o.c} inline-flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-left`} style={{ ['--r' as string]: o.r }}>
                      <span className={`fd font-bold grid place-items-center w-6 h-6 rounded-lg text-[12px] text-white b-${o.c}`}>{o.L}</span>
                      <span className="font-bold text-[13.5px] md:text-[14px] leading-tight max-w-[14rem]">{o.t}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-8 text-[13px] c-muted">
                  <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full livedot" style={{ background: '#C84739' }} /><span className="fd font-bold text-white text-base">{count >= 512 ? '512+' : count}</span> started this week</span>
                  <span className="hidden sm:inline opacity-30">|</span>
                  <span className="c-jade font-semibold">Free</span><span className="opacity-30">/</span><span>Instant</span><span className="opacity-30">/</span><span>No credit card</span>
                </div>
                <p className="mt-4 text-[11px] tracking-[0.16em] uppercase" style={{ color: 'rgba(138,147,178,.55)' }}>Real people · Real numbers · No stock photos</p>
              </div>
            </div>
          </header>

          {/* MARQUEE 1 */}
          <div className="mwrap py-3 border-y border-white/10" style={{ background: 'rgba(255,255,255,.02)' }}>
            <div className="marq fd font-extrabold text-2xl md:text-4xl">
              <span className="outline">{TICKER1.repeat(6)}</span>
              <span className="outline">{TICKER1.repeat(6)}</span>
            </div>
          </div>

          {/* TEASER */}
          <section className="reveal max-w-4xl mx-auto px-5 py-12">
            <div className="rounded-3xl border-2 p-7 md:flex items-center gap-6 wob" style={{ borderColor: 'rgba(0,201,162,.5)', background: 'rgba(0,201,162,.06)' }}>
              <span className="fd font-extrabold text-3xl md:text-4xl c-jade whitespace-nowrap">$53K→$130K</span>
              <p className="text-white/85 text-[16px] md:text-[17px] leading-relaxed mt-3 md:mt-0">&ldquo;I set up one automatic transfer the day my paycheck hit, before I could touch it. That one change started everything.&rdquo; <span className="c-muted">— James</span></p>
            </div>
          </section>

          {/* THE TRAP */}
          <section className="py-20 md:py-28">
            <div className="max-w-3xl mx-auto px-5">
              <p className="reveal text-[12px] font-bold tracking-[0.22em] uppercase c-terra mb-4">The trap</p>
              <h2 className="reveal fd font-extrabold text-4xl md:text-6xl leading-[0.98] mb-7">You&apos;re not failing.<br /><span className="c-terra">You&apos;re scattered.</span></h2>
              <p className="reveal text-[16px] md:text-[17px] leading-[1.7] text-white/70 max-w-[60ch]">You buy the course. You start the diet. You wake up at 5am. It feels like progress. Then life gets busy, you ease off for a week, and it all slips away. Not because you&apos;re weak. Because none of it was holding anything else up.</p>
              <div className="reveal mt-9 rounded-3xl border-2 p-7" style={{ borderColor: 'rgba(126,143,224,.45)', background: 'rgba(54,72,143,.12)', rotate: '-1.5deg' }}>
                <p className="fd font-bold text-xl md:text-3xl leading-snug">&ldquo;A pile of bricks isn&apos;t a house. A pile of habits isn&apos;t a life.&rdquo;</p>
                <p className="c-muted mt-3">You&apos;re running as hard as you can, and staying in the exact same spot.</p>
              </div>
            </div>
          </section>

          {/* SKILL TREE */}
          <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-5">
              <div className="reveal max-w-2xl mb-10">
                <p className="text-[12px] font-bold tracking-[0.22em] uppercase c-jade mb-4">Your skill tree</p>
                <h2 className="fd font-extrabold text-3xl md:text-5xl leading-[1.02] mb-3">We work three things, together.</h2>
                <p className="text-white/60">Not a course you watch once. The three stats that decide how far you get, leveled one at a time.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { n: 'INCOME', col: '#36488F', tc: '#7E8FE0', w: '66%', d: 'Stop trading every hour for dollars. Earn more without eating your whole life.' },
                  { n: 'ENERGY', col: '#C84739', tc: '#E8775F', w: '50%', d: "Stop running on empty. Get your energy back, so you're not too wiped to use the rest." },
                  { n: 'DIRECTION', col: '#00C9A2', tc: '#00C9A2', w: '75%', d: "Stop guessing what's next. Cut the noise, so the few things that matter get done." },
                ].map((s) => (
                  <div key={s.n} className="reveal rounded-3xl border-2 chip p-7" style={{ borderColor: s.col + '66', background: 'rgba(255,255,255,.04)', boxShadow: `0 24px 60px -42px ${s.col}` }}>
                    <div className="flex items-center justify-between mb-4"><span className="fd font-extrabold text-lg" style={{ color: s.tc }}>{s.n}</span><span className="text-[11px] c-muted">LVL 1</span></div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-5"><span className="block h-full rounded-full barfill" style={{ ['--w' as string]: s.w, background: s.col }} /></div>
                    <p className="text-white/65 text-[15px] leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
              <p className="reveal text-center fd font-bold text-2xl md:text-4xl mt-12 leading-tight">We don&apos;t pile more onto your plate. <span className="c-jade">We help you clear it.</span></p>
            </div>
          </section>

          {/* MARQUEE 2 */}
          <div className="mwrap py-3 border-y border-white/10" style={{ background: 'rgba(255,255,255,.02)' }}>
            <div className="marq rev fd font-extrabold text-2xl md:text-4xl c-jade">
              <span>{TICKER2.repeat(5)}</span>
              <span>{TICKER2.repeat(5)}</span>
            </div>
          </div>

          {/* LEADERBOARD */}
          <section className="py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-5">
              <div className="reveal mb-10">
                <p className="text-[12px] font-bold tracking-[0.22em] uppercase c-terra mb-4">The leaderboard</p>
                <h2 className="fd font-extrabold text-3xl md:text-5xl leading-[1.02]">Real people. Real numbers.</h2>
                <p className="c-muted mt-3">No stock photos. No invented quotes.</p>
              </div>
              <div className="space-y-3">
                {[
                  { r: 1, n: 'James', d: 'One automatic transfer before he could touch it.', s: '$53K→$130K' },
                  { r: 2, n: 'Victor', d: 'Machine operator, no degree, zero savings.', s: 'Income x3' },
                  { r: 3, n: 'Jason', d: 'Four years to a real system.', s: 'Debt gone' },
                  { r: 4, n: 'George', d: "Grew up hearing money doesn't grow on trees.", s: '+300% / 3yr' },
                ].map((row) => (
                  <div key={row.r} className="reveal flex items-center gap-4 md:gap-5 rounded-2xl border-2 chip p-4 md:p-5" style={{ borderColor: 'rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)' }}>
                    <span className="fd font-extrabold text-2xl md:text-3xl w-8 md:w-10 text-center" style={{ color: row.r === 1 ? '#00C9A2' : '#8A93B2' }}>{row.r}</span>
                    <div className="flex-1 min-w-0"><span className="font-bold text-lg">{row.n}</span><p className="text-white/55 text-[13px] md:text-[14px]">{row.d}</p></div>
                    <span className="fd font-extrabold text-base md:text-lg c-jade whitespace-nowrap">{row.s}</span>
                  </div>
                ))}
              </div>
              <p className="reveal c-muted text-[13px] mt-7">None of them started ahead of you. Each began with one honest look. <span className="opacity-60">Results vary; outcomes depend on effort and consistency.</span></p>
            </div>
          </section>

          {/* WHO */}
          <section className="py-14 md:py-20">
            <div className="max-w-4xl mx-auto px-5">
              <div className="reveal rounded-3xl border-2 chip overflow-hidden md:grid md:grid-cols-2 items-stretch" style={{ borderColor: 'rgba(0,201,162,.35)', background: 'rgba(255,255,255,.04)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/founders-gamified.jpg" alt="Kanth and Shaku, founders of MyGrowth Academy" width={1100} height={778} loading="lazy" className="w-full h-60 md:h-full object-cover" style={{ objectPosition: '50% 30%' }} />
                <div className="p-8 md:p-9">
                  <p className="text-[12px] font-bold tracking-[0.22em] uppercase c-jade mb-4">The team behind it</p>
                  <h2 className="fd font-extrabold text-2xl md:text-3xl leading-tight mb-4">We didn&apos;t learn this from a book.</h2>
                  <p className="text-white/70 text-[16px] md:text-[17px] leading-relaxed">Kanth and Shaku spent 30 years building this in their own lives first. We teach it because we&apos;ve watched it change people we care about, and we&apos;ve never gotten tired of seeing it happen.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FINAL */}
          <section className="py-24 md:py-32 text-center relative overflow-hidden">
            <svg className="absolute left-[10%] top-[18%] w-9 h-9 float c-jade" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0l2.4 7.6L22 12l-7.6 2.4L12 24l-2.4-9.6L2 12l7.6-2.4z"/></svg>
            <svg className="absolute right-[12%] top-[26%] w-7 h-7 float2 c-terra" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0l2.4 7.6L22 12l-7.6 2.4L12 24l-2.4-9.6L2 12l7.6-2.4z"/></svg>
            <div className="max-w-2xl mx-auto px-5 relative">
              <h2 className="reveal fd font-extrabold text-4xl md:text-6xl leading-[0.98] mb-5">Stop pushing harder. There&apos;s a way through, and it&apos;s <span className="c-terra">simpler</span> than you think.</h2>
              <p className="reveal text-white/65 text-base md:text-lg mb-9">Pick the one that sounds like you. Your Money Selfie does the rest in 8 minutes.</p>
              <button onClick={go} className="reveal pulse inline-flex items-center gap-2 text-white fd font-bold text-base md:text-lg px-10 py-5 rounded-full" style={{ background: '#C84739' }}>Start my free Money Selfie <span>→</span></button>
              <p className="reveal c-muted text-[13px] mt-5">Free · Instant results · No credit card</p>
            </div>
          </section>

          <footer className="border-t border-white/10 py-10">
            <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-5 text-[13px] c-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mga-logo.png" alt="MyGrowth Academy" className="h-6 w-auto" />
              <div className="flex flex-wrap justify-center gap-5 font-semibold">
                <a href="https://www.instagram.com/mygrowth.academy" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
                <a href="https://www.tiktok.com/@mygrowth.academy" target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
                <a href="https://www.youtube.com/@mygrowth.academy" target="_blank" rel="noopener noreferrer" className="hover:text-white">YouTube</a>
                <a href="https://www.linkedin.com/in/shakumiriyala/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                <a href="https://www.facebook.com/mygrowth.academy" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
              </div>
              <button onClick={go} className="c-terra font-bold">Start my Money Selfie →</button>
            </div>
            <p className="max-w-5xl mx-auto px-5 mt-7 pt-6 border-t border-white/5 text-[11px] text-white/25 text-center">© 2026 MyGrowth.Academy · Not financial advice. Results vary. Individual outcomes depend on effort and consistency.</p>
          </footer>

          <div className="h-40 md:h-24" />
        </div>

        {!stripClosed && (
          <div className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10" style={{ background: '#272F4F' }}>
            <form onSubmit={handleReach} className="max-w-6xl mx-auto px-5 py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
              <div className="flex items-start gap-3 md:flex-1 md:min-w-0">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-[15px] leading-tight">Have a question before you start?</p>
                  <p className="text-white/55 text-[13px] leading-tight">Drop your email and question — Kanth or Shaku replies within 24 hours.</p>
                </div>
                <button type="button" onClick={() => setStripOpen((o) => !o)} className="md:hidden rounded-lg px-4 py-2.5 font-bold text-[13px] text-white whitespace-nowrap" style={{ background: '#C84739' }}>{stripOpen ? 'Close' : 'Ask'}</button>
                <button type="button" onClick={() => setStripClosed(true)} aria-label="Dismiss" className="md:hidden text-white/40 text-2xl leading-none px-1">×</button>
              </div>
              {sent ? (
                <p className="text-white text-[14px] md:pr-6">Thanks. Kanth or Shaku will reply within 24 hours.</p>
              ) : (
                <div className={`${stripOpen ? 'flex' : 'hidden'} md:flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5`}>
                  <input type="email" name="email" required placeholder="your@email.com" className="rounded-lg px-4 py-3 text-[15px] text-white outline-none w-full sm:w-auto" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)' }} />
                  <input type="text" name="message" placeholder="Question..." className="rounded-lg px-4 py-3 text-[15px] text-white outline-none w-full sm:w-auto" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)' }} />
                  <button type="submit" className="rounded-lg px-5 py-3 font-bold text-[15px] text-white whitespace-nowrap" style={{ background: '#C84739' }}>Reach Out →</button>
                </div>
              )}
              <button type="button" onClick={() => setStripClosed(true)} aria-label="Dismiss" className="hidden md:block text-white/40 hover:text-white/80 text-2xl leading-none px-1 self-center">×</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
