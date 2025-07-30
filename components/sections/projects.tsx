import { projects } from '@/data';
import Link from 'next/link';

function Projects() {
    return (
        <section id='projects' className="flex justify-center items-center py-16 px-4 sm:px-8 lg:px-26 overflow-hidden">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 w-full flex justify-start">
                <div className="w-full">
                    <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-left">
                        My recent <span className="text-[#00ADB5]">works</span>
                    </h2>
                    <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
                        Here are some of my real life recent projects that showcase my skills and creativity.
                    </p>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={project.link || '#'}
                                target={project.link ? '_blank' : undefined}
                                rel={project.link ? 'noopener noreferrer' : undefined}
                                className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    width={400}
                                    height={192}
                                    className="w-full h-48 object-cover"
                                    loading="lazy" // Add lazy loading
                                />
                                <div className="p-6 bg-white dark:bg-gray-800">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {project.description}
                                    </p>
                                    {/* <span className="inline-block mt-3 px-3 py-1 text-sm font-semibold text-[#00ADB5] bg-[#00adb51a] rounded-full">
                                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                                    </span> */}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;