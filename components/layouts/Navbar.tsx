"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
// lucide imports for UI components
import { CircleUserRound } from "lucide-react";
// images-import
import logo from "@/public/assets/images/prime_logo_white.png";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Get short weekday abbreviation (e.g., "MON")
      const weekday = now.toLocaleDateString("en-US", { weekday: "short" });

      // Get month and day format (e.g., "June 15")
      const datePart = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

      // Get time component (e.g., "12:54 AM")
      const timePart = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Assemble string matching your target structure exactly
      setCurrentTime(`${weekday} ${datePart}, ${timePart}`);
    };

    // Initialize immediate state on mount
    updateTime();

    // Re-verify matrix every second to ensure minute flips are instantly accounted for
    const timerId = setInterval(updateTime, 1000);

    // Garbage clean on window unmount to keep browser execution pathways lean
    return () => clearInterval(timerId);
  }, []);

  // Avoid rendering anything server side to prevent Hydration Text mismatches
  if (!currentTime) return null;
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-2 md:px-8 py-2 backdrop-blur-xl shadow-sm">
      <div>
        <Image src={logo} alt="prime logo" width={50} height={25} />
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <CircleUserRound size={15} className="text-white" />
        <h6 className="font-poppins tracking-wider text-white text-xs">
          {currentTime}
        </h6>
      </div>
    </nav>
  );
};

export default Navbar;
