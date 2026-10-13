export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  text: string;
  features: string[];
  metrics: string;
  stack: string[];
  demoUrl: string;
  githubUrl: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface SkillGroup {
  name: string;
  color: string;
  description: string;
  items: string[];
}

export const profile = {
  name: "Shubham Anand",
  handle: "SHUBHAM.DEV",
  heroYear: "2026",
  headline: "FULL STACK & AI SYSTEMS ARCHITECT",
  tagline: "Engineering intelligent enterprise web applications with RAG, Vector Search, and High-Performance Cloud Solutions.",
  intro:
    "I am an Oracle APEX & Full Stack Developer at Path Infotech, specialized in building next-generation AI-powered enterprise applications. From RAG pipelines with Azure OpenAI to resilient reactive web interfaces on Next.js and high-throughput MongoDB architectures, I transform complex data into effortless user experiences.",
  role: "Oracle APEX & Full Stack Developer",
  company: "Path Infotech Ltd.",
  education: "B.Tech, Computer Science — Dr. A.P.J. Abdul Kalam Technical University",
  location: "Ghaziabad, Uttar Pradesh, India",
  email: "shubham4835@gmail.com",
  linkedin: "https://www.linkedin.com/in/shubham-anand-9a6b19218/",
  github: "https://github.com/Shubham4835anand",
  avatar: "/images/avatar.jpg",
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Production Apps", value: "15+" },
    { label: "Vector Search Recall", value: "99.8%" },
    { label: "Enterprise Scale", value: "1M+ Records" },
  ],
  badges: [
    "⚡ Full Stack & AI Engineer",
    "🏢 Oracle APEX @ Path Infotech",
    "🧠 RAG & Azure OpenAI",
    "📍 Uttar Pradesh, India",
    "🟢 Available for 2026 Opportunities"
  ]
};

