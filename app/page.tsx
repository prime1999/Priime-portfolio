"use client";

// Import Next.js Image component for optimized image loading
import Image from "next/image";
// Import React hooks for state management and side effects
import { useRef } from "react";
// Import GSAP for advanced animation capabilities
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Import the Windows-style projects modal
import ProjectsModal from "@/components/ProjectsModal";
// Import Tooltip components for hover tooltips
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Import image assets for portfolio buttons
import contact from "@/public/assets/images/contact.png";
import resume from "@/public/assets/images/resume.png";
import projects from "@/public/assets/images/projects.png";
import skill from "@/public/assets/images/skill.png";
import about from "@/public/assets/images/about.png";

interface FontWeightConfig {
  min: number;
  max: number;
  default: number;
}

const FONT_WEIGHTS: Record<string, FontWeightConfig> = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400,
) => {
  return [...text].map((char: string, index: number) => (
    <span
      key={index}
      className={className}
      style={{
        fontVariationSettings: `"wght" ${baseWeight}`,
        display: "inline-block",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setUpTextHover = (container: HTMLElement | null, type: string) => {
  if (!container) return;

  const letters = container.querySelectorAll<HTMLSpanElement>("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLSpanElement,
    weight: number,
    duration: number = 0.25,
  ) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();

      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000); // Fluid proximity calculation

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  // Resets all letters to their baseline weight when mouse exits the container
  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.4);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  // Clean up all events
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const PortfolioPage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const cleanupTitle = setUpTextHover(titleRef.current, "title");
    const cleanupSubtitle = setUpTextHover(subTitleRef.current, "subtitle");

    return () => {
      cleanupTitle?.();
      cleanupSubtitle?.();
    };
  }, []);

  return (
    <main className="h-screen flex items-center justify-center">
      <section className="w-full h-full flex items-center justify-center">
        <div className="h-full relative flex flex-col items-center justify-center">
          <div id="welcome" className="text-center text-white">
            {/* Fixed typo: changed font-geomara to font-georama */}
            <p ref={subTitleRef} className="block min-h-[40px]">
              {renderText(
                "Hi there, I'm Priime! Welcome to my",
                "text-xl md:text-2xl lg:text-3xl font-georama",
                100,
              )}
            </p>
            <h1 ref={titleRef} className="mt-7 min-h-[130px]">
              {renderText(
                "portfolio",
                "text-7xl lg:text-9xl italic font-georama",
                400,
              )}
            </h1>
          </div>

          <div className="absolute bottom-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-lg overflow-visible">
            {/* About Icon */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ProjectsModal
                    initialViewId="about"
                    trigger={
                      <button className="cursor-pointer duration-300 hover:-translate-y-5 hover:scale-90 focus:outline-none">
                        <Image
                          src={about}
                          alt="About"
                          width={50}
                          height={50}
                          placeholder="blur"
                        />
                      </button>
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-poppins">About</p>
              </TooltipContent>
            </Tooltip>

            {/* Projects Icon */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ProjectsModal
                    initialViewId="projects"
                    trigger={
                      <button className="cursor-pointer duration-300 hover:-translate-y-5 hover:scale-90 focus:outline-none">
                        <Image
                          src={projects}
                          alt="Projects"
                          width={50}
                          height={50}
                          placeholder="blur"
                        />
                      </button>
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-poppins">Projects</p>
              </TooltipContent>
            </Tooltip>

            {/* Contact Icon */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ProjectsModal
                    initialViewId="contact"
                    trigger={
                      <button className="cursor-pointer duration-300 hover:-translate-y-5 hover:scale-90 focus:outline-none">
                        <Image
                          src={contact}
                          alt="Contact"
                          width={50}
                          height={50}
                          placeholder="blur"
                        />
                      </button>
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-poppins">Contact</p>
              </TooltipContent>
            </Tooltip>
            {/* skill Icon */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ProjectsModal
                    initialViewId="skills"
                    trigger={
                      <button className="cursor-pointer duration-300 hover:-translate-y-5 hover:scale-90 focus:outline-none">
                        <Image
                          src={skill}
                          alt="Skills"
                          width={50}
                          height={50}
                          placeholder="blur"
                        />
                      </button>
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-poppins">Skills</p>
              </TooltipContent>
            </Tooltip>

            {/* Resume Icon */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ProjectsModal
                    initialViewId="resume"
                    trigger={
                      <button className="cursor-pointer duration-300 hover:-translate-y-5 hover:scale-90 focus:outline-none">
                        <Image
                          src={resume}
                          alt="Resume"
                          width={50}
                          height={50}
                          placeholder="blur"
                        />
                      </button>
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-poppins">Resume</p>
              </TooltipContent>
            </Tooltip> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
