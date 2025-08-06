import React from 'react';

const About = () => {
    return (
        <div className="px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 animate__animated animate__fadeIn">About Me</h1>
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-8 md:mb-0 animate__animated animate__fadeInLeft">
                    <img src="https://via.placeholder.com/300" alt="Poet" className="rounded-full shadow-lg mx-auto md:mx-0" />
                </div>
                <div className="md:w-2/3 md:pl-8 text-center md:text-left animate__animated animate__fadeInRight">
                    <p className="text-base md:text-lg text-gray-600">I am a passionate poet who finds beauty in the everyday. This website is a collection of my work, a place where I can share my thoughts and feelings with the world. I hope you enjoy your time here.</p>
                </div>
            </div>
        </div>
    );
};

export default About;