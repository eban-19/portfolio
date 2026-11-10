import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Menu, X, ArrowUp } from "lucide-react";

import Projects from "./components/Projects";
import Logo from "./assets/logo.png";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const highlightTimeoutRef = useRef(null);

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const skillsList = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "Tailwind",
    "Git",
  ];

  // Smooth scroll handler with offset and animation trigger
  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    setMenuOpen(false);

    const element = document.getElementById(id);
    if (!element) return;

    // Calculate fixed navbar height offset
    const navHeight = 72;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Clear any pending timeout and re-trigger animation
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

    // Reset highlighted state after animation completes
    highlightTimeoutRef.current = setTimeout(() => {
      setHighlightedSection(null);
    }, 2400);

    // Update URL hash cleanly
    window.history.pushState(null, "", `#${id}`);
  };

  // Scrollspy & scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sectionIds = ["about", "skills", "projects", "contact"];

      // Update scroll progress & scroll-to-top visibility
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navbar */}
        <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 shadow-md border-b border-slate-800/80 transition-all">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
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
                  className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${activeSection === link.id
                      ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 font-semibold shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/80"
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-300 p-1 hover:text-cyan-400 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-slate-950/95 border-b border-slate-850 px-6 py-4 flex flex-col gap-2 text-sm font-medium backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
              className={`py-2.5 px-3 rounded-lg transition text-left cursor-pointer ${activeSection === link.id
                  ? "text-cyan-400 bg-cyan-500/15 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                }`}
              >
        {link.name}
      </a>
            ))}
    </div>
  )
}

  {/* Reading / Scroll progress indicator bar */ }
  < div
className = "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 transition-all duration-150"
style = {{ width: `${scrollProgress}%` }}
        />
      </nav >

      {/* Hero */ }
      < section className = "pt-36 pb-32 text-center bg-slate-950 relative overflow-hidden" >
        {/* Ambient atmospheric aura */ }
        < div className = "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
              <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Full-Stack{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  Web Developer
                </span>
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-lg md:text-xl leading-relaxed">
                I build secure, scalable, and user-friendly applications with clean
                architecture and modern design.
              </p>

                {/* CTA Buttons with clear hierarchy */}
                <div className="mt-10 flex flex-wrap justify-center items-center gap-5">
                  <a
                    href="#projects"
                    onClick={(e) => scrollToSection(e, "projects")}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 active:scale-95 text-white rounded-xl font-semibold shadow-lg shadow-cyan-600/25 transition-all duration-200 cursor-pointer"
                  >
                    View Projects
                  </a>

                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "contact")}
                    className="px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800/90 hover:text-white hover:border-cyan-500/40 border border-slate-700/80 active:scale-95 text-slate-200 rounded-xl font-semibold backdrop-blur-sm shadow-md transition-all duration-200 cursor-pointer"
                  >
                    Contact Me
                  </a>

                  <a
                    href="/my_CV.pdf"
                    download
                    className="px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800/90 hover:text-white hover:border-slate-500 border border-slate-700/80 active:scale-95 text-slate-200 rounded-xl font-semibold backdrop-blur-sm shadow-md transition-all duration-200 cursor-pointer"
                  >
                    Download CV
                  </a>
                </div>
              </div>
      </section >

{/* About */ }
      <section
        id="about"
        className={`py-24 bg-slate-950 scroll-mt-20 relative overflow-hidden transition-all duration-700 border-t border-slate-900/80 ${
          highlightedSection === "about"
            ? "animate-section-glow ring-1 ring-cyan-500/40"
            : ""
        }`}
      >
        {/* Ambient background glow when highlighted */}
        {highlightedSection === "about" && (
          <div className="absolute inset-0 pointer-events-none animate-ambient-flash bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/15 via-blue-600/10 to-transparent" />
        )}

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="mb-10 text-center md:text-left">
            <h3
              className={`text-4xl font-bold transition-all duration-300 ${
                highlightedSection === "about"
                  ? "animate-heading-pulse text-cyan-400"
                  : "text-white"
              }`}
            >
              About Me
            </h3>
            <div
              className={`h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full mt-3 transition-all duration-700 mx-auto md:mx-0 ${
                highlightedSection === "about"
                  ? "w-28 opacity-100 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                  : "w-14 opacity-50"
              }`}
            />
          </div>

          <div
            className={`bg-slate-900/60 backdrop-blur-sm p-8 md:p-10 rounded-2xl border transition-all duration-500 ${
              highlightedSection === "about"
                ? "border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                : "border-slate-800/80"
            }`}
          >
            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              I am a passionate Full Stack Web Developer with strong experience in
              building modern, scalable, and user-focused web applications. I enjoy
              transforming complex problems into clean, efficient, and intuitive
              solutions.
              <br /><br />
              I have worked on full-stack projects including e-commerce platforms
              with admin dashboards, AI-powered applications, and real-world
              systems that focus on performance, security, and usability.
              <br /><br />
              I am continuously learning new technologies, improving best
              practices, and building projects that solve real problems. My goal
              is to grow as a software engineer and contribute to impactful,
              production-ready applications.
            </p>
          </div>
        </div >
      </section >

