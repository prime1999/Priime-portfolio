// Mark as client component to enable React hooks and interactivity
"use client";

// Import Next.js Image component for optimized image loading
import Image from "next/image";
// Import React hooks for state management and side effects
import { useEffect, useRef, useState } from "react";
// Import GSAP for advanced animation capabilities
import gsap from "gsap";
// Import Send icon from lucide-react icon library
import { Send } from "lucide-react";
// Import custom Topbar layout component
import Topbar from "@/components/layouts/Topbar";
// Import reusable Input component from UI library
import { Input } from "@/components/ui/input";
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

// Component for rendering animated text with optional glow effect on hover
const AnimatedText = ({
  text,
  className,
  glowOnHover = false,
}: {
  text: string;
  className: string;
  glowOnHover?: boolean;
}) => {
  // Reference to the container div for accessing letter elements
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect hook to animate text on component mount and handle hover interactions
  useEffect(() => {
    // Exit early if container is not mounted
    if (!containerRef.current) return;

    // Get all individual letter spans from the container
    const letters = containerRef.current.querySelectorAll("span");

    // Animate letters to fade in and slide up on initial render
    gsap.fromTo(
      letters,
      { opacity: 0, y: 20 }, // Starting state: invisible and 20px down
      {
        opacity: 1,
        y: 0, // Final state: visible and in normal position
        duration: 0.5, // Animation takes 0.5 seconds
        stagger: 0.05, // Each letter starts 0.05s after the previous one
        ease: "power2.out", // Smooth easing function
      },
    );

    // Skip hover animations if glow effect is disabled
    if (!glowOnHover) return;

    // Set initial state for hover animations
    gsap.set(letters, {
      y: 0, // Letters start at normal vertical position
      textShadow: "0 0 0 rgba(255,255,255,0)", // No glow initially
      filter: "brightness(1)", // Normal brightness
    });

    // Handler function for when mouse enters the text container
    const handleMouseEnter = () => {
      // Animate all letters with glow effect
      gsap.to(letters, {
        y: -1, // Lift letters up by 1px
        color: "#ffffff", // Ensure text is white
        // Create multi-layer glow effect with multiple text-shadow layers
        textShadow:
          "0 0 6px rgba(255,255,255,0.95), 0 0 14px rgba(255,255,255,0.75), 0 0 26px rgba(255,255,255,0.55)",
        filter: "brightness(1.25)", // Increase brightness by 25%
        duration: 0.35, // Animation takes 0.35 seconds
        stagger: 0.02, // Each letter animates with 0.02s offset
        ease: "power2.out", // Smooth easing
      });
    };

    // Handler function for when mouse leaves the text container
    const handleMouseLeave = () => {
      // Animate back to normal state
      gsap.to(letters, {
        y: 0, // Return to normal vertical position
        textShadow: "0 0 0 rgba(255,255,255,0)", // Remove glow
        filter: "brightness(1)", // Return to normal brightness
        duration: 0.3, // Animation takes 0.3 seconds
        stagger: { each: 0.015, from: "end" }, // Animate from last letter backwards
        ease: "power2.out", // Smooth easing
      });
    };

    // Get container reference
    const container = containerRef.current;

    // Attach event listeners for mouse enter and leave
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup: remove event listeners when component unmounts
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [glowOnHover, text]); // Re-run effect if these dependencies change

  // Render the container and split text into individual letter spans
  return (
    <div ref={containerRef} className={className}>
      {/* Split text into characters and wrap each in a span for individual animation */}
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block">
          {/* Use non-breaking space for spaces to maintain proper spacing */}
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

// Component for an animated input field with typing placeholder effect
const AnimatedInput = () => {
  // State to store the currently displayed placeholder text
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  // Full placeholder text to be typed out character by character
  const fullPlaceholder = "How can I help you?";

  // Effect hook to animate the placeholder text typing effect
  useEffect(() => {
    // Initialize index to track current character position
    let index = 0;

    // Set interval to gradually reveal placeholder text
    const interval = setInterval(() => {
      // Check if we haven't reached the end of the placeholder text
      if (index <= fullPlaceholder.length) {
        // Update displayed placeholder with characters up to current index
        setDisplayedPlaceholder(fullPlaceholder.slice(0, index));
        // Move to next character
        index++;
      } else {
        // Clear interval once all characters are displayed
        clearInterval(interval);
      }
    }, 60); // Add a new character every 60ms

    // Cleanup: clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  // Render the input container with glassmorphic styling
  return (
    <div className="relative mt-12 lg:mt-8 flex items-center gap-2 bg-black w-90 lg:w-120 h-9 rounded-lg font-poppins">
      {/* Text input field with animated placeholder */}
      <Input
        type="text"
        placeholder={displayedPlaceholder}
        className="w-11/12 text-white text-xs font-semibold"
      />
      {/* Send button positioned at the right end of the input */}
      <button
        type="button"
        aria-label="Send message" // Accessibility label for screen readers
        className="absolute right-4 flex items-center justify-center text-white transition cursor-pointer duration-500 hover:text-gray-300"
      >
        {/* Send icon from lucide-react */}
        <Send size={20} />
      </button>
    </div>
  );
};

const page = () => {
  return (
    <main className="h-screen flex items-center justify-center">
      <section className="w-full h-full flex items-center justify-center">
        <div className="h-full relative flex flex-col items-center justify-center font-playwrite">
          <div className="flex flex-col items-center justify-center gap-2 text-white">
            <AnimatedText
              text="Hi there, I'm Priime. Welcome to my"
              className="font-normal mb-4 font-poppins"
              glowOnHover
            />
            <AnimatedText
              text="Portfolio"
              className="mt-2 text-6xl font-bold tracking-widest"
              glowOnHover
            />
            <AnimatedInput />
          </div>
          <div className="absolute bottom-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-lg overflow-visible">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ProjectsModal
                    initialViewId="projects"
                    trigger={
                      <button className="cursor-pointer duration-300 hover:-translate-y-5 hover:scale-90">
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
                <p className="font-poppins text-xs">Projects</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ProjectsModal
                    initialViewId="contact"
                    trigger={
                      <button className="cursor-pointer duration-300 hover:-translate-y-5 hover:scale-90">
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
                <p className="font-poppins text-xs">Contact</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ProjectsModal
                    initialViewId="resume"
                    trigger={
                      <button className="cursor-pointer duration-300 hover:-translate-y-5 hover:scale-90">
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
                <p className="font-poppins text-xs">Resume</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
