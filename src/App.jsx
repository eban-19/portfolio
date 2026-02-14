import { useState } from "react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

import Projects from "./components/Projects";
import Logo from "./assets/logo.png";

export default function App() {

  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md z-50 shadow-md">
  <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
    
    {/* Logo */}
    <a href="#" className="flex items-center gap-3">
      <img
        src={Logo}
        alt="Eban.dev logo"
        className="h-10 w-10 object-contain"
      />
      <span className="text-2xl font-bold text-white tracking-wide">
        Eban.dev
      </span>
    </a>

    {/* Desktop Links */}
    <div className="hidden md:flex space-x-6 text-sm font-medium">
      <a href="#about" className="hover:text-blue-400 transition">About</a>
      <a href="#skills" className="hover:text-blue-400 transition">Skills</a>
      <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
      <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
    </div>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden text-white"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <X size={26} /> : <Menu size={26} />}
    </button>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden bg-gray-900 px-6 pb-4 flex flex-col gap-4 text-sm font-medium">
      <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
      <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
      <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
      <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
    </div>
  )}
</nav>


      {/* Hero */}
      <section className="pt-32 pb-32 text-center bg-gradient-to-r from-blue-900 via-gray-950 to-black">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white">
          Full-Stack Web Developer
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg md:text-xl">
          I build secure, scalable, and user-friendly applications with clean
          architecture and modern design.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <a
            href="#projects"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-gray-700 hover:border-blue-400 rounded-xl font-semibold shadow-lg transition"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-6 text-center md:text-left">
            About Me
          </h3>
          <p className="text-gray-400 leading-relaxed">
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
      </section>

      {/* Skills */}
      <section id="skills" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-10 text-center">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
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
            ].map((skill) => (
              <div
                key={skill}
                className="bg-gray-800 rounded-2xl p-4 text-center hover:bg-blue-600 transition"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <Projects />

      {/* Contact */}
      <section id="contact" className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Contact Me</h3>
          <p className="text-gray-400 mb-8">
            Let’s build something meaningful together.
          </p>
          <div className="flex justify-center gap-8">
            <a
              href="https://github.com/eban-19"
              className="hover:text-blue-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com/"
              className="hover:text-blue-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:ebisasutuma@gmail.com"
              className="hover:text-blue-400 transition"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-sm text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
}
