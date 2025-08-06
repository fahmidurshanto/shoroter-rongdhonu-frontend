import React from 'react';
import { Link } from 'react-router-dom';

const dummyPosts = [
    { id: 1, title: 'First Poem', excerpt: 'This is the first poem...' },
    { id: 2, title: 'Second Poem', excerpt: 'This is the second poem...' },
    { id: 3, title: 'Third Poem', excerpt: 'This is the third poem...' },
];

const Blog = () => {
    return (
        <div className="px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 animate__animated animate__fadeIn">Blog</h1>
            <div className="space-y-8">
                {dummyPosts.map((post, index) => (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInLeft" style={{animationDelay: `${index * 0.2}s`}}>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                            <Link to={`/blog/${post.id}`} className="hover:text-blue-500">{post.title}</Link>
                        </h2>
                        <p className="text-gray-600">{post.excerpt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;