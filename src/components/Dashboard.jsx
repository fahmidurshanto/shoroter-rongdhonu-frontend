import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostList from './PostList';

const Dashboard = () => {
    const [totalPosts, setTotalPosts] = useState(0);
    const [draftPosts, setDraftPosts] = useState(0);
    const [publishedPosts, setPublishedPosts] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCounts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found. Please log in.');
                return;
            }

            try {
                const config = {
                    headers: {
                        'x-auth-token': token,
                    },
                };

                const totalRes = await axios.get('http://localhost:5000/posts/count/total', config);
                setTotalPosts(totalRes.data.count);

                const draftRes = await axios.get('http://localhost:5000/posts/count/drafts', config);
                setDraftPosts(draftRes.data.count);

                const publishedRes = await axios.get('http://localhost:5000/posts/count/published', config);
                setPublishedPosts(publishedRes.data.count);

            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to fetch dashboard data.');
                console.error(err);
            }
        };
        fetchCounts();
    }, []);

    return (
        <div className="px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 animate__animated animate__fadeIn">Admin Dashboard</h1>
            {error && <div className="text-center text-red-500 text-lg mt-8">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInLeft">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Total Posts</h2>
                    <p className="text-3xl text-blue-500">{totalPosts}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInUp">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Recent Drafts</h2>
                    <p className="text-3xl text-yellow-500">{draftPosts}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInRight">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Published Articles</h2>
                    <p className="text-3xl text-green-500">{publishedPosts}</p>
                </div>
            </div>
            <div className="mt-8">
                <Link to="/create-post" className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 animate__animated animate__fadeInUp">Create New Post</Link>
            </div>
            <div className="mt-12">
                <PostList />
            </div>
        </div>
    );
};

export default Dashboard;