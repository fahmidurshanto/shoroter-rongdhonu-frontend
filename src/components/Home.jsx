import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [latestPosts, setLatestPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts/latest?limit=3');
                setLatestPosts(response.data);
            } catch (err) {
                setError('Failed to fetch latest posts.');
                console.error(err);
            }
        };
        fetchLatestPosts();
    }, []);

    return (
        <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInDown">Welcome to Shoroter Rongdhonu</h1>
            <p className="text-base md:text-lg text-gray-600 mb-8 animate__animated animate__fadeInUp">A collection of poems, thoughts, and stories by a humble poet.</p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 animate__animated animate__fadeIn">Latest Poems</h2>
            {error && <div className="text-center text-red-500 text-lg mt-4">{error}</div>}
            {latestPosts.length === 0 && !error && <div className="text-center text-gray-600 text-lg mt-4">No latest poems available yet.</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestPosts.map(post => (
                    <div key={post._id} className="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInUp">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            <Link to={`/blog/${post._id}`} className="hover:text-blue-500">{post.title}</Link>
                        </h3>
                        <p className="text-gray-600 text-sm">{post.content.substring(0, 100)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;