"use client";

import React, { useState } from "react";
import Image from "next/image";
import SceneLoader from "@/components/SceneLoader";
import CustomCursor from "@/components/CustomCursor";
import TiltCard from "@/components/TiltCard";
import { profile, projects, experiences, groups } from "@/lib/data";

export default function Home() {
  const [showHireBar, setShowHireBar] = useState<boolean>(true);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(profile.email);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <>
      {/* Custom Cursor System with magnetic ring & spotlight */}
      <CustomCursor />

      {/* Interactive 3D Canvas Background (Client-only to eliminate hydration warning) */}
      <SceneLoader />

      {/* Site Navigation */}
      <nav className="site-nav">
        <a href="#" className="brand-mark">
          <div className="brand-logo-icon">⚡</div>
          <span>{profile.name}</span>
          <span style={{ color: "rgba(56, 189, 248, 0.7)", fontSize: "0.82rem", fontWeight: 700 }}>
            / {profile.heroYear}
          </span>
        </a>

        <ul className="nav-links">
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#journey" className="nav-link">Journey</a></li>
          <li><a href="#stack" className="nav-link">Capabilities</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>

        <div className="nav-actions">
          <a
            href={`mailto:${profile.email}`}
            className="pill-badge"
            style={{ fontSize: "0.82rem", padding: "0.45rem 1.1rem" }}
          >
            <span>●</span> Available for 2026
          </a>
        </div>
      </nav>

      {/* Main Page Content */}
      <main className="page-wrapper">
        {/* HERO SECTION */}
        <section className="section-container hero-section">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-year">
                PORTFOLIO SHOWCASE · {profile.heroYear} EDITION
              </div>

              <h1 className="display-hero">
                CREATIVE<br />
                PORTFOLIO
              </h1>

              {/* Behance-style Pill Badges */}
              <div className="hero-badges-group">
                <span className="pill-badge" style={{ paddingLeft: "0.45rem", gap: "0.6rem" }}>
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    width={28}
                    height={28}
                    style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "center 15%", border: "1.5px solid #2563eb" }}
                  />
                  {profile.name}
                </span>
                <span className="pill-badge">
                  ⚡ Oracle APEX Developer
                </span>
                <span className="pill-badge dark">
                  🏢 Oracle APEX @ Path Infotech
                </span>
                <span className="pill-badge dark">
                  🧠 RAG & Azure OpenAI
                </span>
              </div>

              <p className="hero-description">
                {profile.intro}
              </p>

              <div className="btn-row">
                <a href="#projects" className="btn-primary">
                  Explore Projects ↓
                </a>
                <a href="/Shubham Updated Resume.pdf" download="Shubham_Anand_Resume.pdf" className="btn-ghost" title="Download Resume PDF">
                  📄 Download Resume
                </a>
                <a href="#contact" className="btn-ghost">
                  Get In Touch →
                </a>
                <button onClick={handleCopyEmail} className="btn-ghost" title="Copy email address">
                  📋 Copy Email
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & PHILOSOPHY SECTION */}
        <section id="about" className="section-container">
          <div className="subheading-tag">
            <span>●</span> 01 / BACKGROUND & VISION
          </div>
          <h2 className="heading-section">
            ABOUT ME & PHILOSOPHY
          </h2>

          <div className="about-grid">
            <div className="about-card-visual">
              <div className="avatar-backdrop-circle" />
              <div className="avatar-frame">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={300}
                  height={300}
                  className="avatar-img"
                  priority
                />
              </div>
            </div>

            <div className="about-text-content">
              <p className="about-lead">
                I bridge the gap between heavy enterprise data systems and modern AI-driven web interfaces.
              </p>
              <p className="about-body">
                Currently at Path Infotech Ltd., I build next-gen web applications that combine Oracle APEX transactional workflows with cutting-edge Retrieval-Augmented Generation (RAG) and Azure OpenAI. My mission is to build software that is both technically bulletproof and visually mesmerizing.
              </p>
              <p className="about-body">
                Whether deploying sub-second vector search across unstructured corporate records, designing high-throughput MongoDB pipelines, or crafting responsive 3D web apps with React and Three.js, every system is engineered for scale, reliability, and impact.
              </p>

              <div className="expertise-tags">
                <span className="exp-tag">🚀 RAG Architecture</span>
                <span className="exp-tag">⚡ Oracle APEX</span>
                <span className="exp-tag">🌐 Next.js & TypeScript</span>
                <span className="exp-tag">🛡️ Enterprise Security</span>
                <span className="exp-tag">🗄️ MongoDB & Oracle DB</span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SHOWCASE */}
        <section id="projects" className="section-container">
          <div className="projects-header">
            <div>
              <div className="subheading-tag">
                <span>●</span> 02 / SELECTED WORK
              </div>
              <h2 className="heading-section">
                PROJECT SHOWCASE
              </h2>
            </div>
            <p style={{ color: "var(--text-muted)", maxWidth: "26rem", fontSize: "0.95rem" }}>
              Selected production applications and systems built with modern web technologies, AI pipelines, and enterprise databases.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((proj) => (
              <TiltCard key={proj.id} maxTilt={8}>
                <div className="project-card">
                  <div className="project-visual-wrapper">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="project-img"
                    />
                    <div className="project-card-header">
                      <span className="project-num-badge">{proj.num}</span>
                      <span className="project-metric-badge">✓ {proj.metrics}</span>
                    </div>
                  </div>

                  <div className="project-card-body">
                    <div>
                      <span style={{ fontSize: "0.78rem", color: "var(--electric-cyan)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {proj.category}
                      </span>
                      <h3 className="project-title">{proj.title}</h3>
                    </div>

                    <p className="project-tagline" style={{ color: "#38bdf8", fontWeight: 600 }}>
                      {proj.tagline}
                    </p>

                    <p className="project-description" style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                      {proj.text}
                    </p>

                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", margin: "0.5rem 0" }}>
                      {proj.features.map((feat, i) => (
                        <li key={i} style={{ fontSize: "0.84rem", color: "#cbd5e1", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                          <span style={{ color: "var(--electric-cyan)", fontWeight: 700 }}>›</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="project-stack-pills">
                      {proj.stack.map((t) => (
                        <span key={t} className="stack-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & JOURNEY TIMELINE */}
        <section id="journey" className="section-container">
          <div className="subheading-tag">
            <span>●</span> 03 / CAREER MILESTONES
          </div>
          <h2 className="heading-section">
            EXPERIENCE & JOURNEY
          </h2>

          <div className="journey-timeline">
            {experiences.map((exp, idx) => (
              <div key={idx} className="journey-card">
                <div className="journey-period">{exp.period}</div>
                <h3 className="journey-role">{exp.role}</h3>
                <div className="journey-company">{exp.company} · {exp.location}</div>
                <p className="journey-desc">{exp.description}</p>
                <ul className="journey-highlights">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CAPABILITIES & TECH STACK */}
        <section id="stack" className="section-container">
          <div className="subheading-tag">
            <span>●</span> 04 / TECHNICAL TOOLKIT
          </div>
          <h2 className="heading-section">
            CAPABILITIES & STACK
          </h2>

          <div className="skills-grid">
            {groups.map((g) => (
              <div key={g.name} className="skill-card">
                <div className="skill-icon-bar" style={{ background: g.color }} />
                <h3 className="skill-group-title">{g.name}</h3>
                <p className="skill-group-desc">{g.description}</p>
                <div className="skill-items-list">
                  {g.items.map((item) => (
                    <span key={item} className="skill-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT / HIRE SHOWCASE */}
        <section id="contact" className="section-container contact-section">
          <div className="contact-card-box">
            <div className="subheading-tag" style={{ justifyContent: "center" }}>
              <span>●</span> 05 / LET&apos;S CONNECT
            </div>
            <h2 className="contact-headline">
              LET&apos;S BUILD SOMETHING EXTRAORDINARY
            </h2>
            <p className="contact-sub">
              Have a product requiring full stack engineering, RAG pipelines, or Oracle enterprise architecture? Let&apos;s talk about what we can create together.
            </p>

            <div className="contact-actions">
              <a href={`mailto:${profile.email}`} className="btn-primary" style={{ padding: "1.1rem 2.6rem", fontSize: "1.05rem" }}>
                Send Direct Email →
              </a>
              <a
                href="/Shubham Updated Resume.pdf"
                download="Shubham_Anand_Resume.pdf"
                className="btn-ghost"
                style={{ padding: "1.1rem 2rem", fontSize: "1.05rem" }}
              >
                📄 Download Resume PDF
              </a>
              <button onClick={handleCopyEmail} className="btn-ghost" style={{ padding: "1.1rem 2rem", fontSize: "1.05rem" }}>
                📋 Copy {profile.email}
              </button>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{ padding: "1.1rem 2rem" }}
              >
                LinkedIn Profile
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{ padding: "1.1rem 2rem" }}
              >
                GitHub Code
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Hire Bar matching Behance modal style */}
      {showHireBar && (
        <div className="hire-floating-bar">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={36}
            height={36}
            className="hire-avatar-thumb"
          />
          <div className="hire-text">
            <span>{profile.name}</span> is available for hire in 2026
          </div>
          <a href={`mailto:${profile.email}`} className="hire-btn-action">
            Hire {profile.name.split(" ")[0]}
          </a>
          <button
            onClick={() => setShowHireBar(false)}
            className="hire-dismiss-btn"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      )}

      {/* Copy Toast notification */}
      {copiedToast && (
        <div className="copy-toast">
          ✓ Email address copied to clipboard!
        </div>
      )}
    </>
  );
}
