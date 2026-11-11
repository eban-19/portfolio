export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    skills: [
      {
        name: "React",
        role: "Library",
        glowColor: "rgba(97, 218, 251, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
            <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
          </svg>
        ),
      },
      {
        name: "JavaScript",
        role: "Language",
        glowColor: "rgba(247, 223, 30, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <rect width="24" height="24" rx="4" fill="#F7DF1E" />
            <path fill="#000000" d="M6.3 18.2l1.9-1.2c.4.7.8 1.3 1.6 1.3.8 0 1.3-.3 1.3-1.1V10h2.4v7.3c0 2.2-1.3 3.2-3.4 3.2-1.9 0-3.1-1-3.8-2.3zm8.3 0l1.9-1.1c.5.8 1.2 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.8-3-3.6 0-1.8 1.4-3.2 3.5-3.2 1.6 0 2.7.6 3.4 1.9l-1.8 1.2c-.4-.7-.9-1-1.6-1-.7 0-1.2.4-1.2 1 0 .7.5 1 1.5 1.4l.6.3c2.1.9 3.3 1.9 3.3 3.8 0 2.1-1.6 3.4-3.9 3.4-2.1 0-3.4-1-4.1-2.4z" />
          </svg>
        ),
      },
      {
        name: "Tailwind CSS",
        role: "Styling",
        glowColor: "rgba(56, 189, 248, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#38BDF8">
            <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2-1.1 3-.9.6.1 1 .5 1.5 1 1 1 2 2.3 4.5 2.3 2.4 0 3.9-1.2 4.5-3.6-1 .8-2 1.1-3 .9-.6-.1-1-.5-1.5-1-1-1-2-2.3-4.5-2.3zm-6 6c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2-1.1 3-.9.6.1 1 .5 1.5 1 1 1 2 2.3 4.5 2.3 2.4 0 3.9-1.2 4.5-3.6-1 .8-2 1.1-3 .9-.6-.1-1-.5-1.5-1-1-1-2-2.3-4.5-2.3z" />
          </svg>
        ),
      },
      {
        name: "HTML5",
        role: "Markup",
        glowColor: "rgba(227, 79, 38, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path fill="#E34F26" d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0z" />
            <path fill="#EF652A" d="M12 22l7.1-2.3 1.6-17.7H12V22z" />
            <path fill="#ECECEC" d="M12 9.5H8.3l-.2-2.5H12V4.7H5.6l.7 7.2H12V9.5zm0 6.6l-3.2-1-.2-2.2H6.1l.4 4.3 5.5 1.8v-2.9z" />
            <path fill="#FFFFFF" d="M12 9.5v2.4h3.5l-.3 3.7-3.2 1v2.9l5.5-1.8.7-7.8H12V4.7h6.4l-.2 2.4h-6.2v2.4z" />
          </svg>
        ),
      },
      {
        name: "CSS3",
        role: "Styling",
        glowColor: "rgba(21, 114, 182, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path fill="#1572B6" d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0z" />
            <path fill="#33A9DC" d="M12 22l7.1-2.3 1.6-17.7H12V22z" />
            <path fill="#ECECEC" d="M12 9.5H8.4l-.2-2.5H12V4.7H5.6l.7 7.2H12V9.5zm0 6.6l-3.2-1-.2-2.2H6.1l.4 4.3 5.5 1.8v-2.9z" />
            <path fill="#FFFFFF" d="M12 9.5v2.4h3.5l-.3 3.7-3.2 1v2.9l5.5-1.8.7-7.8H12V4.7h6.4l-.2 2.4h-6.2v2.4z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & Architecture",
    skills: [
      {
        name: "Node.js",
        role: "Runtime",
        glowColor: "rgba(95, 160, 78, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path fill="#5FA04E" d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" />
            <path fill="#FFFFFF" d="M12 6.5l5.5 3.2v6.4L12 19.3l-5.5-3.2V9.7L12 6.5z" />
            <path fill="#5FA04E" d="M12 8.5l3.8 2.2v4.4L12 17.3l-3.8-2.2v-4.4L12 8.5z" />
          </svg>
        ),
      },
      {
        name: "Express",
        role: "Framework",
        glowColor: "rgba(226, 232, 240, 0.3)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <rect width="24" height="24" rx="5" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <text x="12" y="16.5" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ex</text>
          </svg>
        ),
      },
      {
        name: "C#",
        role: "Language",
        glowColor: "rgba(155, 73, 147, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <rect width="24" height="24" rx="5" fill="#68217A" />
            <text x="12" y="16.5" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">C#</text>
          </svg>
        ),
      },
    ],
  },
  {
    id: "database-tools",
    title: "Databases & DevOps",
    skills: [
      {
        name: "MongoDB",
        role: "NoSQL DB",
        glowColor: "rgba(71, 162, 72, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
            <path fill="#47A248" d="M12 1.5c-.4 1.3-4.5 7.1-4.5 11.5 0 3.7 2.5 6.7 4.5 8.5 2-1.8 4.5-4.8 4.5-8.5 0-4.4-4.1-10.2-4.5-11.5z" />
            <path fill="#499D4A" d="M12 21.5v-20c.4 1.3 4.5 7.1 4.5 11.5 0 3.7-2.5 6.7-4.5 8.5z" />
            <path fill="#FFFFFF" d="M12 19.8c-.2 0-.3-.1-.3-.3V3.5c0-.2.2-.4.4-.2 1.2 1.2 3.9 5.3 3.9 9.2 0 3.2-1.9 5.8-3.7 7.2-.1 0-.2.1-.3.1z" opacity="0.3" />
          </svg>
        ),
      },
      {
        name: "MySQL",
        role: "Relational DB",
        glowColor: "rgba(0, 117, 143, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" fill="#00758F" />
            <path fill="#FFFFFF" d="M7 8h3l2 4 2-4h3v8h-2.5v-4.5L12.8 15h-1.6L9.5 11.5V16H7V8z" />
          </svg>
        ),
      },
      {
        name: "Git",
        role: "Version Control",
        glowColor: "rgba(240, 80, 50, 0.4)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#F05032">
            <path d="M21.6 10.4l-8-8c-.8-.8-2-.8-2.8 0L9.2 4l3.5 3.5c.8-.3 1.8-.1 2.4.6.7.7.8 1.7.5 2.5l3.4 3.4c.8-.3 1.8-.2 2.5.5.9 1 .9 2.5 0 3.5s-2.5.9-3.5 0c-.8-.8-.9-1.9-.5-2.8L13.8 11v4.8c.4.3.7.8.8 1.4.3 1.4-.7 2.8-2.1 3-1.4.3-2.8-.7-3-2.1-.3-1.4.7-2.8 2.1-3 .4-.1.8 0 1.2.1v-5c-.4-.1-.8-.2-1.2-.1-1.4.3-2.8-.7-3-2.1-.2-.9.2-1.8.8-2.4L2.4 10.4c-.8.8-.8 2 0 2.8l8 8c.8.8 2 .8 2.8 0l8.4-8.4c.8-.8.8-2 0-2.4z" />
          </svg>
        ),
      },
      {
        name: "GitHub",
        role: "DevOps & CI",
        glowColor: "rgba(255, 255, 255, 0.35)",
        icon: (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#FFFFFF">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        ),
      },
    ],
  },
];
