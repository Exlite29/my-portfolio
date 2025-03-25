// "use client";
// import React, { useState, JSX } from "react";
// import {
//     motion,
//     AnimatePresence,
//     useScroll,
//     useMotionValueEvent,
// } from "framer-motion";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { ModeToggle } from "../mode-toggle";
// import { useMediaQuery } from "usehooks-ts";

// export const FloatingNav = ({
//     navItems,
//     className,
// }: {
//     navItems: {
//         name: string;
//         link: string;
//         icon?: JSX.Element;
//     }[];
//     className?: string;
// }) => {
//     const isDesktop = useMediaQuery("(min-width: 1280px)");
//     const { scrollYProgress } = useScroll();

//     // const [visible, setVisible] = useState(false);

//     // useMotionValueEvent(scrollYProgress, "change", (current) => {
//     //     // Check if current is not undefined and is a number
//     //     if (typeof current === "number") {
//     //         let direction = current! - scrollYProgress.getPrevious()!;

//     //         if (scrollYProgress.get() < 0.05) {
//     //             setVisible(false);
//     //         } else {
//     //             if (direction < 0) {
//     //                 setVisible(true);
//     //             } else {
//     //                 setVisible(false);
//     //             }
//     //         }
//     //     }
//     // });

//     return (
//         <AnimatePresence mode="wait">
//             <motion.div
//                 // initial={{
//                 //     opacity: 1,
//                 //     y: -100,
//                 // }}
//                 // animate={{
//                 //     y: visible ? 0 : -100,
//                 //     opacity: visible ? 1 : 0,
//                 // }}
//                 // transition={{
//                 //     duration: 0.2,
//                 // }}
//                 className="max-lg:px-4 z-10 flex items-center -translate-x-2/4 left-2/4 max-w-7xl w-full justify-between absolute top-10"
//             >
//                 <p className="flex text-center text-2xl font-bold tracking-wide">
//                     Ariel Agdon
//                 </p>
//                 {isDesktop && (
//                     <div className={cn(
//                         // "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
//                         className
//                     )}
//                     >
//                         <div className="flex items-center justify-center space-x-14">
//                             {navItems.map((navItem: any, idx: number) => (
//                                 <Link
//                                     key={`link=${idx}`}
//                                     href={navItem.link}
//                                     className={cn(
//                                         "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 font-medium"
//                                     )}
//                                 >
//                                     <span className="block sm:hidden">{navItem.icon}</span>
//                                     <span className="hidden sm:block text-sm">{navItem.name}</span>
//                                 </Link>
//                             ))}
//                             <ModeToggle />
//                         </div>

//                     </div>
//                 )}
//             </motion.div>
//         </AnimatePresence>
//     );
// };

"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
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
                <p className="flex text-center text-2xl font-bold tracking-wide">
                    Ariel Agdon
                </p>
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
                            <ModeToggle />
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};