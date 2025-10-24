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
        <section id="projects" className="flex justify-center items-center py-16 px-4 sm:px-8 lg:px-26 overflow-hidden">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 w-full flex justify-start">
                <div className="w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-left">
                            My recent <motion.span
                                className="text-[#00ADB5] inline-block"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    color: ["#00ADB5", "#009fae", "#00ADB5"]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                works
                            </motion.span>
                        </h2>
                        <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
                            Here are some of my real life recent projects that showcase my skills and creativity.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <AnimatePresence>
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onHoverStart={() => setHoveredId(project.id)}
                                    onHoverEnd={() => setHoveredId(null)}
                                    className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            priority={index < 3}
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                                            transition={{ duration: 0.2 }}
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
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies?.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="inline-block px-3 py-1 text-sm font-semibold text-[#00ADB5] bg-[#00adb51a] rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
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