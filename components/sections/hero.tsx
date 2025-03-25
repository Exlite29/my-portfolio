'use client'
import React from 'react'
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision'
import { TextGenerateEffect } from '../ui/TextGenerateEffect'

function Hero() {
    return (
        <section id='home'>
            <BackgroundBeamsWithCollision>
                <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                    Hi I'm Ariel Agdon{" "}<br />
                    <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        {/* <div className="bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                            <TextGenerateEffect
                                className="text-center text-balance bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]"
                                words="Front End Web Developer"
                            />
                        </div> */}
                        <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                            <TextGenerateEffect
                                className="text-center text-[40px] md:text-5xl lg:text-6xl"
                                words="Front End Web Developer"
                            />
                        </div>
                    </div>
                </h2>
            </BackgroundBeamsWithCollision>
        </section>
    )
}

export default Hero