import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                setError('Failed to fetch post.');
                console.error(err);
            }
        };
        fetchPost();
    }, [id]);

    if (error) {
        return <div className="text-center text-red-500 text-lg mt-8">{error}</div>;
    }

    if (!post) {
        return <div className="text-center text-gray-600 text-lg mt-8">Loading post...</div>;
    }

    const postUrl = window.location.href; // Get the current URL of the post
    const shareText = `Check out this poem: ${post.title}`;

    return (
        <div className="px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInDown">{post.title}</h1>
            <p className="text-gray-600 text-sm mb-4">By The Poet on {new Date(post.publishedAt).toLocaleDateString()}</p>
            <div className="prose lg:prose-lg xl:prose-xl max-w-none animate__animated animate__fadeInUp">
                <p>{post.content}</p>
            </div>

            {/* Social Share Buttons */}
            <div className="mt-8 flex justify-center space-x-4 animate__animated animate__fadeInUp">
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Share on Facebook
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                >
                    Share on Twitter
                </a>
                <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                >
                    Share on LinkedIn
                </a>
            </div>

            {/* Author Bio Section */}
            <div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-inner animate__animated animate__fadeInUp">
                <h2 className="text-xl font-bold text-gray-800 mb-4">About The Author</h2>
                <div className="flex flex-col md:flex-row items-center">
                    <img src="https://via.placeholder.com/80" alt="Author" className="rounded-full mr-4 mb-4 md:mb-0" />
                    <div>
                        <p className="font-semibold text-gray-800">Fahmidur Rahman</p>
                        <p className="text-gray-600 text-sm">A passionate poet and storyteller, exploring the depths of human emotion through words. This is a placeholder bio.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;