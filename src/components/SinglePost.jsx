import React from 'react';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
    const { id } = useParams();
    // In a real application, you would fetch post data based on the ID
    const dummyPost = {
        title: `Post Title ${id}`,
        content: `This is the content for post number ${id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        date: 'August 6, 2025',
        author: 'The Poet',
    };

    return (
        <div className="px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInDown">{dummyPost.title}</h1>
            <p className="text-gray-600 text-sm mb-4">By {dummyPost.author} on {dummyPost.date}</p>
            <div className="prose lg:prose-lg xl:prose-xl max-w-none animate__animated animate__fadeInUp">
                <p>{dummyPost.content}</p>
                <p>{dummyPost.content}</p>
            </div>
        </div>
    );
};

export default SinglePost;