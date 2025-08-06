import React from 'react';

const Contact = () => {
    return (
        <div className="px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 animate__animated animate__fadeIn">Contact Me</h1>
            <form className="max-w-lg mx-auto animate__animated animate__fadeInUp">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                    <textarea id="message" rows="5" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Send</button>
            </form>
        </div>
    );
};

export default Contact;