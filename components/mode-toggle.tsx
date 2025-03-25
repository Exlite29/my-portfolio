"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <Button variant="default" size="icon" onClick={toggleTheme}>
            <div className="relative h-[1.2rem] w-[1.2rem]">
                <AnimatePresence mode="wait">
                    {theme === "light" ? (
                        <motion.div
                            key="sun"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        >
                            <Moon className="h-[1.2rem] w-[1.2rem]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}