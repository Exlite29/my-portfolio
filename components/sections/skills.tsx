'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '@/data/skillsData';

type SkillCategory = 'all' | 'frontend' | 'backend' | 'tools' | 'design';

function Skills() {
    const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

    const categories: SkillCategory[] = ['all', 'frontend', 'backend', 'tools', 'design'];

    const filteredSkills = activeCategory === 'all'
        ? skillsData
        : skillsData.filter(skill => skill.category === activeCategory);

    return (
        <section id="skills" className="min-h-screen flex items-center py-16 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        My <motion.span
                            className="text-[#00ADB5] inline-block"
                            animate={{
                                scale: [1, 1.1, 1],
                                color: ['#00ADB5', '#008c94', '#00ADB5']
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >Skills</motion.span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Here are the technologies and tools I work with to bring ideas to life.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 px-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 sm:px-6 py-2 rounded-full capitalize text-sm sm:text-base font-medium transition-all duration-300 shadow-sm ${activeCategory === category
                                ? 'bg-[#00ADB5] text-white scale-105'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1
                            }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {filteredSkills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 8px 20px rgba(0,173,181,0.2)',
                                    y: -5
                                }}
                                className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div
                                    className="text-4xl mb-2"
                                    style={{ color: skill.color }}
                                >
                                    <Icon />
                                </div>
                                <h3 className="font-medium text-center">{skill.name}</h3>
                                <span className={`text-sm mt-1 ${skill.level === 'Advanced'
                                    ? 'text-green-500'
                                    : skill.level === 'Intermediate'
                                        ? 'text-yellow-500'
                                        : 'text-blue-500'
                                    }`}>
                                    {skill.level}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default Skills;