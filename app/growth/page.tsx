'use client';

import { useEffect, useState } from 'react';

const TYPEFORM = 'https://form.typeform.com/to/S6qSbgTP';

export default function Page() {
  const [sent, setSent] = useState(false);
  const [stripClosed, setStripClosed] = useState(false);
  const [stripOpen, setStripOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

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
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        :root{--navy:#232B40;--blue:#36488F;--terra:#C84739;--terraDark:#A63A2F;--jade:#00C9A2;--ink:#1E2230;--muted:#6B7186;--appbg:#F5F6FA}
        .mga{font-family:'Schibsted Grotesk',sans-serif;background:var(--appbg);color:var(--ink);-webkit-font-smoothing:antialiased}
        .mga ::selection{background:var(--terra);color:#fff}
        .fd{font-family:'DM Serif Display',serif}
        .c-navy{color:var(--navy)}.c-blue{color:var(--blue)}.c-terra{color:var(--terra)}.c-jade{color:var(--jade)}.c-muted{color:var(--muted)}
        .c-ink70{color:rgba(30,34,48,.72)}.c-ink80{color:rgba(30,34,48,.82)}
        .bgnavy{background:var(--navy)}.bgcard{background:#fff}.bgtint{background:#EDEFF7}
        .btnterra{background:var(--terra);color:#fff;transition:transform .2s,box-shadow .2s,background .2s}
        .btnterra:hover{background:var(--terraDark);transform:translateY(-2px)}
        .navbg{background:rgba(245,246,250,.85);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
        .bd{border-color:rgba(30,34,48,.10)}
        .hero{position:relative;background:var(--navy);overflow:hidden}
        .hero-glow{position:absolute;inset:-25%;z-index:0;filter:blur(75px);opacity:.5;background:radial-gradient(32% 32% at 18% 22%,#36488F,transparent 60%),radial-gradient(30% 30% at 84% 26%,#C84739,transparent 60%),radial-gradient(32% 32% at 62% 84%,#00C9A2,transparent 62%);animation:drift 18s ease-in-out infinite alternate}
        @keyframes drift{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(1%,-4%,0) scale(1.12)}}
        .card{transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s}
        .card:hover{transform:translateY(-6px);box-shadow:0 30px 60px -28px rgba(30,34,48,.45)}
        .reveal{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
        .reveal.in{opacity:1;transform:none}
        .load{opacity:0;transform:translateY(16px);animation:rise .9s cubic-bezier(.2,.7,.2,1) forwards}
        @keyframes rise{to{opacity:1;transform:none}}
        .mga input::placeholder{color:rgba(255,255,255,.5)}
        @media (prefers-reduced-motion: reduce){.hero-glow{animation:none}}
      `}} />

      <div className="mga">
        {/* NAV */}
        <nav className="fixed top-0 inset-x-0 z-40 navbg border-b bd">
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="#top" className="flex items-center"><img src="/mga-logo.png" alt="MyGrowth Academy" className="h-7 w-auto" /></a>
            <div className="hidden md:flex items-center gap-8 text-[14px] font-medium c-muted">
              <a href="#why" className="hover:text-navy transition-colors">Why it sticks</a>
              <a href="#work" className="hover:text-navy transition-colors">How it works</a>
              <a href="#results" className="hover:text-navy transition-colors">Results</a>
            </div>
            <a href={TYPEFORM} className="btnterra font-semibold text-[13px] md:text-[14px] px-5 py-2.5 rounded-full">Get my Money Selfie →</a>
          </div>
        </nav>

        {/* HERO */}
        <header id="top" className="hero pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="hero-glow" />
          <div className="relative max-w-6xl mx-auto px-5 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
            <div className="md:col-span-7">
              <p className="load inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.18em] uppercase c-jade mb-6 rounded-full px-4 py-1.5" style={{ background: 'rgba(0,201,162,.12)', animationDelay: '.05s' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00C9A2' }} />We&apos;ve been where you are
              </p>
              <h1 className="load fd text-white leading-[1.02] tracking-[-0.01em] text-[2.7rem] sm:text-6xl md:text-[4.7rem] mb-6" style={{ animationDelay: '.12s' }}>
                You&apos;re doing everything right.<br /><span className="c-terra">So why are you still stuck?</span>
              </h1>
              <p className="load text-white/70 text-[17px] md:text-xl leading-relaxed max-w-xl mb-8" style={{ animationDelay: '.22s' }}>
                You fix one part of your life and another quietly falls apart. You&apos;re busier than ever, and somehow in the exact same place. There&apos;s a reason for that, and it&apos;s fixable.
              </p>
              <div className="load flex flex-col sm:flex-row sm:items-center gap-4" style={{ animationDelay: '.3s' }}>
                <a href={TYPEFORM} className="btnterra inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 rounded-full w-full sm:w-auto" style={{ boxShadow: '0 16px 40px -12px rgba(200,71,57,.6)' }}>
                  Get my free Money Selfie <span>→</span>
                </a>
                <span className="text-[13px] text-white/55 text-center sm:text-left">Free · Instant results · No credit card</span>
              </div>
              <p className="load mt-7 text-[11px] tracking-[0.16em] uppercase text-white/45" style={{ animationDelay: '.36s' }}>Real people · Real numbers · No stock photos</p>
            </div>

            <div className="load md:col-span-5" style={{ animationDelay: '.44s' }}>
              <div className="bgcard rounded-3xl p-7 md:p-8" style={{ boxShadow: '0 40px 80px -30px rgba(0,0,0,.55)' }}>
                <p className="text-[11px] tracking-[0.18em] uppercase c-muted mb-6">What we work on, together</p>
                <ol className="space-y-5">
                  <li className="flex items-baseline gap-4"><span className="fd text-3xl c-blue leading-none">01</span><span><span className="font-bold c-navy text-lg">Your income</span><span className="block text-[15px] c-muted">earn more without trading every hour</span></span></li>
                  <li className="h-px bd border-t" />
                  <li className="flex items-baseline gap-4"><span className="fd text-3xl c-terra leading-none">02</span><span><span className="font-bold c-navy text-lg">Your energy</span><span className="block text-[15px] c-muted">stop running on empty</span></span></li>
                  <li className="h-px bd border-t" />
                  <li className="flex items-baseline gap-4"><span className="fd text-3xl c-jade leading-none">03</span><span><span className="font-bold c-navy text-lg">Your direction</span><span className="block text-[15px] c-muted">cut the noise, do what matters</span></span></li>
                </ol>
                <div className="mt-7 pt-6 border-t bd text-[15px] c-ink70 leading-relaxed">
                  It starts with your money, the floor everything else stands on. Your <span className="c-blue font-semibold">Money Selfie</span> shows you where it&apos;s going in 8 minutes.
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* TEASER */}
        <section className="bgnavy">
          <div className="max-w-4xl mx-auto px-5 py-10 md:py-12 reveal text-center">
            <p className="fd text-2xl md:text-3xl text-white leading-snug">&ldquo;I set up one automatic transfer the day my paycheck hit, before I could touch it. That one change started everything.&rdquo;</p>
            <p className="mt-4 text-[14px] tracking-wide text-white/60"><span className="c-jade font-bold">James</span> · $53K to $130K</p>
          </div>
        </section>

        {/* WHY */}
        <section id="why" className="py-16 md:py-28 bgcard">
          <div className="max-w-3xl mx-auto px-5">
            <p className="reveal text-[12px] font-bold tracking-[0.18em] uppercase c-blue mb-5">Why none of it sticks</p>
            <h2 className="reveal fd c-navy text-4xl md:text-6xl leading-[1.05] mb-8">You&apos;re not failing.<br />You&apos;re scattered.</h2>
            <div className="reveal space-y-6 text-[18px] md:text-xl leading-[1.7] c-ink80 max-w-[60ch]">
              <p>You&apos;re not stuck because you&apos;re lazy. You&apos;re working hard. You buy the course, you start the diet, you wake up at 5am, and it feels like progress.</p>
              <p>Then life gets busy, you ease off for a week, and it all slips away. Not because you&apos;re weak. Because none of it was holding anything else up.</p>
            </div>
            <blockquote className="reveal my-12 border-l-4 pl-6" style={{ borderColor: '#C84739' }}>
              <p className="fd text-3xl md:text-5xl c-navy leading-[1.12]">&ldquo;A pile of bricks isn&apos;t a house. A pile of habits isn&apos;t a life.&rdquo;</p>
            </blockquote>
            <p className="reveal text-[18px] md:text-xl leading-[1.7] c-ink80 max-w-[60ch]">You&apos;re running as hard as you can, and staying in the exact same spot. The fix isn&apos;t more effort. It&apos;s putting the pieces in an order that holds.</p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="work" className="py-16 md:py-28 bgtint">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal max-w-2xl mb-10 md:mb-14">
              <p className="text-[12px] font-bold tracking-[0.18em] uppercase c-blue mb-5">How it works</p>
              <h2 className="fd c-navy text-3xl md:text-5xl leading-[1.06] mb-4">We work on three things, together.</h2>
              <p className="c-ink70 text-[17px] md:text-lg leading-relaxed">Not a course you watch once and forget. The three things that quietly decide how far you get, worked one at a time, with you.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="reveal card bgcard rounded-3xl p-7 border-t-4" style={{ borderColor: '#36488F' }}>
                <span className="fd text-5xl c-blue leading-none">01</span>
                <h3 className="fd c-navy text-2xl mt-4 mb-3">Your income</h3>
                <p className="c-ink70 text-[16px] md:text-[17px] leading-relaxed">Stop trading every hour for dollars. Build skills that earn more without eating your whole life.</p>
              </div>
              <div className="reveal card bgcard rounded-3xl p-7 border-t-4" style={{ borderColor: '#C84739' }}>
                <span className="fd text-5xl c-terra leading-none">02</span>
                <h3 className="fd c-navy text-2xl mt-4 mb-3">Your energy</h3>
                <p className="c-ink70 text-[16px] md:text-[17px] leading-relaxed">Stop running on empty. Get your energy back, so you&apos;re not too wiped out to use the rest.</p>
              </div>
              <div className="reveal card bgcard rounded-3xl p-7 border-t-4" style={{ borderColor: '#00C9A2' }}>
                <span className="fd text-5xl c-jade leading-none">03</span>
                <h3 className="fd c-navy text-2xl mt-4 mb-3">Your direction</h3>
                <p className="c-ink70 text-[16px] md:text-[17px] leading-relaxed">Stop guessing what&apos;s next. Cut the noise, so the few things that matter actually get done.</p>
              </div>
            </div>
            <p className="reveal text-center fd text-2xl md:text-4xl c-navy mt-12 leading-tight">We don&apos;t pile more onto your plate. We help you clear it.</p>
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="py-16 md:py-28 bgcard">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal max-w-2xl mb-10 md:mb-14">
              <p className="text-[12px] font-bold tracking-[0.18em] uppercase c-blue mb-5">Real results</p>
              <h2 className="fd c-navy text-3xl md:text-5xl leading-[1.06]">Real people. Real numbers.</h2>
              <p className="c-muted text-[16px] mt-3">No stock photos. No invented quotes.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="reveal"><div className="flex items-baseline gap-3 mb-3 flex-wrap"><span className="fd text-3xl c-navy">James</span><span className="c-jade text-[14px] font-bold">$53K → $130K</span></div><p className="text-[18px] leading-[1.65] c-ink80">&ldquo;One automatic transfer the day my paycheck hit, before I could touch it. That started everything.&rdquo;</p></div>
              <div className="reveal"><div className="flex items-baseline gap-3 mb-3 flex-wrap"><span className="fd text-3xl c-navy">Victor</span><span className="c-jade text-[14px] font-bold">Income tripled</span></div><p className="text-[18px] leading-[1.65] c-ink80">&ldquo;Machine operator. No degree. Zero savings. I wasn&apos;t looking for inspiration. I was looking for a system.&rdquo;</p></div>
              <div className="reveal"><div className="flex items-baseline gap-3 mb-3 flex-wrap"><span className="fd text-3xl c-navy">Jason</span><span className="c-jade text-[14px] font-bold">Debt gone · +39%</span></div><p className="text-[18px] leading-[1.65] c-ink80">&ldquo;Four years after getting a real system: no debt, income up thirty-nine percent.&rdquo;</p></div>
              <div className="reveal"><div className="flex items-baseline gap-3 mb-3 flex-wrap"><span className="fd text-3xl c-navy">George</span><span className="c-jade text-[14px] font-bold">300% in 3 yrs</span></div><p className="text-[18px] leading-[1.65] c-ink80">&ldquo;Grew up hearing money doesn&apos;t grow on trees. I walk into work differently now.&rdquo;</p></div>
            </div>
            <p className="reveal c-muted text-[14px] mt-12 leading-relaxed">None of them started ahead of you. Every one began right where you are, with one honest look. <span className="opacity-70">Results vary; outcomes depend on effort and consistency.</span></p>
          </div>
        </section>

        {/* WHO */}
        <section className="py-16 md:py-28 bgnavy text-white">
          <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="reveal md:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/founders-broad.jpg" alt="Kanth and Shaku, founders of MyGrowth Academy" width={880} height={1100} loading="lazy" className="w-full h-auto rounded-3xl" style={{ boxShadow: '0 30px 60px -28px rgba(0,0,0,.6)', border: '1px solid rgba(255,255,255,.12)' }} />
            </div>
            <div className="reveal md:col-span-7">
              <p className="text-[12px] font-bold tracking-[0.18em] uppercase c-jade mb-5">Who we are</p>
              <h2 className="fd text-4xl md:text-6xl leading-[1.06] mb-7">We didn&apos;t learn this from a book.</h2>
              <p className="text-[18px] md:text-xl leading-[1.7] text-white/75 max-w-[58ch]">Kanth and Shaku spent 30 years building this in their own lives first: the income, the energy, the direction. We teach it because we&apos;ve watched it change people we care about, and we&apos;ve never gotten tired of seeing it happen.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bgcard">
          <div className="max-w-3xl mx-auto px-5">
            <p className="reveal text-[12px] font-bold tracking-[0.18em] uppercase c-blue mb-8">Questions</p>
            <div>
              <div className="reveal py-6 border-t bd"><h3 className="fd c-navy text-xl md:text-2xl mb-2">Is it really free?</h3><p className="c-ink70 text-[17px] leading-relaxed">Yes. 8 minutes, no card, no catch.</p></div>
              <div className="reveal py-6 border-t bd"><h3 className="fd c-navy text-xl md:text-2xl mb-2">What do I get at the end?</h3><p className="c-ink70 text-[17px] leading-relaxed">A clear read on where your money is going, your biggest leaks ranked, and the first fix to make this week.</p></div>
              <div className="reveal py-6 border-t border-b bd"><h3 className="fd c-navy text-xl md:text-2xl mb-2">Is this just more self-help?</h3><p className="c-ink70 text-[17px] leading-relaxed">No. No motivation speeches, no fluff. One honest look and one concrete next step.</p></div>
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section id="start" className="py-20 md:py-36 bgnavy text-white text-center relative overflow-hidden">
          <div className="hero-glow" style={{ opacity: .35 }} />
          <div className="relative max-w-2xl mx-auto px-5">
            <h2 className="reveal fd text-4xl md:text-6xl leading-[1.05] mb-7">Stop pushing harder. There&apos;s a way through, and it&apos;s <span className="c-terra">simpler</span> than you think.</h2>
            <p className="reveal text-white/70 text-[18px] md:text-xl mb-9">Get your free Money Selfie and see exactly where to start.</p>
            <a href={TYPEFORM} className="reveal btnterra inline-flex items-center justify-center gap-2 font-semibold text-base px-9 py-5 rounded-full w-full sm:w-auto" style={{ boxShadow: '0 18px 50px -12px rgba(200,71,57,.6)' }}>Get my free Money Selfie <span>→</span></a>
            <p className="reveal text-white/45 text-[13px] mt-6">Free · Instant results · No credit card</p>
          </div>
        </section>

        <footer className="text-white/40 py-10" style={{ background: '#1A2031' }}>
          <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-5 text-[13px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mga-logo.png" alt="MyGrowth Academy" className="h-7 w-auto" />
            <div className="flex flex-wrap justify-center gap-5 font-medium">
              <a href="https://www.instagram.com/mygrowth.academy" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">Instagram</a>
              <a href="https://www.tiktok.com/@mygrowth.academy" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">TikTok</a>
              <a href="https://www.youtube.com/@mygrowth.academy" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">YouTube</a>
              <a href="https://www.linkedin.com/in/shakumiriyala/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">LinkedIn</a>
              <a href="https://www.facebook.com/mygrowth.academy" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">Facebook</a>
            </div>
            <a href={TYPEFORM} className="c-terra font-semibold">Get my Money Selfie →</a>
          </div>
          <p className="max-w-5xl mx-auto px-5 mt-7 pt-6 border-t border-white/5 text-[11px] text-white/25 text-center">© 2026 MyGrowth.Academy · Not financial advice. Results vary. Individual outcomes depend on effort and consistency.</p>
        </footer>

        <div className="h-44 md:h-24" />

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
