"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { ModeToggle } from "../mode-toggle";
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
    const isDesktop = useMediaQuery("(min-width: 1280px)");

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="max-lg:px-4 z-10 flex items-center -translate-x-2/4 left-2/4 max-w-7xl w-full justify-between absolute top-10"
            >
                <h3 className="hidden lg:flex text-center text-2xl font-stretch-100% tracking-wide">
                    Ariel A.
                </h3>
                {isDesktop && (
                    <div className={cn(className)}>
                        <div className="flex items-center justify-center space-x-14">
                            {navItems.map((navItem: NavItem, idx: number) => (
                                <Link
                                    key={`link-${idx}`}
                                    href={navItem.link}
                                    className={cn(
                                        "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 font-medium"
                                    )}
                                >
                                    <span className="block sm:hidden">{navItem.icon}</span>
                                    <span className="hidden sm:block text-sm">{navItem.name}</span>
                                </Link>
                            ))}
                            {/* <ModeToggle /> */}
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};