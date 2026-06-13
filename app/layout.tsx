import type { Metadata } from "next";
import { Poppins, Fjalla_One, Playwrite_CA } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["400"],
});

const fjallaOne = Fjalla_One({
  variable: "--fjalla-one",
  subsets: ["latin"],
  weight: ["400"],
});
const playwrite = Playwrite_CA({
  variable: "--playwrite",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Priime",
  description:
    "Welcome to my portfolio! I'm Priime, a passionate web developer specializing in crafting stunning and responsive websites. Explore my projects and skills to see how I can bring your ideas to life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backgroundImages = [
    "/assets/images/bg1.jpg",
    "/assets/images/bg2.jpg",
    "/assets/images/bg3.jpg",
    "/assets/images/bg4.png",
    "/assets/images/bg5.jpg",
  ];

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${fjallaOne.variable} ${playwrite.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col w-screen overflow-x-hidden bg-black">
        <TooltipProvider>
          <div aria-hidden="true" className="background-slideshow">
            {backgroundImages.map((image, index) => (
              <div
                key={image}
                className="background-slideshow__slide"
                style={{
                  backgroundImage: `url(${image})`,
                  animationDelay: `${index * 5}s`,
                }}
              />
            ))}
            <div className="background-slideshow__overlay" />
          </div>
          <div className="relative z-10 flex min-h-full flex-col">
            {children}
          </div>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
