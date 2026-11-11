import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Menu, X, ArrowUp, Code2, Layers, Zap } from "lucide-react";
import { animate, stagger } from "animejs";

import Projects from "./components/Projects";
import HeroParticles from "./components/HeroParticles";
import Logo from "./assets/logo.png";
import { skillCategories } from "./data/skills";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const highlightTimeoutRef = useRef(null);
  const activeAnimationRef = useRef(null);

  const revealedSectionsRef = useRef({
    about: false,
    skills: false,
    contact: false,
  });

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  // Smooth scroll handler with natural inOutCubic easing
  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    setMenuOpen(false);

    const element = document.getElementById(id);
    if (!element) return;

    const navHeight = 72;
    const elementPosition = element.getBoundingClientRect().top;
    const targetY = Math.max(0, elementPosition + window.pageYOffset - navHeight);

    if (activeAnimationRef.current) {
      activeAnimationRef.current.pause?.();
    }

    const scrollTracker = { y: window.scrollY };
    activeAnimationRef.current = animate(scrollTracker, {
      y: targetY,
      duration: 800,
      ease: "inOutCubic",
      onUpdate: () => {
        window.scrollTo(0, scrollTracker.y);
      },
    });

    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
    setHighlightedSection(null);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHighlightedSection(id);
        setActiveSection(id);
      });
    });

    highlightTimeoutRef.current = setTimeout(() => {
      setHighlightedSection(null);
    }, 2200);

    window.history.pushState(null, "", `#${id}`);
  };

  // Initial hero entrance motion
  useEffect(() => {
    animate(".hero-motion-word", {
      translateY: ["110%", "0%"],
      opacity: [0, 1],
      delay: stagger(120, { start: 150 }),
      ease: "outCubic",
      duration: 850,
    });

    animate(".hero-subtext", {
      translateY: [25, 0],
      opacity: [0, 1],
      delay: 450,
      ease: "outCubic",
      duration: 750,
    });

    animate(".hero-cta-btn", {
      translateY: [20, 0],
      scale: [0.92, 1],
      opacity: [0, 1],
      delay: stagger(80, { start: 600 }),
      ease: "outBack",
      duration: 700,
    });
  }, []);

  // Scroll-triggered motion reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;

          if (id === "about" && !revealedSectionsRef.current.about) {
            revealedSectionsRef.current.about = true;

            animate(".about-title-word", {
              translateY: ["110%", "0%"],
              opacity: [0, 1],
              delay: stagger(90),
              ease: "outCubic",
              duration: 750,
            });

            animate(".about-badge", {
              scale: [0.8, 1],
              opacity: [0, 1],
              delay: 200,
              ease: "outBack",
              duration: 600,
            });

            animate(".about-bio-card", {
              translateY: [35, 0],
              opacity: [0, 1],
              delay: 250,
              ease: "outCubic",
              duration: 800,
            });

            animate(".about-pillar-card", {
              translateY: [30, 0],
              opacity: [0, 1],
              delay: stagger(100, { start: 350 }),
              ease: "outCubic",
              duration: 750,
            });
          }

          if (id === "skills" && !revealedSectionsRef.current.skills) {
            revealedSectionsRef.current.skills = true;

            animate(".skills-title-word", {
              translateY: ["110%", "0%"],
              opacity: [0, 1],
              delay: stagger(80),
              ease: "outCubic",
              duration: 750,
            });

            animate(".skill-category-group", {
              translateY: [25, 0],
              opacity: [0, 1],
              delay: stagger(120, { start: 150 }),
              ease: "outCubic",
              duration: 700,
            });

            animate(".skill-badge-item", {
              translateY: [30, 0],
              scale: [0.85, 1],
              opacity: [0, 1],
              delay: stagger(35, { from: "center", start: 250 }),
              ease: "outBack",
              duration: 650,
            });
          }

          if (id === "contact" && !revealedSectionsRef.current.contact) {
            revealedSectionsRef.current.contact = true;

            animate(".contact-title-word", {
              translateY: ["110%", "0%"],
              opacity: [0, 1],
              delay: stagger(80),
              ease: "outCubic",
              duration: 750,
            });

            animate(".contact-card", {
              translateY: [30, 0],
              opacity: [0, 1],
              delay: 200,
              ease: "outCubic",
              duration: 750,
            });

            animate(".contact-social-icon", {
              scale: [0.4, 1],
              rotate: [-20, 0],
              opacity: [0, 1],
              delay: stagger(90, { start: 350 }),
              ease: "outElastic(1.3, 0.6)",
              duration: 750,
            });
          }
        });
      },
      { threshold: 0.18 }
    );

    ["about", "skills", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Navigation click trigger motion
  useEffect(() => {
    if (highlightedSection === "skills") {
      animate(".skills-title-word", {
        translateY: ["60%", "0%"],
        opacity: [0.5, 1],
        delay: stagger(60),
        ease: "outCubic",
        duration: 500,
      });

      animate(".skill-badge-item", {
        translateY: [-10, 0],
        scale: [0.94, 1],
        delay: stagger(30, { from: "center" }),
        ease: "outElastic(1.2, 0.7)",
        duration: 600,
      });
    }

    if (highlightedSection === "about") {
      animate(".about-title-word", {
        translateY: ["60%", "0%"],
        opacity: [0.5, 1],
        delay: stagger(60),
        ease: "outCubic",
        duration: 500,
      });

      animate(".about-bio-card", {
        scale: [0.98, 1],
        ease: "outCubic",
        duration: 600,
      });

      animate(".about-pillar-card", {
        translateY: [-6, 0],
        delay: stagger(60),
        ease: "outCubic",
        duration: 500,
      });
    }

    if (highlightedSection === "contact") {
      animate(".contact-title-word", {
        translateY: ["60%", "0%"],
        opacity: [0.5, 1],
        delay: stagger(60),
        ease: "outCubic",
        duration: 500,
      });

      animate(".contact-social-icon", {
        scale: [0.75, 1],
        delay: stagger(70),
        ease: "outElastic(1.2, 0.6)",
        duration: 650,
      });
    }
  }, [highlightedSection]);

  // Scrollspy & scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sectionIds = ["about", "skills", "projects", "contact"];

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 400);

      if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#0b0f19]/80 backdrop-blur-md z-50 shadow-md border-b border-slate-800/80 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const tracker = { y: window.scrollY };
              animate(tracker, {
                y: 0,
                duration: 750,
                ease: "inOutCubic",
                onUpdate: () => window.scrollTo(0, tracker.y),
              });
              setHighlightedSection(null);
              setActiveSection("");
              window.history.pushState(null, "", " ");
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <img
              src={Logo}
              alt="Eban.dev logo"
              className="h-10 w-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-2xl font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors">
              Eban.dev
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 font-semibold shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 p-1 hover:text-cyan-400 transition cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0e1424] border-b border-slate-800 px-6 py-4 flex flex-col gap-2 text-sm font-medium shadow-2xl backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`py-2.5 px-3 rounded-lg transition text-left cursor-pointer ${
                  activeSection === link.id
                    ? "text-cyan-400 bg-cyan-500/15 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-850"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        {/* Reading progress indicator bar */}
        <div
          className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-32 text-center bg-[#0b0f19] relative overflow-hidden">
        {/* Animated Background Particles */}
        <HeroParticles />

        {/* Atmospheric Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/15 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Animated Split-Word Headline */}
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            <span className="inline-block overflow-hidden">
              <span className="hero-motion-word inline-block">Full-Stack</span>
            </span>{" "}
            <span className="inline-block overflow-hidden">
              <span className="hero-motion-word inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Web Developer
              </span>
            </span>
          </h2>

          <p className="hero-subtext mt-6 max-w-2xl mx-auto text-slate-300 text-lg md:text-xl leading-relaxed">
            I build secure, scalable, and user-friendly applications with clean
            architecture and modern design.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-5">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="hero-cta-btn px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer"
            >
              View Projects
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="hero-cta-btn px-8 py-3.5 bg-[#111827]/80 hover:bg-[#1a2337] text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 hover:text-white active:scale-95 rounded-xl font-semibold backdrop-blur-sm shadow-md transition-all duration-200 cursor-pointer"
            >
              Contact Me
            </a>

            <a
              href="/my_CV.pdf"
              download
              className="hero-cta-btn px-8 py-3.5 bg-[#111827]/80 hover:bg-[#1a2337] text-slate-200 border border-slate-700/80 hover:border-slate-500 active:scale-95 rounded-xl font-semibold backdrop-blur-sm shadow-md transition-all duration-200 cursor-pointer"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className={`py-28 bg-[#0b0f19] scroll-mt-20 relative overflow-hidden transition-all duration-700 border-t border-slate-800/80 ${
          highlightedSection === "about" ? "animate-section-glow ring-2 ring-cyan-500/30" : ""
        }`}
      >
        {highlightedSection === "about" && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/15 via-blue-600/10 to-transparent" />
        )}

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="mb-14 text-center md:text-left">
            <div className="about-badge inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-semibold mb-4 tracking-wider uppercase">
              Software Engineer
            </div>

            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              <span className="inline-block overflow-hidden">
                <span className="about-title-word inline-block">About</span>
              </span>{" "}
              <span className="inline-block overflow-hidden">
                <span className="about-title-word inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Me
                </span>
              </span>
            </h3>
            <div
              className={`h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4 transition-all duration-700 mx-auto md:mx-0 ${
                highlightedSection === "about" ? "w-28 opacity-100 shadow-[0_0_15px_rgba(56,189,248,0.8)]" : "w-14 opacity-50"
              }`}
            />
          </div>

          {/* Redesigned 2-Column About Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Main Narrative Card (7 cols) */}
            <div
              className={`about-bio-card lg:col-span-7 bg-[#111827]/85 backdrop-blur-md p-8 md:p-10 rounded-2xl border transition-all duration-500 shadow-xl ${
                highlightedSection === "about"
                  ? "border-cyan-500/60 shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                  : "border-slate-800/80"
              }`}
            >
              <p className="text-xl md:text-2xl font-semibold text-white leading-snug mb-6">
                I am a passionate{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent font-bold">
                  Full-Stack Web Developer
                </span>{" "}
                dedicated to turning complex ideas into scalable, user-centric software.
              </p>

              <p className="text-slate-300 leading-relaxed text-base md:text-lg mb-6">
                With hands-on experience across the entire development lifecycle, I specialize in crafting performant frontend interfaces paired with resilient, clean backend architectures. I enjoy solving real-world engineering challenges with elegance and efficiency.
              </p>

              <p className="text-slate-300 leading-relaxed text-base md:text-lg mb-8">
                From architecting comprehensive e-commerce systems with administrative dashboards to building intelligent AI-assisted applications, I build software designed for reliability, speed, and great user experience.
              </p>

              {/* Core Focus Tags */}
              <div className="pt-6 border-t border-slate-800/70">
                <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
                  Core Engineering Focus
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Clean Architecture",
                    "RESTful APIs",
                    "Modern React",
                    "Database Design",
                    "Responsive UI/UX",
                    "Performance & Security"
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-medium hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Pillar Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="about-pillar-card bg-[#111827]/85 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 shadow-lg hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 shrink-0">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1.5">End-to-End Craft</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Comfortable across the entire stack—from responsive React components to Node/Express server APIs and database schemas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-pillar-card bg-[#111827]/85 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 shadow-lg hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-400 shrink-0">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1.5">Real-World Systems</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Proven track record creating production-grade platforms with admin portals, order flows, and AI workflow integrations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-pillar-card bg-[#111827]/85 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 shadow-lg hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 shrink-0">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1.5">Continuous Growth</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Always sharpening engineering best practices, exploring emerging tools, and committed to high performance and clean code.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className={`py-28 bg-[#0b0f19] scroll-mt-20 relative overflow-hidden transition-all duration-700 border-t border-slate-800/80 ${
          highlightedSection === "skills" ? "animate-section-glow ring-2 ring-cyan-500/30" : ""
        }`}
      >
        {highlightedSection === "skills" && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/15 via-blue-600/10 to-transparent" />
        )}

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              <span className="inline-block overflow-hidden">
                <span className="skills-title-word inline-block">Skills &</span>
              </span>{" "}
              <span className="inline-block overflow-hidden">
                <span className="skills-title-word inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Technologies
                </span>
              </span>
            </h3>
            <div
              className={`h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-4 transition-all duration-700 ${
                highlightedSection === "skills" ? "w-28 opacity-100 shadow-[0_0_15px_rgba(56,189,248,0.8)]" : "w-14 opacity-50"
              }`}
            />
          </div>

          {/* Organized Skill Categories */}
          <div className="space-y-12">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="skill-category-group">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-800/70">
                  <h4 className="text-lg font-bold text-white tracking-wide">{cat.title}</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 font-semibold">
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Tech Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`skill-badge-item group bg-[#111827]/85 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 border border-slate-800/80 shadow-md hover:-translate-y-1.5 hover:shadow-xl cursor-default ${
                        highlightedSection === "skills"
                          ? "border-cyan-400/80 shadow-[0_0_20px_rgba(56,189,248,0.25)] bg-[#1a2337]"
                          : "hover:border-slate-700 hover:bg-[#151f33]"
                      }`}
                    >
                      {/* Brand SVG Icon with floating effect */}
                      <div className="mb-3 p-2.5 rounded-xl bg-slate-900/90 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                        {skill.icon}
                      </div>

                      {/* Name & Type */}
                      <div>
                        <div className="font-bold text-white text-base tracking-wide group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </div>
                        <span className="inline-block mt-1.5 text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded-md bg-slate-850/80 border border-slate-800">
                          {skill.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <Projects isHighlighted={highlightedSection === "projects"} />

      {/* Contact */}
      <section
        id="contact"
        className={`py-28 bg-[#0b0f19] scroll-mt-20 relative overflow-hidden transition-all duration-700 border-t border-slate-800/80 ${
          highlightedSection === "contact" ? "animate-section-glow ring-2 ring-cyan-500/30" : ""
        }`}
      >
        {highlightedSection === "contact" && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/15 via-blue-600/10 to-transparent" />
        )}

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-6">
            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              <span className="inline-block overflow-hidden">
                <span className="contact-title-word inline-block">Get In</span>
              </span>{" "}
              <span className="inline-block overflow-hidden">
                <span className="contact-title-word inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Touch
                </span>
              </span>
            </h3>
            <div
              className={`h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-4 transition-all duration-700 ${
                highlightedSection === "contact" ? "w-28 opacity-100 shadow-[0_0_15px_rgba(56,189,248,0.8)]" : "w-14 opacity-50"
              }`}
            />
          </div>

          <p className="contact-card text-slate-400 mb-10 text-lg">
            Let’s build something meaningful together.
          </p>

          <div
            className={`contact-card inline-flex items-center justify-center gap-8 bg-[#111827]/80 backdrop-blur-md px-8 py-5 rounded-2xl border transition-all duration-500 shadow-xl ${
              highlightedSection === "contact"
                ? "border-cyan-500/60 shadow-[0_0_30px_rgba(56,189,248,0.25)]"
                : "border-slate-800/80"
            }`}
          >
            <a
              href="https://github.com/eban-19"
              className={`contact-social-icon text-slate-300 hover:text-cyan-400 transition-all p-2.5 rounded-xl hover:bg-slate-800 ${
                highlightedSection === "contact" ? "text-cyan-400" : ""
              }`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/ebisa-sutuma-ba77013a1/"
              className={`contact-social-icon text-slate-300 hover:text-cyan-400 transition-all p-2.5 rounded-xl hover:bg-slate-800 ${
                highlightedSection === "contact" ? "text-cyan-400" : ""
              }`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={30} />
            </a>
            <a
              href="mailto:ebisasutuma@gmail.com"
              className={`contact-social-icon text-slate-300 hover:text-cyan-400 transition-all p-2.5 rounded-xl hover:bg-slate-800 ${
                highlightedSection === "contact" ? "text-cyan-400" : ""
              }`}
              aria-label="Send Email"
            >
              <Mail size={30} />
            </a>
          </div>
        </div>
      </section>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => {
          const tracker = { y: window.scrollY };
          animate(tracker, {
            y: 0,
            duration: 750,
            ease: "inOutCubic",
            onUpdate: () => window.scrollTo(0, tracker.y),
          });
          setHighlightedSection(null);
          setActiveSection("");
        }}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-all duration-300 border border-cyan-400/40 cursor-pointer ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <ArrowUp size={20} />
      </button>

      {/* Footer */}
      <footer className="py-8 bg-[#0b0f19] text-center text-sm text-slate-500 border-t border-slate-800">
        © {new Date().getFullYear()} Eban.dev. All rights reserved.
      </footer>
    </div>
  );
}
