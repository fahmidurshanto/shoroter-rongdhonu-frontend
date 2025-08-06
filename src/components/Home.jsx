import React from 'react';

const Home = () => {
    return (
        <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInDown">Welcome to Shoroter Rongdhonu</h1>
            <p className="text-base md:text-lg text-gray-600 mb-8 animate__animated animate__fadeInUp">A collection of poems, thoughts, and stories by a humble poet.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Featured Poems will go here */}
            </div>
        </div>
    );
};

export default Home;