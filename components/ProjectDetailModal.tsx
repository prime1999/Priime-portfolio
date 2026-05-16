"use client";

// next-imports
import Image from "next/image";
import Link from "next/link";
// types-imports
import { ProjectDetailModalProps } from "@/lib/types";

export default function ProjectDetailModal({
  project,
}: ProjectDetailModalProps) {
  return (
    <div className="flex min-h-150 h-full w-full flex-col text-slate-100">
      <div className="relative h-64 w-full overflow-hidden border-b border-white/10 bg-slate-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/25 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/70">
            Project Details
          </p>
          <h1 className="font-fjalla-one mt-2 text-3xl font-bold text-white">
            {project.title}
          </h1>
        </div>

        <div className="font-poppins text-xs space-y-1">
          <p className="leading-7 text-slate-300/85">{project.about}</p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <Link
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-xs font-poppins rounded-xl font-semibold bg-blue-500 text-slate-950 hover:bg-blue-400"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
}
