
'use client'
import { useGlobalContext } from '@/context/GlobalProvider';
import React, { useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts';

function About() {
    const { setSection } = useGlobalContext();
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
    });

    useEffect(() => {
        if (isIntersecting) {
            setSection("#features");
        }
    }, [isIntersecting]);
    return (
        <section ref={ref} id='projects' className='flex text-center justify-center items-center text-black dark:text-white dark:bg-neutral-800 border-0 py-6 mt-auto'>
            <div className="mx-auto max-w-fit text-center flex flex-col">
                <h1
                    className="heading text-2xl md:xl leading-none"
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-once="true"
                >
                    Projects
                </h1>

            </div>
        </section>
    )
}

export default About