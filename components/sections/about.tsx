

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
        <section ref={ref} id='about' className='flex text-center justify-center items-center bg-neutral-800 text-white py-6 mt-auto'>
            <div>This is about section</div>
        </section>
    )
}

export default About