"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { toast } from "sonner";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactViewBody = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const validate = () => {
    const next: { [k: string]: string } = {};

    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!emailRegex.test(email)) next.email = "Enter a valid email";
    if (!message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");

    if (!validate()) {
      toast.error("Please fix the form errors before sending.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        toast.error("Message failed to send, Please try again!", {
          position: "top-center",
        });
        throw new Error(data?.message ?? "Message failed to send");
      } else {
        toast.success("Mail sent, priime will get back to you ASAP.", {
          position: "top-center",
        });
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      e.currentTarget.reset();
      return data;
    } catch (error) {
      console.log({ error });
      setStatus("error");
    }
  };
  return (
    <main className="w-full h-full flex items-center justify-center">
      <section className="w-full max-w-2xl p-6 mt-4">
        <h1 className="text-white font-fjalla-one tracking-widest text-xl">
          Need to contact priime?
        </h1>
        <hr className="border-1 border-gray-500 mt-2" />
        <div className="my-4">
          <div className="flex items-center justify-between my-4">
            {" "}
            <div className="flex items-center gap-2 mb-2 p-2 rounded-md bg-blue-500/10 hover:bg-blue-500/20 transition duration-300">
              <Link href="https://www.linkedin.com/in/moshood-yakubu-b7a7b3256/">
                <FaLinkedin className="text-lg text-blue-300" />
              </Link>
            </div>
            <div className="flex items-center gap-2 mb-2 p-2 rounded-md bg-red-500/10 hover:bg-red-500/20 transition duration-300">
              <Link href="https://x.com/iminent_24">
                <FaXTwitter className="text-lg text-white" />
              </Link>
            </div>
            <div className="flex items-center gap-2 mb-2 p-2 rounded-md bg-white/10 hover:bg-white/20 transition duration-300">
              <Link href="https://github.com/prime1999">
                <FaGithub className="text-lg text-white" />
              </Link>
            </div>
            <div className="flex items-center gap-2 mb-2 p-2 rounded-md bg-green-500/10 hover:bg-green-500/20 transition duration-300">
              <Link href="https://wa.me/2347068280718?text=Hi%20Priime%2C%20I%20came%20from%20your%20portfolio">
                <FaWhatsapp className="text-lg text-green-300" />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="size-4 text-blue-300" />
            <p className="text-xs text-white/60">codingprime23@gmail.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-slate-300">Name</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:shadow-md focus:shadow-blue-400/20"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-300">Email</label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:shadow-md focus:shadow-blue-400/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-300">Message</label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-[120px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:shadow-md focus:shadow-blue-400/20"
              placeholder="Write your message..."
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-xs font-medium text-slate-900 cursor-pointer hover:bg-blue-400 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ContactViewBody;
