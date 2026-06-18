'use client';

import { useEffect, useState } from 'react';

const TYPEFORM = 'https://form.typeform.com/to/S6qSbgTP';

export default function Page() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
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

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        :root{--navy:#272F4F;--blue:#36488F;--terra:#C84739;--terraDark:#A63A2F;--jade:#00C9A2;--ink:#1E2230;--muted:#71768A;--appbg:#F4F6FB}
        .mga{font-family:'Schibsted Grotesk',sans-serif;background:var(--appbg);color:var(--ink);-webkit-font-smoothing:antialiased}
        .mga ::selection{background:var(--blue);color:#fff}
        .fd{font-family:'DM Serif Display',serif}
        .c-navy{color:var(--navy)}.c-blue{color:var(--blue)}.c-terra{color:var(--terra)}.c-jade{color:var(--jade)}.c-muted{color:var(--muted)}
        .c-ink70{color:rgba(30,34,48,.7)}.c-ink75{color:rgba(30,34,48,.75)}.c-ink80{color:rgba(30,34,48,.8)}.c-muted70{color:rgba(113,118,138,.7)}
        .bgnavy{background:var(--navy)}.bgcard{background:#fff}.bgwhite50{background:rgba(255,255,255,.5)}
        .btnterra{background:var(--terra);color:#fff;transition:background .2s,gap .2s}.btnterra:hover{background:var(--terraDark)}
        .navbg{background:rgba(244,246,251,.8);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
        .bd5{border-color:rgba(39,47,79,.05)}.bd8{border-color:rgba(39,47,79,.08)}.bd10{border-color:rgba(39,47,79,.10)}
        .hair{height:1px;background:rgba(39,47,79,.12)}
        .reveal{opacity:0;transform:translateY(20px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
        .reveal.in{opacity:1;transform:none}
        .load{opacity:0;transform:translateY(14px);animation:mgarise .9s cubic-bezier(.2,.7,.2,1) forwards}
        @keyframes mgarise{to{opacity:1;transform:none}}
        .mga input::placeholder{color:rgba(255,255,255,.5)}
      `}} />

      <div className="mga">
        <nav className="fixed top-0 inset-x-0 z-40 navbg border-b bd5">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="#top" className="flex items-center"><img src="/mga-logo.png" alt="MyGrowth Academy" className="h-7 w-auto" /></a>
            <div className="hidden md:flex items-center gap-8 text-[13px] font-medium c-muted">
              <a href="#why" className="hover:opacity-70 transition-opacity">Why it sticks</a>
              <a href="#work" className="hover:opacity-70 transition-opacity">How it works</a>
              <a href="#results" className="hover:opacity-70 transition-opacity">Results</a>
              <a href={TYPEFORM} className="c-terra font-semibold">Get my Money Selfie →</a>
            </div>
          </div>
        </nav>

        <header id="top" className="relative pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(900px 500px at 85% 0%, #E9EDF7 0%, #F4F6FB 60%)' }} />
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-14 items-end">
            <div className="md:col-span-7">
              <p className="load text-[12px] font-semibold tracking-[0.24em] uppercase c-blue mb-8" style={{ animationDelay: '.05s' }}>We&apos;ve been where you are</p>
              <h1 className="load fd c-navy text-5xl md:text-[4.6rem] leading-[1.04] tracking-[-0.01em] mb-8" style={{ animationDelay: '.12s' }}>
                You&apos;re doing everything right.<br /><span className="c-terra">So why are you still stuck?</span>
              </h1>
              <p className="load max-w-lg text-lg c-ink70 font-light leading-relaxed mb-9" style={{ animationDelay: '.22s' }}>
                You fix one part of your life and another quietly falls apart. You&apos;re busier than ever, and somehow in the exact same place. There&apos;s a reason for that, and it&apos;s fixable.
              </p>
              <div className="load flex flex-col sm:flex-row sm:items-center gap-4" style={{ animationDelay: '.3s' }}>
                <a href={TYPEFORM} className="btnterra inline-flex items-center gap-2 font-semibold text-[15px] px-7 py-4 rounded-full hover:gap-3" style={{ boxShadow: '0 12px 30px -10px rgba(200,71,57,.55)' }}>
                  Get my free Money Selfie <span>→</span>
                </a>
                <span className="text-[13px] c-muted">Free · Instant results · No credit card</span>
              </div>
              <p className="load mt-7 text-[11px] tracking-[0.18em] uppercase c-muted70" style={{ animationDelay: '.36s' }}>Real people · Real numbers · No stock photos</p>
            </div>
            <div className="load md:col-span-5" style={{ animationDelay: '.44s' }}>
              <div className="bgcard rounded-2xl border bd5 p-8" style={{ boxShadow: '0 30px 60px -30px rgba(39,47,79,.3)' }}>
                <p className="text-[11px] tracking-[0.2em] uppercase c-muted mb-6">What we work on, together</p>
                <ol className="space-y-5">
                  <li className="flex items-baseline gap-4"><span className="fd text-2xl c-blue">01</span><span><span className="font-semibold c-navy">Your income</span><span className="block text-[14px] c-muted font-light">earn more without trading every hour</span></span></li>
                  <li className="hair" />
                  <li className="flex items-baseline gap-4"><span className="fd text-2xl c-blue">02</span><span><span className="font-semibold c-navy">Your energy</span><span className="block text-[14px] c-muted font-light">stop running on empty</span></span></li>
                  <li className="hair" />
                  <li className="flex items-baseline gap-4"><span className="fd text-2xl c-blue">03</span><span><span className="font-semibold c-navy">Your direction</span><span className="block text-[14px] c-muted font-light">cut the noise, do what matters</span></span></li>
                </ol>
                <div className="mt-7 pt-6 border-t bd8 text-[14px] c-ink70 font-light leading-relaxed">
                  It starts with your money, the floor everything else stands on. Your <span className="c-blue font-medium">Money Selfie</span> shows you where it&apos;s going in 8 minutes.
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="border-y bd8 bgwhite50">
          <div className="max-w-4xl mx-auto px-6 py-9 reveal">
            <p className="fd text-xl md:text-2xl c-navy leading-snug">&ldquo;I set up one automatic transfer the day my paycheck hit, before I could touch it. That one change started everything.&rdquo;</p>
            <p className="mt-3 text-[13px] tracking-wide c-muted"><span className="c-jade font-semibold">James</span> · $53K to $130K</p>
          </div>
        </section>

        <section id="why" className="py-28 md:py-36">
          <div className="max-w-3xl mx-auto px-6">
            <p className="reveal text-[12px] font-semibold tracking-[0.2em] uppercase c-blue mb-6">Why none of it sticks</p>
            <h2 className="reveal fd c-navy text-4xl md:text-5xl leading-[1.08] mb-10">You&apos;re not failing.<br />You&apos;re scattered.</h2>
            <div className="reveal space-y-6 text-[17px] leading-[1.75] c-ink80 font-light max-w-[60ch]">
              <p>You&apos;re not stuck because you&apos;re lazy. You&apos;re working hard. You buy the course, you start the diet, you wake up at 5am, and it feels like progress.</p>
              <p>Then life gets busy, you ease off for a week, and it all slips away. Not because you&apos;re weak. Because none of it was holding anything else up.</p>
            </div>
            <blockquote className="reveal my-14">
              <div className="hair mb-10" />
              <p className="fd text-3xl md:text-4xl c-navy leading-[1.2] max-w-2xl">&ldquo;A pile of bricks isn&apos;t a house. A pile of habits isn&apos;t a life.&rdquo;</p>
              <div className="hair mt-10" />
            </blockquote>
            <p className="reveal text-[17px] leading-[1.75] c-ink80 font-light max-w-[60ch]">You&apos;re running as hard as you can, and staying in the exact same spot. The fix isn&apos;t more effort. It&apos;s putting the pieces in an order that holds.</p>
          </div>
        </section>

        <section id="work" className="py-28 md:py-36 bgnavy text-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="reveal max-w-2xl mb-16">
              <p className="text-[12px] font-semibold tracking-[0.2em] uppercase c-jade mb-6">How it works</p>
              <h2 className="fd text-4xl md:text-5xl leading-[1.08] mb-5">We work on three things, together.</h2>
              <p className="text-white/60 font-light text-[16px] leading-relaxed">Not a course you watch once and forget. The three things that quietly decide how far you get, worked one at a time, with you.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
              <div className="reveal bgnavy p-8"><span className="fd text-3xl c-blue">01</span><h3 className="font-semibold text-xl mt-4 mb-2">Your income</h3><p className="text-white/60 font-light text-[15px] leading-relaxed">Stop trading every hour for dollars. Build skills that earn more without eating your whole life.</p></div>
              <div className="reveal bgnavy p-8"><span className="fd text-3xl c-terra">02</span><h3 className="font-semibold text-xl mt-4 mb-2">Your energy</h3><p className="text-white/60 font-light text-[15px] leading-relaxed">Stop running on empty. Get your energy back, so you&apos;re not too wiped out to use the rest.</p></div>
              <div className="reveal bgnavy p-8"><span className="fd text-3xl c-jade">03</span><h3 className="font-semibold text-xl mt-4 mb-2">Your direction</h3><p className="text-white/60 font-light text-[15px] leading-relaxed">Stop guessing what&apos;s next. Cut the noise, so the few things that matter actually get done.</p></div>
            </div>
            <p className="reveal text-center fd text-2xl md:text-3xl mt-14 text-white/90">We don&apos;t pile more onto your plate. We help you clear it.</p>
          </div>
        </section>

        <section id="results" className="py-28 md:py-36">
          <div className="max-w-5xl mx-auto px-6">
            <div className="reveal max-w-2xl mb-16">
              <p className="text-[12px] font-semibold tracking-[0.2em] uppercase c-blue mb-6">Real results</p>
              <h2 className="fd c-navy text-4xl md:text-5xl leading-[1.08]">Real people. Real numbers.</h2>
              <p className="c-muted text-[15px] mt-4 font-light">No stock photos. No invented quotes.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-14 gap-y-12">
              <div className="reveal"><div className="flex items-baseline gap-3 mb-3"><span className="fd text-2xl c-navy">James</span><span className="c-jade text-[13px] font-semibold">$53K → $130K</span></div><p className="text-[17px] leading-[1.7] c-ink75 font-light">&ldquo;One automatic transfer the day my paycheck hit, before I could touch it. That started everything.&rdquo;</p></div>
              <div className="reveal"><div className="flex items-baseline gap-3 mb-3"><span className="fd text-2xl c-navy">Victor</span><span className="c-jade text-[13px] font-semibold">Income tripled</span></div><p className="text-[17px] leading-[1.7] c-ink75 font-light">&ldquo;Machine operator. No degree. Zero savings. I wasn&apos;t looking for inspiration. I was looking for a system.&rdquo;</p></div>
              <div className="reveal"><div className="flex items-baseline gap-3 mb-3"><span className="fd text-2xl c-navy">Jason</span><span className="c-jade text-[13px] font-semibold">Debt gone · +39%</span></div><p className="text-[17px] leading-[1.7] c-ink75 font-light">&ldquo;Four years after getting a real system: no debt, income up thirty-nine percent.&rdquo;</p></div>
              <div className="reveal"><div className="flex items-baseline gap-3 mb-3"><span className="fd text-2xl c-navy">George</span><span className="c-jade text-[13px] font-semibold">300% in 3 yrs</span></div><p className="text-[17px] leading-[1.7] c-ink75 font-light">&ldquo;Grew up hearing money doesn&apos;t grow on trees. I walk into work differently now.&rdquo;</p></div>
            </div>
            <p className="reveal c-muted text-[13px] mt-14 font-light">None of them started ahead of you. Every one began right where you are, with one honest look. <span className="opacity-60">Results vary; outcomes depend on effort and consistency.</span></p>
          </div>
        </section>

        <section className="py-28 md:py-36 bgwhite50 border-y bd8">
          <div className="max-w-3xl mx-auto px-6 reveal">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase c-blue mb-6">Who we are</p>
            <h2 className="fd c-navy text-4xl md:text-5xl leading-[1.1] mb-7">We didn&apos;t learn this from a book.</h2>
            <p className="text-[17px] leading-[1.75] c-ink80 font-light max-w-[58ch]">Kanth and Shaku spent 30 years building this in their own lives first: the income, the energy, the direction. We teach it because we&apos;ve watched it change people we care about, and we&apos;ve never gotten tired of seeing it happen.</p>
          </div>
        </section>

        <section className="py-24 md:py-28">
          <div className="max-w-3xl mx-auto px-6">
            <p className="reveal text-[12px] font-semibold tracking-[0.2em] uppercase c-blue mb-10">Questions</p>
            <div>
              <div className="reveal py-6 border-t bd10"><h3 className="font-semibold c-navy text-lg mb-2">Is it really free?</h3><p className="c-ink70 font-light leading-relaxed">Yes. 8 minutes, no card, no catch.</p></div>
              <div className="reveal py-6 border-t bd10"><h3 className="font-semibold c-navy text-lg mb-2">What do I get at the end?</h3><p className="c-ink70 font-light leading-relaxed">A clear read on where your money is going, your biggest leaks ranked, and the first fix to make this week.</p></div>
              <div className="reveal py-6 border-t border-b bd10"><h3 className="font-semibold c-navy text-lg mb-2">Is this just more self-help?</h3><p className="c-ink70 font-light leading-relaxed">No. No motivation speeches, no fluff. One honest look and one concrete next step.</p></div>
            </div>
          </div>
        </section>

        <section id="start" className="py-28 md:py-40 bgnavy text-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="reveal fd text-4xl md:text-6xl leading-[1.06] mb-7">Stop pushing harder. There&apos;s a way through, and it&apos;s <span className="c-terra">simpler</span> than you think.</h2>
            <p className="reveal text-white/65 text-lg font-light mb-10">Get your free Money Selfie and see exactly where to start.</p>
            <a href={TYPEFORM} className="reveal btnterra inline-flex items-center gap-2 font-semibold text-base px-9 py-5 rounded-full hover:gap-3" style={{ boxShadow: '0 18px 50px -12px rgba(200,71,57,.6)' }}>Get my free Money Selfie <span>→</span></a>
            <p className="reveal text-white/40 text-[13px] mt-6">Free · Instant results · No credit card</p>
          </div>
        </section>

        <footer className="text-white/40 py-10" style={{ background: '#1B2138' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5 text-[13px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mga-logo.png" alt="MyGrowth Academy" className="h-7 w-auto" />
            <div className="flex gap-5 font-medium"><a href="#" className="hover:text-white/80">Instagram</a><a href="#" className="hover:text-white/80">TikTok</a><a href="#" className="hover:text-white/80">YouTube</a><a href="#" className="hover:text-white/80">LinkedIn</a></div>
            <a href={TYPEFORM} className="c-terra font-semibold">Get my Money Selfie →</a>
          </div>
          <p className="max-w-5xl mx-auto px-6 mt-7 pt-6 border-t border-white/5 text-[11px] text-white/25 text-center">© 2025 MyGrowth.Academy · Not financial advice. Results vary. Individual outcomes depend on effort and consistency.</p>
        </footer>

        <div className="h-40 md:h-24" />

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
