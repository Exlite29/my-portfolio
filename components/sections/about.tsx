'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef } from 'react';
import notes from '../../assets/musicnotes.png';
import doodleItems from '../../assets/doodleitems.png';
import work from '../../assets/Group62.png';
import lightbulb from '../../assets/lightbulb.png';
import vector from '../../assets/Vector186.png';

// Animation variants
const fadeInLeft = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8 }
};

const fadeInRight = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8 }
};

const floatingAnimation = {
    animate: {
        y: [0, -10, 0],
        rotate: [0, 10, -5, 0]
    },
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    // Interactive text animation
    const words = "Hi, I'm Ariel – a passionate Jr. Front End Developer dedicated to turning design ideas into interactive, user-friendly websites. Let's build something amazing together!".split(" ");

    return (
        <section
            id='about'
            className="flex justify-center items-center py-16 px-4 sm:px-8 lg:px-16 overflow-hidden"
            ref={containerRef}
        >
            <motion.div
                className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-6xl"
                style={{ opacity, scale }}
            >
                <motion.div
                    variants={fadeInLeft}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 relative"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="flex items-start mb-2"
                    >
                        <Image
                            src={notes}
                            alt="Music Notes"
                            width={64}
                            height={64}
                            className="w-12 h-12 sm:w-16 sm:h-16"
                        />
                    </motion.div>

                    <div className='flex items-center gap-4 mb-6'>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl font-bold"
                        >
                            About{" "}
                            <motion.span
                                className="text-[#00ADB5] inline-block"
                                animate={{
                                    scale: isHovered ? [1, 1.2, 1] : 1,
                                    rotate: isHovered ? [0, 5, -5, 0] : 0
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                me
                            </motion.span>
                        </motion.h2>
                        <motion.div
                            variants={floatingAnimation}
                            animate="animate"
                            whileHover={{ scale: 1.2, rotate: [0, 180] }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={lightbulb}
                                alt="Light bulb"
                                width={64}
                                height={64}
                                className="w-12 h-12 sm:w-16 sm:h-16"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-1"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: i * 0.03,
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    color: '#00ADB5',
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            filter: isHovered ? 'blur(2px)' : 'none',
                            transition: 'filter 0.3s ease'
                        }}
                    >
                        <Image
                            src={vector}
                            alt="Decorative vector"
                            width={128}
                            height={128}
                            className="absolute right-0 top-1/2 w-24 h-24 sm:w-32 sm:h-32 transform -translate-y-1/2 opacity-70"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={fadeInRight}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 relative flex justify-center items-center min-h-[300px]"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, -2, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        whileHover={{
                            filter: "hue-rotate(90deg)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <Image
                            src={doodleItems}
                            alt="Doodle items"
                            width={500}
                            height={500}
                            className="absolute w-full max-w-md opacity-70"
                            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{
                            scale: 1.05,
                            rotate: [0, -5, 5, 0],
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            rotate: {
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }
                        }}
                        drag
                        dragConstraints={{
                            top: -50,
                            left: -50,
                            right: 50,
                            bottom: 50,
                        }}
                        dragElastic={0.1}
                        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
                    >
                        <Image
                            src={work}
                            alt="Work illustration"
                            width={400}
                            height={400}
                            className="relative z-10 w-full max-w-xs sm:max-w-sm cursor-grab active:cursor-grabbing"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default About;