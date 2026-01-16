import { useState, useEffect } from "react";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
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
      <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
        {/* Image */}
        <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
          <img
            src={project.screenshots[index]}
            alt={project.title}
            className="w-full h-48 object-cover"
          />

          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 p-2 rounded-full"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 p-2 rounded-full"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-3">
            {project.description}
          </p>
          <p className="text-blue-400 text-sm mb-4">{project.tech}</p>

          <div className="flex gap-4 text-sm">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                className="flex items-center gap-1 hover:text-blue-400"
              >
                <Github size={16} /> Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                className="flex items-center gap-1 hover:text-blue-400"
              >
                <ExternalLink size={16} /> Live
              </a>
            )}
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-4 text-white hover:text-red-400"
            >
              <X size={32} />
            </button>

            {/* Image */}
            <img
              src={project.screenshots[index]}
              alt={project.title}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />

            {/* Controls */}
            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full"
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
