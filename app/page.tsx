'use client'

import { ContactLauncher } from "@/components/contact/ContactLauncher";
import { HybridWorkspace } from "@/components/portfolio/HybridWorkspace";
import { Footer } from "@/components/sections/footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

/**
 * Homepage v2 — hybrid 3D workspace.
 * Hero/About/Skills content is preserved inside ResumePanel; contact is now
 * a floating chat launcher (components/contact) reusing /api/contact.
 * The standalone section components remain in components/sections for
 * reuse/fallback.
 */
export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center mx-auto dark:bg-black-100">
      <div className="w-full">
        <FloatingNav navItems={navItems} />
        <HybridWorkspace />
        <Footer />
      </div>
      <ContactLauncher />
    </main>
  );
}
