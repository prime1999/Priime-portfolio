// next imports
import Image from "next/image";
// images imports
import testimonial1 from "@/public/assets/images/testimonial1.jpeg";
import testimonial2 from "@/public/assets/images/testimonial2.jpeg";
import testimonial3 from "@/public/assets/images/testimonial3.jpeg";
import testimonial4 from "@/public/assets/images/testimonial4.jpeg";
import testimonial5 from "@/public/assets/images/testimonial5.jpeg";
import testimonial6 from "@/public/assets/images/testimonial6.jpeg";

const TESTIMONIAL_PAIRS = [
  { left: testimonial1, right: testimonial2 },
  { left: testimonial3, right: testimonial4 },
  { left: testimonial5, right: testimonial6 },
];

const Testimonials = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-12 p-8 min-h-screen bg-transparent">
      {TESTIMONIAL_PAIRS.map((pair, idx) => (
        /* Added h-[160px] to give absolute children physical layout space */
        <div key={idx} className="w-full max-w-4xl relative h-[160px]">
          {/* Left Stack Item */}
          <div className="absolute top-3 left-3 rotate-12 border-2 border-blue-500 rounded-md shadow-md bg-white overflow-hidden transition-transform duration-300 hover:rotate-0 hover:scale-105">
            <Image
              src={pair.left}
              alt={`Testimonial ${idx * 2 + 1}`}
              width={200}
              height={100}
              className="object-cover rounded-md" /* Fixed "oject" typo */
            />
          </div>

          {/* Right Stack Item */}
          <div className="absolute top-3 right-3 -rotate-12 border-2 border-blue-500 rounded-md shadow-md bg-white overflow-hidden transition-transform duration-300 hover:rotate-0 hover:scale-105">
            <Image
              src={pair.right}
              alt={`Testimonial ${idx * 2 + 2}`}
              width={200}
              height={100}
              className="object-cover rounded-md" /* Fixed "oject" typo */
            />
          </div>
        </div>
      ))}
    </main>
  );
};

export default Testimonials;
