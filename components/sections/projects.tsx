import { useState } from 'react';
import Image from 'next/image'; // Add this import
import { projects } from '@/data';

function Projects() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'web', label: 'Web' },
        { id: 'mobile', label: 'Mobile' },
        { id: 'other', label: 'Other' }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <section id='projects' className="flex justify-center text-center px-50 py-50">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 w-full flex justify-start">
                <div className="w-full">
                    <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-left">
                        My recent <span className="text-[#00ADB5]">works</span>
                    </h2>
                    <div className="mb-8 flex gap-4">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-4 py-2 rounded-full transition ${activeFilter === filter.id
                                    ? 'bg-[#00ADB5] text-white hover:bg-[#009fae]'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={400} // Set appropriate width
                                    height={192} // Set appropriate height (matching your h-48 class)
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6 bg-white dark:bg-gray-800">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {project.description}
                                    </p>
                                    <span className="inline-block mt-3 px-3 py-1 text-sm font-semibold text-[#00ADB5] bg-[#00adb51a] rounded-full">
                                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;