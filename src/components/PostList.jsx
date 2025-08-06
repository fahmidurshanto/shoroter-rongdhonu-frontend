import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts');
            setPosts(response.data);
        } catch (err) {
            setError('Failed to fetch posts.');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No authentication token found. Please log in.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`http://localhost:5000/posts/delete/${id}`, {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setMessage('Post deleted successfully!');
                fetchPosts(); // Refresh the list
            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to delete post.');
                console.error(err);
            }
        }
    };

    if (error) {
        return <div className="text-center text-red-500 text-lg mt-8">{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center text-gray-600 text-lg mt-8">No posts available yet.</div>;
    }

    return (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Posts</h2>
            {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4">{post.title}</td>
                                <td className="py-3 px-4">{post.isDraft ? 'Draft' : 'Published'}</td>
                                <td className="py-3 px-4">
                                    <Link to={`/edit-post/${post._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm mr-2 hover:bg-yellow-600">Edit</Link>
                                    <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostList;