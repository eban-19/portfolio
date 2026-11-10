import { useState, useEffect } from "react";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { projects } from "../data/projects";

      const Projects= ({ isHighlighted = false }) => {
  return (
    <section
      id="projects"
      className={`py-24 bg-slate-950 relative overflow-hidden transition-all duration-700 scroll-mt-20 ${isHighlighted ? "animate-section-glow ring-1 ring-cyan-500/40" : ""
        }`}
    >
      {/* Ambient background glow when highlighted */}
      {isHighlighted && (
        <div className="absolute inset-0 pointer-events-none animate-ambient-flash bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/15 via-blue-600/10 to-transparent" />
      )}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <h2
            className={`text-4xl font-bold transition-all duration-300 ${isHighlighted ? "animate-heading-pulse text-cyan-400" : "text-white"
              }`}
          >
            Featured Projects
          </h2>
          <div
            className={`h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full mx-auto mt-3 transition-all duration-700 ${isHighlighted
                ? "w-28 opacity-100 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
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
                    delayIndex={i}
                  />
          ))}
      </div>
    </div>
    </section >
  );
};

  const ProjectCard = ({ project, isSectionHighlighted = false, delayIndex = 0 }) => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);

    const total = project.screenshots.length;

    const next = () => setIndex((index + 1) % total);
    const prev = () => setIndex((index - 1 + total) % total);

    // Close modal with ESC
    useEffect(() => {
      const handler = (e) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, []);

  return (
      <>
            {/* Project Card */}
            <div
              style={{
                transitionDelay: isSectionHighlighted ? `${delayIndex * 80}ms` : "0ms",
              }}
              className={`bg-slate-900/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-950/20 transition duration-500 flex flex-col justify-between ${isSectionHighlighted
                  ? "border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  : "border border-slate-800/80 hover:border-slate-700"
                }`}
            >
              {/* Top: Image & Carousel */}
              <div>
                <div className="relative cursor-pointer group" onClick={() => setOpen(true)}>
                  <img
                    src={project.screenshots[index]}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                {total > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prev();
                      }}
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-slate-950/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-sm transition border border-slate-700/60"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-slate-950/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-sm transition border border-slate-700/60"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.split(", ").map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md bg-cyan-950/50 text-cyan-300 border border-cyan-800/40 font-medium"
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
                  className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 font-medium transition"
                >
                  <Github size={16} /> Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 font-medium transition"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

{/* FULLSCREEN MODAL */ }
{
  open && (
    <div
      className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute -top-12 right-4 text-slate-300 hover:text-rose-400 transition"
          aria-label="Close modal"
        >
          <X size={32} />
        </button>

        {/* Image */}
        <img
          src={project.screenshots[index]}
          alt={project.title}
          className="w-full max-h-[80vh] object-contain rounded-xl border border-slate-800 shadow-2xl"
        />

        {/* Controls */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full border border-slate-700/60 backdrop-blur-sm transition"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full border border-slate-700/60 backdrop-blur-sm transition"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
    </>
  );
};

export default Projects;
