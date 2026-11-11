import { useState, useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { animate, stagger } from "animejs";
import { projects } from "../data/projects";

const Projects = ({ isHighlighted = false }) => {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Scroll-reveal motion when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          // Title word reveal motion
          animate(".project-title-word", {
            translateY: ["110%", "0%"],
            opacity: [0, 1],
            delay: stagger(90),
            ease: "outCubic",
            duration: 750,
          });

          // Cards staggered entrance animation
          animate(".project-card-item", {
            translateY: [45, 0],
            scale: [0.93, 1],
            opacity: [0, 1],
            delay: stagger(120, { start: 100 }),
            ease: "outCubic",
            duration: 750,
          });
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When clicked from navigation, re-trigger motion
  useEffect(() => {
    if (isHighlighted) {
      animate(".project-title-word", {
        translateY: ["60%", "0%"],
        opacity: [0.4, 1],
        delay: stagger(60),
        ease: "outCubic",
        duration: 500,
      });

      animate(".project-card-item", {
        translateY: [25, 0],
        scale: [0.96, 1],
        opacity: [0.6, 1],
        delay: stagger(70, { start: 50 }),
        ease: "outCubic",
        duration: 650,
      });
    }
  }, [isHighlighted]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`py-28 bg-[#0b0f19] relative overflow-hidden transition-all duration-700 scroll-mt-20 border-t border-slate-800/80 ${
        isHighlighted ? "animate-section-glow ring-2 ring-cyan-500/30" : ""
      }`}
    >
      {/* Ambient background glow when highlighted */}
      {isHighlighted && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/15 via-blue-600/10 to-transparent" />
      )}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            <span className="inline-block overflow-hidden">
              <span className="project-title-word inline-block opacity-0">Featured</span>
            </span>{" "}
            <span className="inline-block overflow-hidden">
              <span className="project-title-word inline-block opacity-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Projects
              </span>
            </span>
          </h2>
          <div
            className={`h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full mx-auto mt-4 transition-all duration-700 ${
              isHighlighted
                ? "w-28 opacity-100 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                : "w-14 opacity-50"
            }`}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              isSectionHighlighted={isHighlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, isSectionHighlighted = false }) => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const total = project.screenshots.length;

  const next = () => setIndex((index + 1) % total);
  const prev = () => setIndex((index - 1 + total) % total);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div
        className={`project-card-item opacity-0 bg-[#111827]/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col justify-between border hover:-translate-y-1.5 ${
          isSectionHighlighted
            ? "border-cyan-500/50 shadow-[0_0_25px_rgba(56,189,248,0.2)]"
            : "border-slate-800/80 hover:border-cyan-500/40"
        }`}
      >
        <div>
          {/* Image carousel container */}
          <div className="relative cursor-pointer group overflow-hidden bg-slate-950" onClick={() => setOpen(true)}>
            <img
              src={project.screenshots[index]}
              alt={project.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80" />

            {total > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-slate-950/75 hover:bg-slate-900 text-white p-2 rounded-full shadow-md backdrop-blur-sm transition border border-slate-700/60 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-slate-950/75 hover:bg-slate-900 text-white p-2 rounded-full shadow-md backdrop-blur-sm transition border border-slate-700/60 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.split(", ").map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-6 pb-6 pt-0 border-t border-slate-800/60 mt-auto">
          <div className="flex gap-4 text-sm pt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 font-semibold transition cursor-pointer"
              >
                <Github size={16} /> Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition cursor-pointer"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-4 text-slate-300 hover:text-rose-400 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X size={32} />
            </button>

            <img
              src={project.screenshots[index]}
              alt={project.title}
              className="w-full max-h-[80vh] object-contain rounded-xl border border-slate-800 shadow-2xl bg-black"
            />

            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition border border-slate-700/60 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition border border-slate-700/60 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
