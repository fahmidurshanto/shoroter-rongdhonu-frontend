import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [tags, setTags] = useState('');
    const [isDraft, setIsDraft] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts/${id}`);
                const post = response.data;
                setTitle(post.title);
                setContent(post.content);
                setFeaturedImage(post.featuredImage || '');
                setTags(post.tags ? post.tags.join(', ') : '');
                setIsDraft(post.isDraft);
            } catch (err) {
                setError('Failed to fetch post for editing.');
                console.error(err);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No authentication token found. Please log in.');
            return;
        }

        try {
            const updatedPost = {
                title,
                content,
                featuredImage,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                isDraft,
            };

            await axios.post(`http://localhost:5000/posts/update/${id}`, updatedPost, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setSuccess('Post updated successfully!');
            navigate('/dashboard'); // Navigate back to dashboard or post list
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to update post.');
            console.error(err);
        }
    };

    return (
        <div className="px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Post</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
                    <textarea
                        id="content"
                        rows="10"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="featuredImage" className="block text-gray-700 text-sm font-bold mb-2">Featured Image URL</label>
                    <input
                        type="text"
                        id="featuredImage"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={featuredImage}
                        onChange={(e) => setFeaturedImage(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags (comma-separated)</label>
                    <input
                        type="text"
                        id="tags"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                <div className="mb-6 flex items-center">
                    <input
                        type="checkbox"
                        id="isDraft"
                        className="mr-2 leading-tight"
                        checked={isDraft}
                        onChange={(e) => setIsDraft(e.target.checked)}
                    />
                    <label htmlFor="isDraft" className="text-gray-700 text-sm">Save as Draft</label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default EditPost;