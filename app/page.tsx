'use client'

import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";


export default function Home() {
  return (
    <main className="relative dark:bg-black-100 flex flex-col justify-center items-center overflow-hidden mx-auto">
      <div className="w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <About />
      </div>
    </main>
  );
}
