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
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,600;6..12,700;6..12,800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        :root{--navy:#272F4F;--blue:#36488F;--terra:#C84739;--terraDark:#A63A2F;--jade:#00C9A2;--ink:#33312C;--muted:#8A7F70;--cream:#FBF5EC;--sand:#F2E9DA}
        .mga{font-family:'Nunito Sans',sans-serif;background:var(--cream);color:var(--ink);-webkit-font-smoothing:antialiased}
        .mga ::selection{background:var(--terra);color:var(--cream)}
        .fd{font-family:'Fraunces',serif}
        .c-navy{color:var(--navy)}.c-blue{color:var(--blue)}.c-terra{color:var(--terra)}.c-jade{color:var(--jade)}.c-muted{color:var(--muted)}
        .c-ink70{color:rgba(51,49,44,.72)}.c-ink75{color:rgba(51,49,44,.78)}.c-ink80{color:rgba(51,49,44,.82)}.c-muted70{color:rgba(138,127,112,.7)}
        .bgnavy{background:var(--navy)}.bgcream{background:var(--cream)}.bgcard{background:#FFFCF7}.bgsand{background:var(--sand)}.bgsand50{background:rgba(242,233,218,.5)}.bgsand70{background:rgba(242,233,218,.7)}
        .tcream{color:var(--cream)}.tcream55{color:rgba(251,245,236,.55)}.tcream70{color:rgba(251,245,236,.72)}.tcream75{color:rgba(251,245,236,.78)}.tcream80{color:rgba(251,245,236,.85)}.tcream40{color:rgba(251,245,236,.42)}.tcream25{color:rgba(251,245,236,.28)}
        .btnterra{background:var(--terra);color:var(--cream);transition:background .2s,gap .2s}.btnterra:hover{background:var(--terraDark)}
        .navbg{background:rgba(251,245,236,.85);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
        .pill-blue{background:rgba(54,72,143,.08)}
        .bd5{border-color:rgba(51,49,44,.06)}.bd8{border-color:rgba(51,49,44,.09)}
        .jadebox{border:1px solid rgba(0,201,162,.3);background:rgba(0,201,162,.06)}
        .soft{box-shadow:0 24px 60px -34px rgba(51,49,44,.35)}
        .squiggle{display:inline-block;position:relative}
        .squiggle svg{position:absolute;left:0;bottom:-.42em;width:100%;height:.4em;overflow:visible}
        .reveal{opacity:0;transform:translateY(20px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
        .reveal.in{opacity:1;transform:none}
        .load{opacity:0;transform:translateY(14px);animation:mgarise .9s cubic-bezier(.2,.7,.2,1) forwards}
        @keyframes mgarise{to{opacity:1;transform:none}}
        .mga input::placeholder{color:rgba(255,255,255,.5)}
      `}} />

      <div className="mga">
        <nav className="fixed top-0 inset-x-0 z-40 navbg border-b bd5">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="#top" className="flex items-center"><img src="/mga-logo.png" alt="MyGrowth Academy" className="h-7 w-auto" /></a>
            <div className="hidden md:flex items-center gap-8 text-[14px] font-semibold c-muted">
              <a href="#why" className="hover:opacity-70 transition-opacity">Why it fails</a>
              <a href="#works" className="hover:opacity-70 transition-opacity">What works</a>
              <a href="#results" className="hover:opacity-70 transition-opacity">Results</a>
              <a href={TYPEFORM} className="c-terra">Get my Money Selfie →</a>
            </div>
          </div>
        </nav>

        <header id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(800px 480px at 80% 0%, #F6ECDB 0%, #FBF5EC 60%)' }} />
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="load inline-flex items-center gap-2 text-[13px] font-bold tracking-wide c-blue mb-6 pill-blue rounded-full px-4 py-1.5" style={{ animationDelay: '.05s' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00C9A2' }} />We tried budgeting too
              </p>
              <h1 className="load fd c-navy text-5xl md:text-[4.5rem] leading-[1.03] tracking-[-0.01em] mb-7" style={{ animationDelay: '.12s' }}>
                You keep trying to budget. It keeps <span className="squiggle c-terra italic">falling apart<svg viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M2 8 Q 50 2 100 7 T 198 6" fill="none" stroke="#C84739" strokeWidth="3" strokeLinecap="round" /></svg></span>.
              </h1>
              <p className="load max-w-md text-lg c-ink75 leading-relaxed mb-8" style={{ animationDelay: '.22s' }}>
                We built the spreadsheet, tracked every dollar, and gave up by Friday. You didn&apos;t fail. The method did, and that&apos;s fixable.
              </p>
              <div className="load flex flex-col sm:flex-row sm:items-center gap-4" style={{ animationDelay: '.3s' }}>
                <a href={TYPEFORM} className="btnterra inline-flex items-center gap-2 font-bold text-[15px] px-7 py-4 rounded-full hover:gap-3 soft">Get my free Money Selfie <span>→</span></a>
                <span className="text-[13px] c-muted">Free · 8 minutes · No credit card</span>
              </div>
              <p className="load mt-7 text-[12px] tracking-[0.12em] uppercase c-muted70" style={{ animationDelay: '.36s' }}>Real people · Real numbers · No stock photos</p>
            </div>
            <div className="load md:col-span-5" style={{ animationDelay: '.44s' }}>
              <div className="bgcard rounded-[28px] border bd5 soft p-8 relative">
                <span className="absolute -top-3 left-7 text-[11px] font-extrabold tracking-wide px-3 py-1 rounded-full" style={{ background: '#00C9A2', color: '#272F4F' }}>A REAL RESULT</span>
                <div className="fd text-5xl font-semibold c-navy mt-2 mb-3">$50,000</div>
                <p className="c-ink70 text-[15px] leading-relaxed">The house deposit John &amp; Sarah hit on autopilot, from one transfer they never had to think about again.</p>
                <div className="h-px my-6" style={{ background: 'rgba(51,49,44,.09)' }} />
                <p className="c-muted text-[14px] italic font-light">&ldquo;The best part was the week after, when I stopped feeling like I was forgetting something.&rdquo;</p>
              </div>
            </div>
          </div>
        </header>

        <section className="reveal max-w-3xl mx-auto px-6 pb-4">
          <div className="bgcard rounded-[24px] border bd5 soft p-7">
            <p className="fd text-xl md:text-2xl c-navy leading-snug">&ldquo;I set up one automatic transfer the day my paycheck hit, before I could touch it. That one change started everything.&rdquo;</p>
            <p className="mt-3 text-[13px] c-muted"><span className="c-jade font-bold">James</span> · $53K to $130K</p>
          </div>
        </section>

        <section id="why" className="py-24 md:py-32">
          <div className="max-w-2xl mx-auto px-6">
            <p className="reveal text-[12px] font-extrabold tracking-[0.16em] uppercase c-blue mb-5">Why it never sticks</p>
            <h2 className="reveal fd c-navy text-4xl md:text-5xl leading-[1.1] mb-9">It runs on willpower.<br />Willpower runs out.</h2>
            <div className="reveal space-y-6 text-[18px] leading-[1.75] c-ink80">
              <p>Budgeting asks you to track every dollar and stay perfect forever. For a small handful of people that works, and if that&apos;s you, wonderful, keep going. For most of us it&apos;s just exhausting.</p>
              <p>We lived it. We made a beautiful spreadsheet and tracked every expense. Three days in it was already draining. By day six we said forget it. It changed nothing.</p>
            </div>
            <div className="reveal my-12 bgsand70 rounded-[24px] p-9">
              <p className="fd text-2xl md:text-3xl c-navy leading-snug italic">&ldquo;It&apos;s not that you&apos;re bad with money. The plan was just impossible to keep.&rdquo;</p>
            </div>
            <p className="reveal text-[18px] leading-[1.75] c-ink80">If a money plan needs willpower every single day, it won&apos;t last. That isn&apos;t a discipline problem. It&apos;s a design problem, and design problems have fixes.</p>
          </div>
        </section>

        <section id="works" className="py-24 md:py-32 bgnavy tcream">
          <div className="max-w-2xl mx-auto px-6">
            <p className="reveal text-[12px] font-extrabold tracking-[0.16em] uppercase c-jade mb-5">What works instead</p>
            <h2 className="reveal fd text-4xl md:text-5xl leading-[1.1] mb-9">A system that runs without you.</h2>
            <div className="reveal space-y-6 text-[18px] leading-[1.75] tcream75">
              <p>So we stopped budgeting and did something simpler. The money got split up at the start of the month, and one automatic transfer ran in the background whether we remembered it or not. No tracking. No guilt. No willpower.</p>
              <p>The system carried it, so we didn&apos;t have to. That&apos;s the whole secret. You don&apos;t need more discipline. You need something that holds on its own.</p>
            </div>
            <div className="reveal mt-10 rounded-[24px] jadebox p-7">
              <p className="tcream80 text-[15px] leading-relaxed"><span className="c-jade font-bold">One thing we&apos;ll always tell you straight.</span> This works when you earn more than you spend. If your expenses are bigger than your income, no system fixes that on its own, and your Money Selfie will show you plainly if that&apos;s where you are.</p>
            </div>
          </div>
        </section>

        <section id="results" className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="reveal mb-14">
              <p className="text-[12px] font-extrabold tracking-[0.16em] uppercase c-blue mb-5">Real results</p>
              <h2 className="fd c-navy text-4xl md:text-5xl leading-[1.08]">Real people. Real numbers.</h2>
              <p className="c-muted mt-3">No stock photos. No invented quotes.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="reveal bgcard rounded-[24px] border bd5 soft p-7"><div className="flex items-baseline justify-between mb-3"><span className="fd text-2xl c-navy font-semibold">James</span><span className="c-jade font-extrabold text-[14px]">$53K→$130K</span></div><p className="c-ink75 leading-relaxed">&ldquo;One automatic transfer the day my paycheck hit, before I could touch it. That started everything.&rdquo;</p></div>
              <div className="reveal bgcard rounded-[24px] border bd5 soft p-7"><div className="flex items-baseline justify-between mb-3"><span className="fd text-2xl c-navy font-semibold">Jason</span><span className="c-jade font-extrabold text-[14px]">Debt gone</span></div><p className="c-ink75 leading-relaxed">&ldquo;Four years after getting a real system: no debt, income up thirty-nine percent.&rdquo;</p></div>
              <div className="reveal bgcard rounded-[24px] border bd5 soft p-7"><div className="flex items-baseline justify-between mb-3"><span className="fd text-2xl c-navy font-semibold">Victor</span><span className="c-jade font-extrabold text-[14px]">Income x3</span></div><p className="c-ink75 leading-relaxed">&ldquo;Machine operator. No degree. Zero savings. I wasn&apos;t looking for inspiration. I was looking for a system.&rdquo;</p></div>
              <div className="reveal bgcard rounded-[24px] border bd5 soft p-7"><div className="flex items-baseline justify-between mb-3"><span className="fd text-2xl c-navy font-semibold">George</span><span className="c-jade font-extrabold text-[14px]">+300% / 3yr</span></div><p className="c-ink75 leading-relaxed">&ldquo;Grew up hearing money doesn&apos;t grow on trees. I walk into work differently now.&rdquo;</p></div>
            </div>
            <p className="reveal c-muted text-[13px] mt-10">None of them started ahead of you. Each began with one honest look at their money. <span className="opacity-60">Results vary; outcomes depend on effort and consistency.</span></p>
          </div>
        </section>

        <section className="py-24 md:py-28 bgsand50">
          <div className="max-w-2xl mx-auto px-6 reveal">
            <p className="text-[12px] font-extrabold tracking-[0.16em] uppercase c-blue mb-5">Who we are</p>
            <h2 className="fd c-navy text-4xl md:text-5xl leading-[1.1] mb-6">We didn&apos;t read this in a book.</h2>
            <p className="text-[18px] leading-[1.75] c-ink80">Kanth and Shaku spent 30 years getting their own money right, the hard way, through the same mistakes you&apos;re making now. We teach what worked, plainly, because we&apos;ve watched it change people we care about and we never get tired of seeing it happen.</p>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="max-w-2xl mx-auto px-6">
            <p className="reveal text-[12px] font-extrabold tracking-[0.16em] uppercase c-blue mb-8">Questions</p>
            <div className="space-y-4">
              <div className="reveal bgcard rounded-2xl border bd5 p-6"><h3 className="fd text-lg font-semibold c-navy mb-2">Is it really free?</h3><p className="c-ink70 leading-relaxed">Yes. 8 minutes, no card, no catch. You walk away knowing where your money goes, your biggest leaks, and your first move.</p></div>
              <div className="reveal bgcard rounded-2xl border bd5 p-6"><h3 className="fd text-lg font-semibold c-navy mb-2">Is this just another budgeting app?</h3><p className="c-ink70 leading-relaxed">No, the opposite. Apps make you track every dollar and lean on willpower. We help you set up something that runs without the daily tracking.</p></div>
              <div className="reveal bgcard rounded-2xl border bd5 p-6"><h3 className="fd text-lg font-semibold c-navy mb-2">What if I just don&apos;t earn enough?</h3><p className="c-ink70 leading-relaxed">Then we&apos;ll tell you that honestly. Your Money Selfie shows whether it&apos;s a system problem or an income problem, so you stop blaming yourself for the wrong thing.</p></div>
            </div>
          </div>
        </section>

        <section id="start" className="py-28 md:py-40 bgnavy tcream text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p className="reveal tcream55 mb-4">Stop blaming yourself.</p>
            <h2 className="reveal fd text-4xl md:text-6xl leading-[1.06] mb-8">The system was the problem <span className="italic c-terra">all along.</span></h2>
            <p className="reveal tcream70 text-lg mb-10 max-w-md mx-auto">In 8 minutes, your free Money Selfie shows where your money&apos;s going, your biggest leaks ranked, and the first step to take this week.</p>
            <a href={TYPEFORM} className="reveal btnterra inline-flex items-center gap-2 font-bold text-base px-9 py-5 rounded-full hover:gap-3 soft">Get my free Money Selfie <span>→</span></a>
            <p className="reveal tcream40 text-[13px] mt-6">Free · 8 minutes · No credit card</p>
          </div>
        </section>

        <footer className="tcream40 py-10" style={{ background: '#1B2138' }}>
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5 text-[13px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mga-logo.png" alt="MyGrowth Academy" className="h-7 w-auto" />
            <div className="flex gap-5 font-semibold"><a href="#" className="hover:tcream80">Instagram</a><a href="#" className="hover:tcream80">TikTok</a><a href="#" className="hover:tcream80">YouTube</a><a href="#" className="hover:tcream80">LinkedIn</a></div>
            <a href={TYPEFORM} className="c-terra font-bold">Get my Money Selfie →</a>
          </div>
          <p className="max-w-4xl mx-auto px-6 mt-7 pt-6 border-t border-white/5 text-[11px] tcream25 text-center">© 2025 MyGrowth.Academy · Not financial advice. Results vary. Individual outcomes depend on effort and consistency.</p>
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
