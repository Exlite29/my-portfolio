"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { activateScene, deactivateScene, setChatOpen, useActiveSceneId } from "@/lib/scene-store";
import { suppressScrollUntilScrollEnd } from "@/hooks/use-scene-sync";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

interface NavItem {
    name: string;
    link: string;
    icon?: React.JSX.Element;
}

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: NavItem[];
    className?: string;
}) => {
    // initializeWithValue: false — reading matchMedia synchronously during the
    // first client render SSRs the mobile tree (isDesktop=false) while desktop
    // clients render the desktop tree -> hydration mismatch. The hook now
    // starts false (matching SSR) and syncs after mount.
    const isDesktop = useMediaQuery("(min-width: 768px)", { initializeWithValue: false });
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navbar background only — the active item is derived from the 3D scene
    // store below (single source of truth shared with the camera; no second
    // scroll-spy running layout on every scroll event).
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Nav highlight mirrors the camera: overview = Home, project:* anchors
    // = Projects, section ids = their nav item, contact = Contact.
    const activeSceneId = useActiveSceneId();
    const activeSection = !activeSceneId
        ? "home"
        : activeSceneId.startsWith("project:")
          ? "projects"
          : activeSceneId;

    /**
     * Shared nav behavior for desktop links, mobile menu items and the brand.
     * Desktop/mobile copies of this logic used to drift apart; now they can't.
     */
    const goToSection = useCallback((link: string, closeMenu = false) => {
        const sectionId = link.replace("#", "");
        const element = document.getElementById(sectionId);

        // Contact now lives in the chat launcher, not an in-page section.
        if (sectionId === "contact" && !element) {
            setChatOpen(true, "dom");
            if (closeMenu) setIsMobileMenuOpen(false);
            return;
        }

        // Scroll under the floating nav.
        if (element) {
            const offsetPosition =
                element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }

        // Drive nav + 3D camera from the same store. The scroll observers are
        // suppressed until the smooth scroll settles so intermediate sections
        // don't blink the camera.
        suppressScrollUntilScrollEnd();
        if (sectionId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            deactivateScene("dom");
        } else if (sectionId === "about" || sectionId === "skills") {
            activateScene(sectionId, "dom");
        } else if (sectionId === "projects") {
            activateScene("project:dujas", "dom");
        }

        if (closeMenu) setIsMobileMenuOpen(false);
    }, []);

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.4
            }
        })
    };

    // Brand click mirrors the footer's goHome: smooth scroll + scene reset.
    const goHome = useCallback(() => {
        suppressScrollUntilScrollEnd();
        window.scrollTo({ top: 0, behavior: "smooth" });
        deactivateScene("dom");
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={navVariants}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 transition-all duration-300",
                    isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
                )}
            >
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goHome}
                    aria-label="Back to top — Ariel A. home"
                    className="flex text-center text-xl sm:text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#00ADB5] to-[#009fae] bg-clip-text text-transparent"
                >
                    Ariel A.
                </motion.button>

                <div className={cn("px-4 py-2 rounded-full", className)}>
                    {isDesktop ? (
                        <div className="flex items-center justify-center space-x-4 sm:space-x-8">
                            {navItems.map((navItem: NavItem) => {
                                const sectionId = navItem.link.replace("#", "");
                                const isActive = activeSection === sectionId;
                                return (
                                    <motion.div
                                        key={navItem.name}
                                        custom={navItems.indexOf(navItem)}
                                        variants={itemVariants}
                                    >
                                        <Link
                                            href={navItem.link}
                                            className="relative group"
                                            aria-current={isActive ? "true" : undefined}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                goToSection(navItem.link);
                                            }}
                                        >
                                            <div className="flex items-center space-x-2">
                                                {navItem.icon && (
                                                    <span className="text-lg sm:text-base">{navItem.icon}</span>
                                                )}
                                                <span className={cn(
                                                    "text-sm font-medium transition-colors duration-300",
                                                    isActive
                                                        ? "text-[#00ADB5]"
                                                        : "text-gray-600 dark:text-gray-300 hover:text-[#00ADB5] dark:hover:text-[#00ADB5]"
                                                )}>
                                                    {navItem.name}
                                                </span>
                                            </div>

                                            {/* Animated underline */}
                                            <motion.span
                                                className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00ADB5] rounded-full"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: isActive ? 1 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </motion.button>
                    )}
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {!isDesktop && isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg rounded-b-2xl mt-2 py-4 px-6"
                        >
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05 } }
                                }}
                                className="flex flex-col space-y-4"
                            >
                                {navItems.map((navItem: NavItem) => {
                                    const sectionId = navItem.link.replace("#", "");
                                    const isActive = activeSection === sectionId;
                                    return (
                                        <motion.div
                                            key={navItem.name}
                                            variants={itemVariants}
                                            custom={navItems.indexOf(navItem)}
                                        >
                                            <Link
                                                href={navItem.link}
                                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                aria-current={isActive ? "true" : undefined}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    goToSection(navItem.link, true);
                                                }}
                                            >
                                                {navItem.icon && (
                                                    <span className="text-xl">{navItem.icon}</span>
                                                )}
                                                <span className={cn(
                                                    "font-medium",
                                                    isActive
                                                        ? "text-[#00ADB5]"
                                                        : "text-gray-600 dark:text-gray-300"
                                                )}>
                                                    {navItem.name}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};