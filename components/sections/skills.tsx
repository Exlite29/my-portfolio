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
        <section id="skills" className="py-16 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        My <span className="text-[#00ADB5]">Skills</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Here are the technologies and tools I work with to bring ideas to life.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${activeCategory === category
                                    ? 'bg-[#00ADB5] text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {filteredSkills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                }}
                                className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md"
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