'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import notes from '../../assets/musicnotes.png';
import doodleItems from '../../assets/doodleitems.png';
import work from '../../assets/Group62.png';
import lightbulb from '../../assets/lightbulb.png';
import vector from '../../assets/Vector186.png';

function About() {
    return (
        <section id='about' className="flex justify-center items-center py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-6xl">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 relative"
                >
                    <motion.div
                        whileHover={{ rotate: 10 }}
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
                            About <span className="text-[#00ADB5]">me</span>
                        </motion.h2>
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 10, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
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

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                    >
                        Hi, I&apos;m Ariel &ndash; a passionate Jr. Front End Developer dedicated to turning design ideas into interactive, user-friendly websites. Let&apos;s build something amazing together!
                    </motion.p>

                    <motion.div
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
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
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
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
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        <Image
                            src={work}
                            alt="Work illustration"
                            width={400}
                            height={400}
                            className="relative z-10 w-full max-w-xs sm:max-w-sm"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;