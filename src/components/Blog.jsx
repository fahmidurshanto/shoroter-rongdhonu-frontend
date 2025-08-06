import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 10; // You can make this configurable if needed

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let url = 'http://localhost:5000/posts';
                const params = new URLSearchParams();

                if (searchQuery) {
                    params.append('search', searchQuery);
                }
                if (selectedTag) {
                    params.append('tag', selectedTag);
                }
                params.append('page', currentPage);
                params.append('limit', postsPerPage);

                if (params.toString()) {
                    url = `${url}?${params.toString()}`;
                }

                const response = await axios.get(url);
                setPosts(response.data.posts);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError('Failed to fetch posts.');
                console.error(err);
            }
        };
        fetchPosts();
    }, [searchQuery, selectedTag, currentPage]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleTagChange = (e) => {
        setSelectedTag(e.target.value);
        setCurrentPage(1); // Reset to first page on new tag filter
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (error) {
        return <div className="text-center text-red-500 text-lg mt-8">{error}</div>;
    }

    if (posts.length === 0 && !searchQuery && !selectedTag) {
        return <div className="text-center text-gray-600 text-lg mt-8">No posts available yet.</div>;
    }

    return (
        <div className="px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 animate__animated animate__fadeIn">Blog</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search posts..."
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    placeholder="Filter by tag..."
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedTag}
                    onChange={handleTagChange}
                />
            </div>

            {posts.length === 0 && (searchQuery || selectedTag) && (
                <div className="text-center text-gray-600 text-lg mt-8">No posts found matching your criteria.</div>
            )}

            <div className="space-y-8">
                {posts.map((post, index) => (
                    <div key={post._id} className="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInLeft" style={{animationDelay: `${index * 0.2}s`}}>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                            <Link to={`/blog/${post._id}`} className="hover:text-blue-500">{post.title}</Link>
                        </h2>
                        <p className="text-gray-600">{post.content.substring(0, 150)}...</p>
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-2 text-sm text-gray-500">
                                Tags: {post.tags.map((tag, i) => (
                                    <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Blog;