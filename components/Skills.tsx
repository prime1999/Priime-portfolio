import React from "react";

interface StackItem {
  category: string;
  technologies: string[];
}

const STACK_DATA: StackItem[] = [
  {
    category: "Frontend",
    technologies: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Styling",
    technologies: ["Tailwind CSS", "GSAP", "Framer-Motion", "CSS"],
  },
  {
    category: "Backend",
    technologies: [
      "Node.js",
      "Express",
      "Solidity",
      "Supabase",
      "Appwrite",
      "Firebase",
    ],
  },
  {
    category: "Database",
    technologies: ["PostgreSQL", "MongoDB"],
  },
  {
    category: "Dev Tools",
    technologies: ["Foundry", "Forge", "Git", "GitHub", "Docker"],
  },
];

const Skills = () => {
  const totalStacks = STACK_DATA.length;

  return (
    <div className="w-full max-w-2xl font-mono text-sm p-2 text-white/[0.8]">
      {/* Terminal Command Line Header */}
      <div className="mb-8 flex items-center gap-1">
        <span className="font-bold">@priime</span>
        <span className="text-white/20">%</span>
        <span className="ml-1">show tech stack</span>
      </div>

      {/* Grid Table */}
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-[30px_150px_1fr] px-2 py-1 text-white/70">
          <div></div>
          <div>Category</div>
          <div>Technologies</div>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-dashed border-neutral-300" />

        {/* Table Body rows */}
        <div className="space-y-3">
          {STACK_DATA.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[30px_130px_1fr] items-center px-2"
            >
              {/* Checkmark Icon */}
              <div className="text-[#0802bc]">
                <svg
                  className="h-4 w-4 stroke-[2.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>

              {/* Category Name */}
              <span className="font-bold text-[#0802bc] my-1">
                {row.category}
              </span>

              {/* Technologies List */}
              <span className="text-white/80">
                {row.technologies.join(", ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-dashed border-neutral-300" />

      {/* Terminal Footer Metas */}
      <div className="space-y-2 px-2">
        {/* Success Counter Row */}
        <div className="flex items-center gap-4 text-[#0802bc]">
          <div className="w-[14px]">
            <svg
              className="h-4 w-4 stroke-[2.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <span className="font-semibold">
            {totalStacks} of {totalStacks} stacks loaded successfully (100%)
          </span>
        </div>

        {/* Performance Render Time Row */}
        <div className="flex items-center gap-4 text-white/80">
          {/* Custom solid Flag Icon matching image */}
          <div className="w-[14px] flex justify-center">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M4.5 3A.75.75 0 015 3.75V12h11.25a.75.75 0 01.6.3l.625.833A2.75 2.75 0 0019.7 14.25h.55a.75.75 0 010 1.5h-.55a4.25 4.25 0 01-3.435-1.742L15.9 13.5H5v6.75a.75.75 0 01-1.5 0v-16.5A.75.75 0 014.5 3z" />
            </svg>
          </div>
          <span>Render time: 4ms</span>
        </div>
      </div>
    </div>
  );
};

export default Skills;
