'use client'

import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";


export default function Home() {
  return (
    <main className="relative dark:bg-black-100 flex flex-col justify-center items-center overflow-hidden mx-auto">
      <div className="w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
