'use client'
import React from 'react';
import doodle from '../../assets/d-round.png';
import sitting from '../../assets/sitting.png';
import curlyarrow from '../../assets/curlyarrow.png';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

function Hero() {
    const handleDownloadCv = async () => {
        try {
            const link = document.createElement('a');
            link.href = 'https://drive.google.com/file/d/1lSWc8eXevyFq_A30JjZLLBSsGNMugChH/view';
            link.download = 'MyCv.pdf';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success('CV downloaded successfully!');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download CV. Please try again.');
        }
    };

    return (
        <section id="home" className="relative overflow-hidden">
            <div className="flex items-center justify-center h-screen w-full px-4 sm:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-between items-center w-full max-w-6xl mx-auto">
                    {/* Left side - Text content */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex gap-2 mt-16 relative z-10"
                    >
                        <motion.div
                            whileHover={{ rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <img
                                className="w-20 mt-14 md:h-48 lg:h-92 sm:h-40"
                                src={curlyarrow.src}
                                alt="decorative arrow"
                            />
                        </motion.div>

                        <div>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
                            >
                                Jr. Front End
                            </motion.h1>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#00ADB5] font-bold"
                            >
                                Developer
                            </motion.h1>

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
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <motion.img
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-0 left-0 z-0 w-full opacity-70"
                            src={doodle.src}
                            alt="background doodle"
                        />

                        <motion.img
                            whileHover={{ scale: 1.03 }}
                            className="h-86 w-86 relative mt-40 mr-40 z-10 transition-all duration-300"
                            src={sitting.src}
                            alt="Profile illustration"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        y: Math.random() * 100 - 50,
                        x: Math.random() * 100 - 50,
                        opacity: 0,
                    }}
                    animate={{
                        y: [0, Math.random() * 100 - 50],
                        x: [0, Math.random() * 100 - 50],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: Math.random() * 5,
                    }}
                    className="absolute rounded-full bg-[#00ADB5] w-2 h-2"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                />
            ))}
        </section>
    );
}

export default Hero;