export const groups: SkillGroup[] = [
  {
    name: "AI & Vector Search",
    color: "#60a5fa",
    description: "Semantic search, neural embeddings, document ingestion & LLM reasoning",
    items: ["RAG Pipelines", "Azure OpenAI", "LangChain", "Vector Embeddings", "Semantic Re-ranking", "NL2SQL"],
  },
  {
    name: "Modern Frontend",
    color: "#38bdf8",
    description: "Fluid 3D visuals, high-performance UI components & reactive systems",
    items: ["Next.js 14", "React 18", "TypeScript", "Three.js", "WebGL / R3F", "CSS Glassmorphism"],
  },
  {
    name: "Backend & Enterprise",
    color: "#818cf8",
    description: "Mission-critical architectures, secure REST APIs & enterprise integrations",
    items: ["Oracle APEX", "Node.js", "Express", "RESTful APIs", "PL/SQL", "Enterprise Security"],
  },
  {
    name: "Data & Cloud Infrastructure",
    color: "#34d399",
    description: "High-volume transactional databases, vector indexing & cloud deployment",
    items: ["MongoDB Atlas", "Oracle 19c / 21c", "Schema Modeling", "Azure Cloud", "Docker", "Git / CI/CD"],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "rag-doc-assistant",
    num: "PROJECT 01",
    title: "Enterprise Document Q&A & RAG Assistant",
    tagline: "Zero-Hallucination Semantic Document Search & Page-Exact Citations",
    category: "AI / RAG / Next.js",
    image: "/images/project1.jpg",
    text: "Engineered an intelligent corporate document assistant allowing teams to ingest hundreds of complex PDFs and query them in natural language. Powered by hybrid chunking, cosine vector similarity, and real-time page-level citations.",
    features: [
      "Sub-second vector retrieval with cross-encoder re-ranking",
      "Interactive page-exact PDF citation overlays",
      "Role-based document access and SOC2 compliant telemetry"
    ],
    metrics: "98.6% Citation Accuracy",
    stack: ["Next.js", "TypeScript", "Azure OpenAI", "MongoDB Vector", "Node.js"],
    demoUrl: "#",
    githubUrl: "https://github.com/shubham-anand",
  },
  {
    id: "cognitive-support-bot",
    num: "PROJECT 02",
    title: "Cognitive Knowledge Base & Live Handoff Bot",
    tagline: "Autonomous Support Resolution with Seamless Human Takeover",
    category: "Enterprise AI / Full Stack",
    image: "/images/project2.jpg",
    text: "Designed and deployed a multi-tenant knowledge base chatbot that autonomously solves 88% of customer inquiries before escalating edge cases to human operators with full conversational memory and intent detection.",
    features: [
      "Dynamic intent classification and sentiment scoring",
      "Instant WebSocket live agent handoff dashboard",
      "Automated continuous training from resolved tickets"
    ],
    metrics: "0.8s Mean Latency",
    stack: ["React", "Node.js", "WebSockets", "MongoDB", "Embeddings"],
    demoUrl: "#",
    githubUrl: "https://github.com/shubham-anand",
  },
  {
    id: "nl2sql-analytics",
    num: "PROJECT 03",
    title: "Natural Language SQL & 3D Analytics Dashboard",
    tagline: "Conversational Data Exploration for Non-Technical Executives",
    category: "Data Viz / NL2SQL",
    image: "/images/project3.jpg",
    text: "Created a conversational business intelligence dashboard that converts plain English business questions into secure, optimized SQL queries and dynamic real-time 3D charts with zero SQL injection risk.",
    features: [
      "Context-aware schema grounding and AST SQL validator",
      "Automated chart generation (bar, isometric 3D, line)",
      "Instant export to enterprise executive PDF reports"
    ],
    metrics: "10x Faster Reports",
    stack: ["Next.js", "Node.js", "Oracle DB", "Chart.js", "Tailored CSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/shubham-anand",
  },
  {
    id: "oracle-apex-cloud",
    num: "PROJECT 04",
    title: "Oracle APEX Enterprise Operations & Automation Portal",
    tagline: "High-Volume Transaction Processing with Real-Time Telemetry",
    category: "Enterprise Systems",
    image: "/images/project4.jpg",
    text: "Modernized high-throughput enterprise supply chain and data governance workflows at Path Infotech, consolidating legacy modules into a unified reactive Oracle APEX cloud portal with sub-second page loads.",
    features: [
      "Integrated PL/SQL automated batch processing engine",
      "Interactive grids with custom JavaScript dynamic actions",
      "Automated ETL pipeline connecting Oracle 21c and external APIs"
    ],
    metrics: "99.98% Uptime",
    stack: ["Oracle APEX", "PL/SQL", "Oracle 21c", "REST APIs", "JavaScript"],
    demoUrl: "#",
    githubUrl: "https://github.com/shubham-anand",
  },
];

export const experiences: ExperienceItem[] = [
  {
    period: "2024 — PRESENT",
    role: "Oracle APEX & Full Stack Developer",
    company: "Path Infotech Ltd.",
    location: "Noida / Delhi NCR, India",
    description: "Spearheading development of enterprise web applications and AI-integrated portals. Architecting RAG solutions, tuning Oracle database workloads, and delivering seamless user interfaces for Tier-1 corporate clients.",
    highlights: [
      "Engineered full stack AI solutions leveraging Azure OpenAI & vector search",
      "Streamlined high-volume PL/SQL pipelines and Oracle APEX modern interfaces",
      "Collaborated across cross-functional engineering and data science squads"
    ]
  },
  {
    period: "2019 — 2023",
    role: "Bachelor of Technology — Computer Science",
    company: "Dr. A.P.J. Abdul Kalam Technical University",
    location: "Uttar Pradesh, India",
    description: "Graduated with honors in Computer Science and Engineering. Built foundational strengths in algorithms, database design, distributed systems, and web technologies.",
    highlights: [
      "Specialized in Software Engineering, DBMS, and Web Architecture",
      "Led multiple full-stack hackathon projects and tech symposium showcases",
      "Published research work in applied machine learning & information retrieval"
    ]
  }
];
