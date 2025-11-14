'use client'
import React, { useCallback } from 'react';
import doodle from '../../assets/d-round.png';
import sitting from '../../assets/sitting.png';
import curlyarrow from '../../assets/curlyarrow.png';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

function Hero() {
    const handleDownloadCv = useCallback(async () => {
        try {
            const link = document.createElement('a');
            link.href = 'https://drive.google.com/file/d/1lSWc8eXevyFq_A30JjZLLBSsGNMugChH/view';
            link.download = 'MyCv.pdf';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success('CV downloaded successfully!');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download CV. Please try again.');
        }
    }, []);

    return (
        <section id="home" className="relative overflow-hidden min-h-screen">
            <div className="flex items-center justify-center min-h-screen w-full px-4 sm:px-8 py-20 sm:py-0">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-between items-center w-full max-w-6xl mx-auto relative">
                    {/* Left side - Text content */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="flex gap-2 relative z-10 w-full lg:w-auto"
                    >
                        <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ type: 'spring', stiffness: 300, duration: 1 }}
                            className="relative"
                        >
                            <motion.img
                                className="w-16 sm:w-20 mt-14 md:h-48 lg:h-92 sm:h-40"
                                src={curlyarrow.src}
                                alt="decorative arrow"
                                animate={{
                                    x: [0, -5, 5, 0],
                                    rotate: [0, -5, 5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Jr. Front End
                                </motion.h1>

                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#00ADB5] bg-clip-text"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Developer
                                </motion.h1>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="flex flex-col sm:flex-row mt-14 gap-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-[#00ADB5] text-white font-bold rounded-3xl shadow-lg hover:bg-[#007F87] transition-all duration-300"
                                >
                                    <a href="#contact"> Hire me</a>
                                </motion.button>

                                <motion.button
                                    onClick={handleDownloadCv}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-[#393E46] text-white font-bold rounded-3xl flex items-center gap-2 shadow-lg hover:bg-[#2C3136] transition-all duration-300"
                                >
                                    View my CV <Download className="w-5 h-5" />
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right side - Image */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="relative hidden lg:block"
                    >
                        <motion.img
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 2, -2, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-0 left-0 z-0 w-full opacity-70 blur-[1px]"
                            src={doodle.src}
                            alt="background doodle"
                        />

                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                            }}
                        >
                            <motion.img
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 1, -1, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="h-86 w-86 relative mt-40 mr-40 z-10 transition-all duration-300 drop-shadow-2xl"
                                src={sitting.src}
                                alt="Profile illustration"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        y: Math.random() * 100 - 50,
                        x: Math.random() * 100 - 50,
                        scale: 0,
                        opacity: 0,
                    }}
                    animate={{
                        y: [0, Math.random() * 150 - 75],
                        x: [0, Math.random() * 150 - 75],
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: Math.random() * 8 + 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                    }}
                    className="absolute rounded-full bg-gradient-to-r from-[#00ADB5] to-[#008891]"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        filter: 'blur(1px)',
                        willChange: 'transform'
                    }}
                />
            ))}
        </section>
    );
}

export default Hero;
