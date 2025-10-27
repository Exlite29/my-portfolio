'use client';

import { projects } from '@/data';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Image from 'next/image';

function Projects() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    return (
        <section id="projects" className="min-h-screen flex justify-center items-center py-16 px-4 sm:px-8 lg:px-26 overflow-hidden">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 w-full">
                <div className="w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <motion.h2
                            className="mb-4 text-4xl sm:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            My recent <motion.span
                                className="text-[#00ADB5] inline-block"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    color: ["#00ADB5", "#008c94", "#00ADB5"]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                works
                            </motion.span>
                        </motion.h2>
                        <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
                            Here are some of my real life recent projects that showcase my skills and creativity.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <AnimatePresence mode="wait">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    onHoverStart={() => setHoveredId(project.id)}
                                    onHoverEnd={() => setHoveredId(null)}
                                    whileHover={{ y: -8 }}
                                    className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 group transform-gpu"
                                >
                                    <div className="relative h-56 sm:h-48 overflow-hidden rounded-t-xl">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-2"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            priority={index < 3}
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                            animate={{
                                                opacity: hoveredId === project.id ? 1 : 0,
                                                backdropFilter: hoveredId === project.id ? "blur(2px)" : "blur(0px)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {project.github && (
                                                <Link
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                                                >
                                                    <FiGithub className="w-6 h-6 text-white" />
                                                </Link>
                                            )}
                                            {project.link && (
                                                <Link
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                                                >
                                                    <FiExternalLink className="w-6 h-6 text-white" />
                                                </Link>
                                            )}
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        className="p-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        <motion.h3
                                            className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00ADB5] transition-colors duration-300"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {project.title}
                                        </motion.h3>
                                        <motion.p
                                            className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base line-clamp-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {project.description}
                                        </motion.p>
                                        <motion.div
                                            className="flex flex-wrap gap-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {project.technologies?.map((tech, techIndex) => (
                                                <motion.span
                                                    key={tech}
                                                    className="px-3 py-1 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] transition-colors duration-300"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{
                                                        delay: 0.5 + (techIndex * 0.1),
                                                        type: "spring",
                                                        stiffness: 200
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Projects;