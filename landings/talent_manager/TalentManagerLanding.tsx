import { ThemeIconButton } from "../../components/ThemeIconButton";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Handshake,
  Lock,
  Network,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { resetDocumentShell } from "../../lib/resetDocumentShell";
import { applyLandingPageBg } from "../../lib/landingPageBg";
import "./styles.css";

const LANDING_ID = "talent-manager";
const TITLE = "10x Talent's Evolution — Talent-first recruiting";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Manrope:wght@400;500;600;700&display=swap";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { kpi: "1,240+", label: "Vetted operators" },
  { kpi: "86", label: "Partner recruiters" },
  { kpi: "$0", label: "Until you interview" },
  { kpi: "48h", label: "Median first match" },
];

const STEPS = [
  {
    n: "01",
    title: "Verify on WhatsApp",
    body: "One OTP, no password. Your number is your identity. Your data never leaves the platform unsolicited.",
  },
  {
    n: "02",
    title: "Auto-build your profile",
    body: "We import LinkedIn, parse your résumé with AI, and structure your dream job in under a minute.",
  },
  {
    n: "03",
    title: "Approve every intro",
    body: "Recruiters request access. You decide who sees you, when, and what they can offer.",
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-matched, human-vetted",
    body: "Every profile is parsed, enriched and reviewed. Recruiters only see candidates worth their hour.",
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "Your dream job, salary and identity stay hidden until you approve the introduction.",
  },
  {
    icon: Handshake,
    title: "Hire on outcomes",
    body: "Companies pay per interview, not per posting. Recruiters earn a lifetime share of every placement.",
  },
  {
    icon: Network,
    title: "A trusted graph",
    body: "Vouches from former managers and peers carry real weight — and travel with you across roles.",
  },
  {
    icon: Zap,
    title: "Sixty seconds to live",
    body: "WhatsApp OTP, LinkedIn auto-fill, résumé parsing. Your profile is recruiter-ready before your coffee cools.",
  },
  {
    icon: Star,
    title: "Built for senior moves",
    body: "Staff, principal, founding. The roles where fit matters more than funnel volume.",
  },
];

const QUOTES = [
  {
    quote:
      "I went from passive curiosity to a signed offer in eleven days. No spam, no take-homes, no recruiter ghosting.",
    name: "Maya Patel",
    role: "Staff Engineer · ex-Stripe",
  },
  {
    quote:
      "We finally stopped paying for résumés. Three interviews, one hire, zero wasted weekends.",
    name: "Helio Robotics",
    role: "Founding team",
  },
  {
    quote:
      "Best signal-to-noise I've seen as a recruiter in a decade. The talent actually wants to be talked to.",
    name: "Sam Chen",
    role: "Northstar Partners",
  },
];

const HERO_AVATARS = [
  { initials: "MP", bg: "oklch(0.45 0.09 300)" },
  { initials: "AR", bg: "oklch(0.45 0.09 220)" },
  { initials: "SC", bg: "oklch(0.45 0.09 150)" },
  { initials: "DK", bg: "oklch(0.5 0.1 40)" },
];

