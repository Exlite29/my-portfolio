"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
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
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll and active section
    useEffect(() => {
        const handleScroll = () => {
            // Update navbar background based on scroll
            setIsScrolled(window.scrollY > 20);

            // Update active section based on scroll position
            const sections = navItems.map(item => item.link.replace("#", ""));

            // Find the section that is currently in view
            const viewportHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            const current = sections.reduce((nearest, section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const offset = rect.top + scrollPosition;
                    const distance = Math.abs(scrollPosition - offset + viewportHeight * 0.3);

                    return nearest.distance > distance
                        ? { section, distance }
                        : nearest;
                }
                return nearest;
            }, { section: sections[0], distance: Infinity }).section;

            if (current) {
                setActiveSection(current);
            }
        };

        const throttledScroll = () => {
            if (!window.requestAnimationFrame) {
                setTimeout(handleScroll, 66);
            } else {
                requestAnimationFrame(handleScroll);
            }
        };

        window.addEventListener("scroll", throttledScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", throttledScroll);
    }, [navItems]);

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
                <motion.h3
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setActiveSection("home");
                    }}
                    className="flex text-center text-xl sm:text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#00ADB5] to-[#009fae] bg-clip-text text-transparent"
                >
                    Ariel A.
                </motion.h3>

                <div className={cn("px-4 py-2 rounded-full", className)}>
                    {isDesktop ? (
                        <div className="flex items-center justify-center space-x-4 sm:space-x-8">
                            {navItems.map((navItem: NavItem, idx: number) => {
                                const isActive = activeSection === navItem.link.replace("#", "");
                                return (
                                    <motion.div
                                        key={`nav-${idx}`}
                                        custom={idx}
                                        variants={itemVariants}
                                    >
                                        <Link
                                            href={navItem.link}
                                            className="relative group"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const sectionId = navItem.link.replace("#", "");
                                                const element = document.getElementById(sectionId);

                                                if (element) {
                                                    const elementPosition = element.getBoundingClientRect().top;
                                                    const offsetPosition = elementPosition + window.pageYOffset - 80;

                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: "smooth"
                                                    });

                                                    setActiveSection(sectionId);
                                                }
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
                                {navItems.map((navItem: NavItem, idx: number) => {
                                    const isActive = activeSection === navItem.link.replace("#", "");
                                    return (
                                        <motion.div
                                            key={`mobile-nav-${idx}`}
                                            variants={itemVariants}
                                            custom={idx}
                                        >
                                            <Link
                                                href={navItem.link}
                                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const sectionId = navItem.link.replace("#", "");
                                                    const element = document.getElementById(sectionId);

                                                    if (element) {
                                                        const elementPosition = element.getBoundingClientRect().top;
                                                        const offsetPosition = elementPosition + window.pageYOffset - 80;

                                                        window.scrollTo({
                                                            top: offsetPosition,
                                                            behavior: "smooth"
                                                        });

                                                        setActiveSection(sectionId);
                                                        setIsMobileMenuOpen(false);
                                                    }
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