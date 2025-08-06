import React from 'react';

const Dashboard = () => {
    return (
        <div className="px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 animate__animated animate__fadeIn">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInLeft">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Total Posts</h2>
                    <p className="text-3xl text-blue-500">150</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInUp">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Recent Drafts</h2>
                    <p className="text-3xl text-yellow-500">5</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInRight">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Published Articles</h2>
                    <p className="text-3xl text-green-500">145</p>
                </div>
            </div>
            {/* More dashboard content will go here */}
        </div>
    );
};

export default Dashboard;