function useFonts() {
  useEffect(() => {
    const id = "talent-manager-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function TalentManagerLanding() {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    resetDocumentShell();
    applyLandingPageBg(LANDING_ID);
    document.title = TITLE;
    document.documentElement.lang = "en";
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useFonts();

  const heroItem = reduced
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 26 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
        },
      };

  return (
    <div className="talent-manager-root">
      <header className="tm-header">
        <div className="tm-container tm-header-inner">
          <a href="#top" className="tm-brand">
            <span className="tm-brand-mark">X</span>
            <span>
              10x <span className="tm-gold-text">Talent</span>
            </span>
          </a>
          <nav className="tm-nav">
            <a href="#how">How it works</a>
            <a href="#features">Platform</a>
            <a href="#recruiters">For recruiters</a>
            <a href="#companies">For companies</a>
          </nav>
          <a href="#join" className="tm-btn tm-btn--gold">
            Join free <ArrowRight size={15} />
          </a>
          <ThemeIconButton landing="talent-manager" />
        </div>
      </header>

      <section className="tm-hero tm-noise" id="top">
        <motion.div
          className="tm-container tm-hero-grid"
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : "show"}
          variants={
            reduced
              ? undefined
              : {
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                }
          }
        >
          <div className="tm-hero-copy">
            <motion.div {...heroItem} className="tm-hero-badge">
              <span className="tm-hero-badge-dot" />
              <span>Now matching senior operators · EMEA &amp; Americas</span>
            </motion.div>
            <motion.h1 {...heroItem}>
              Where senior talent meets its{" "}
              <span className="tm-gold-text">next 10x</span> move.
            </motion.h1>
            <motion.p {...heroItem} className="tm-hero-sub">
              A private network of staff-level engineers, designers, PMs and
              operators — hand-matched with the founders and recruiters worth
              your time. No spam, no ghosting, no résumé black holes.
            </motion.p>
            <motion.div {...heroItem} className="tm-hero-actions">
              <a href="#join" className="tm-btn tm-btn--gold">
                Create your profile <ArrowRight size={15} />
              </a>
              <a href="#companies" className="tm-btn tm-btn--ghost">
                I'm hiring
              </a>
            </motion.div>
            <motion.div {...heroItem} className="tm-hero-proof">
              <div className="tm-avatars">
                {HERO_AVATARS.map((a) => (
                  <span
                    key={a.initials}
                    className="tm-avatar"
                    style={{ background: a.bg }}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <p>
                Joined this week by talent from <strong>Stripe</strong>,{" "}
                <strong>Figma</strong>, <strong>Linear</strong>.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="tm-bento-wrap"
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          >
            <div className="tm-bento-glow" aria-hidden />
            <div className="tm-bento">
              <div className="tm-tile tm-tile--match">
                <div className="tm-match-head">
                  <div>
                    <p className="tm-small-caps">Match · 96%</p>
                    <p className="tm-match-role">Founding Designer</p>
                    <p className="tm-match-company">Helio Robotics · Amsterdam</p>
                  </div>
                  <span className="tm-pill-new">New</span>
                </div>
                <div>
                  <div className="tm-tags">
                    {["Remote · EMEA", "€140–180k", "Equity"].map((t) => (
                      <span key={t} className="tm-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="tm-gold-rule" />
                  <div className="tm-match-foot">
                    <span>Introduced by Sam · Northstar</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              <div className="tm-tile tm-tile--person">
                <span
                  className="tm-person-avatar"
                  style={{ background: "oklch(0.4 0.08 260)" }}
                >
                  AR
                </span>
                <div>
                  <p className="tm-person-name">Alex Rivera</p>
                  <p className="tm-person-role">Senior PD · Berlin</p>
                </div>
              </div>

              <div className="tm-tile tm-tile--stat">
                <p className="tm-small-caps" style={{ color: "var(--tm-gold)" }}>
                  Active matches
                </p>
                <p className="tm-stat-number tm-gold-text">12</p>
              </div>

              <div className="tm-tile tm-tile--quote">
                <Star size={16} />
                <div>
                  <p className="tm-tile-quote-text">"Calm under fire. Ships."</p>
                  <p className="tm-tile-quote-attr">— Diego, ex-Figma</p>
                </div>
              </div>

              <div className="tm-tile tm-tile--intros">
                <span className="tm-intros-icon">
                  <Bell size={16} />
                </span>
                <div>
                  <p className="tm-intros-title">2 new intros today</p>
                  <p className="tm-intros-sub">
                    From recruiters matching your dream job
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="tm-stats">
          <div className="tm-container tm-stats-grid">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="tm-stat-cell">
                <p className="tm-stat-kpi tm-gold-text">{s.kpi}</p>
                <p className="tm-stat-label">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="tm-section">
        <div className="tm-container">
          <Reveal>
            <div className="tm-section-head">
              <div>
                <p className="tm-kicker">How it works</p>
                <h2 className="tm-section-title">
                  Three quiet steps. <span className="tm-gold-text">Zero noise.</span>
                </h2>
              </div>
              <a href="#join" className="tm-section-link">
                Start your profile <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
          <div className="tm-steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <div className="tm-step-card">
                  <p className="tm-step-num tm-gold-text">{s.n}</p>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="tm-features">
        <div className="tm-container tm-section">
          <Reveal>
            <p className="tm-kicker">Platform</p>
            <h2 className="tm-section-title" style={{ marginBottom: "3rem" }}>
              A craft tool for{" "}
              <span className="tm-gold-text">serious career moves.</span>
            </h2>
          </Reveal>
          <div className="tm-features-grid">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.1}>
                <div className="tm-feature-card">
                  <div className="tm-feature-icon">
                    <f.icon size={20} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tm-section">
        <div className="tm-container tm-audience">
          <Reveal>
            <div id="recruiters" className="tm-audience-card">
              <p className="tm-kicker">For recruiters</p>
              <h3>
                Earn a <span className="tm-gold-text">lifetime share</span> on
                every placement.
              </h3>
              <p>
                Bring talent or clients into the network. We handle vetting,
                payments and compliance. You keep earning — long after the first
                interview.
              </p>
              <ul className="tm-audience-list">
                <li>Up to 20% lifetime commission</li>
                <li>Stripe + bank payouts</li>
                <li>Branded referral links</li>
              </ul>
              <a href="#join" className="tm-btn tm-btn--outline-gold">
                Apply as a partner <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div id="companies" className="tm-audience-card tm-audience-card--gold">
              <p className="tm-kicker">For companies</p>
              <h3>
                Pay per interview.{" "}
                <span className="tm-gold-text">Not per posting.</span>
              </h3>
              <p>
                Auto-match against a live pool of pre-screened operators. Reveal
                contact only when you're ready to interview. Cancel any time.
              </p>
              <ul className="tm-audience-list">
                <li>$50–$300 per interview</li>
                <li>AI-parsed job descriptions</li>
                <li>Pre-vouched candidates</li>
              </ul>
              <a href="#join" className="tm-btn tm-btn--gold">
                Post your first role <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="tm-section" style={{ borderTop: "1px solid var(--tm-border)" }}>
        <div className="tm-container">
          <Reveal>
            <p className="tm-kicker">Field notes</p>
            <h2 className="tm-section-title" style={{ marginBottom: "3rem" }}>
              The people <span className="tm-gold-text">already moving</span>{" "}
              through 10x.
            </h2>
          </Reveal>
          <div className="tm-quotes-grid">
            {QUOTES.map((q, i) => (
              <Reveal key={q.name} delay={i * 0.12}>
                <figure className="tm-quote-card">
                  <div>
                    <div className="tm-stars">
                      {Array.from({ length: 5 }).map((_, n) => (
                        <Star key={n} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <blockquote>"{q.quote}"</blockquote>
                  </div>
                  <figcaption>
                    <p className="tm-quote-name">{q.name}</p>
                    <p className="tm-quote-role">{q.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="tm-section" style={{ paddingTop: 0 }}>
        <div className="tm-container">
          <Reveal>
            <div className="tm-final tm-noise">
              <h2>
                Your next role is{" "}
                <span className="tm-gold-text">already looking</span> for you.
              </h2>
              <p>
                Sixty seconds to set up. Zero noise after. We'll surface the
                right opportunities when they're worth a Tuesday afternoon.
              </p>
              <div className="tm-final-actions">
                <a
                  href="https://wa.me/77064172408?text=Hi!%20I%20want%20to%20join%2010x%20Talent."
                  target="_blank"
                  rel="noreferrer"
                  className="tm-btn tm-btn--gold"
                >
                  Create your profile <ArrowRight size={15} />
                </a>
                <a
                  href="https://wa.me/77064172408?text=Hi!%20I%20already%20have%20a%2010x%20Talent%20account."
                  target="_blank"
                  rel="noreferrer"
                  className="tm-btn tm-btn--ghost"
                >
                  I already have an account
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="tm-footer">
        <div className="tm-container tm-footer-inner">
          <div className="tm-footer-brand">
            <span className="tm-brand-mark">X</span>
            <span className="tm-footer-brand-name">10x Talent</span>
            <span>· © {new Date().getFullYear()}</span>
          </div>
          <div className="tm-footer-links">
            <a href="#features">Browse roles</a>
            <a href="#recruiters">Recruiters</a>
            <a href="#companies">Companies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
