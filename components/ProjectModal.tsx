"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ProjectItem } from "@/lib/data";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#070b16]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700/50 bg-[#0b1329] p-6 md:p-10 shadow-2xl shadow-blue-900/30 text-slate-100 z-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3.5 py-1 text-xs font-black tracking-wider uppercase bg-blue-600/30 border border-blue-500/50 text-blue-400 rounded-full">
            {project.num}
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-slate-800/80 text-cyan-400 rounded-full border border-slate-700/60">
            {project.category}
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-950/60 text-emerald-400 rounded-full border border-emerald-800/50">
            ✓ {project.metrics}
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-2">
          {project.title}
        </h2>
        <p className="text-base md:text-lg text-cyan-300 font-medium mb-6">
          {project.tagline}
        </p>

        {/* Project Visual */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-slate-700/60 shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Narrative & Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Overview & Architecture
            </h4>
            <p className="text-slate-300 leading-relaxed text-base">
              {project.text}
            </p>

            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 pt-4">
              Key Engineering Features
            </h4>
            <ul className="space-y-2">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-200">
                  <span className="text-cyan-400 font-bold">›</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 bg-[#0f1b3b]/70 p-6 rounded-2xl border border-slate-800/80">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-center text-sm transition-all shadow-md shadow-blue-600/30"
              >
                View Repository / Code
              </a>
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-slate-300 text-center text-sm transition-all border border-slate-700"
              >
                Close Showcase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