{/* Skills */ }
<section
  id="skills"
  className={`py-24 bg-slate-950 scroll-mt-20 relative overflow-hidden transition-all duration-700 border-t border-slate-900/80 ${highlightedSection === "skills"
      ? "animate-section-glow ring-1 ring-cyan-500/40"
      : ""
    }`}
>
  {/* Ambient background glow when highlighted */}
  {highlightedSection === "skills" && (
    <div className="absolute inset-0 pointer-events-none animate-ambient-flash bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/15 via-blue-600/10 to-transparent" />
  )}

  <div className="max-w-5xl mx-auto px-6 relative z-10">
    <div className="text-center mb-14">
      <h3
        className={`text-4xl font-bold transition-all duration-300 ${highlightedSection === "skills"
            ? "animate-heading-pulse text-cyan-400"
            : "text-white"
          }`}
      >
        Skills & Technologies
      </h3>
      <div
      className={`h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full mx-auto mt-3 transition-all duration-700 ${highlightedSection === "skills"
          ? "w-28 opacity-100 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
          : "w-14 opacity-50"
        }`}
            />
  </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
      {skillsList.map((skill, index) => (
        <div
          key={skill}
          style={{
            animationDelay:
              highlightedSection === "skills" ? `${index * 60}ms` : "0ms",
          }}
          className={`bg-slate-900/60 backdrop-blur-sm rounded-2xl p-4 text-center font-medium transition-all duration-300 hover:bg-slate-800 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-950/30 hover:scale-105 cursor-default ${highlightedSection === "skills"
              ? "animate-skill-pop border border-cyan-400/90 text-white bg-slate-800"
              : "border border-slate-800/80 text-slate-200"
            }`}
        >
                { skill }
              </div>
            ))}
          </div >
        </div >
      </section >

{/* Projects */ }
<Projects isHighlighted={highlightedSection === "projects"} />

  {/* Contact */}
  <section
    id="contact"
    className={`py-24 bg-slate-950 scroll-mt-20 relative overflow-hidden transition-all duration-700 border-t border-slate-900/80 ${highlightedSection === "contact"
        ? "animate-section-glow ring-1 ring-cyan-500/40"
        : ""
      }`}
  >
    {/* Ambient background glow when highlighted */}
    {highlightedSection === "contact" && (
      <div className="absolute inset-0 pointer-events-none animate-ambient-flash bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/15 via-blue-600/10 to-transparent" />
    )}

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-6">
            <h3
              className={`text-4xl font-bold transition-all duration-300 ${highlightedSection === "contact"
                  ? "animate-heading-pulse text-cyan-400"
                  : "text-white"
                }`}
            >
              Get In Touch
            </h3>
            <div
              className={`h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full mx-auto mt-3 transition-all duration-700 ${highlightedSection === "contact"
                  ? "w-28 opacity-100 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                  : "w-14 opacity-50"
                }`}
            />
        </div>

        <p className="text-slate-400 mb-10 text-lg">
          Let’s build something meaningful together.
        </p>

            < div
            className={`inline-flex items-center justify-center gap-8 bg-slate-900/60 backdrop-blur-sm px-8 py-5 rounded-2xl border transition-all duration-500 ${highlightedSection === "contact"
              ? "border-cyan-500/60 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
              : "border-slate-800/80"
            }`}
        >
          <a
            href="https://github.com/eban-19"
            className={`text-slate-300 hover:text-cyan-400 transition-all p-2.5 rounded-xl hover:bg-slate-800 ${highlightedSection === "contact" ? "animate-icon-pulse text-cyan-400" : ""
              }`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <Github size={30} />
          </a>
          <a
            href="https://www.linkedin.com/in/ebisa-sutuma-ba77013a1/"
            style={{
              animationDelay:
                highlightedSection === "contact" ? "120ms" : "0ms",
            }}
            className={`text-slate-300 hover:text-cyan-400 transition-all p-2.5 rounded-xl hover:bg-slate-800 ${highlightedSection === "contact" ? "animate-icon-pulse text-cyan-400" : ""
              }`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={30} />
          </a>
          <a
            href="mailto:ebisasutuma@gmail.com"
            style={{
              animationDelay:
                highlightedSection === "contact" ? "240ms" : "0ms",
            }}
            className={`text-slate-300 hover:text-cyan-400 transition-all p-2.5 rounded-xl hover:bg-slate-800 ${highlightedSection === "contact" ? "animate-icon-pulse text-cyan-400" : ""
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      setHighlightedSection(null);
      setActiveSection("");
    }}
    aria-label="Back to top"
    className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-600/30 hover:shadow-cyan-500/50 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm border border-cyan-400/40 cursor-pointer ${showScrollTop
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
        <ArrowUp size={20} />
      </button>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-center text-sm text-slate-500 border-t border-slate-900">
        © {new Date().getFullYear()} Eban.dev. All rights reserved.
      </footer>
    </div>
  );
}
