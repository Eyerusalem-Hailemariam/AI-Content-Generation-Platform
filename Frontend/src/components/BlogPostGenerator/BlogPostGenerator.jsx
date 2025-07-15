import React, { useState } from 'react';
import generateService from '../../services/blogService';
import getAuth from '../../Utility/auth';

function BlogPostGenerator() {
    const [prompt, setPrompt] = useState('');
    const [generateBlog, setGeneratedBlog] = useState('');
    const [loading, setLoading] = useState(false);

    const user = getAuth();
    const token = user.user_token;
    const id = user.user_id;

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setGeneratedBlog('');
        try {
            const blog = await generateService.generateBlog(prompt, token, id);
            setGeneratedBlog(blog);
        } catch (error) {
            alert('Failed to generate blog post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 py-8 px-2">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
                <h2 className="text-3xl font-bold text-center text-primary-700 mb-6">Blog Post Generator</h2>
                <textarea
                    rows="4"
                    placeholder="Enter your blog prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-4 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 transition mb-4 resize-none text-gray-800"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full flex justify-center items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed mb-4"
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </span>
                    ) : (
                        'Generate Blog Post'
                    )}
                </button>
                {generateBlog && (
                    <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-6 shadow-inner">
                        <h3 className="text-xl font-semibold text-primary-700 mb-2">Generated Blog Post:</h3>
                        <div className="prose prose-blue max-w-none text-gray-900 whitespace-pre-line">
                            {generateBlog}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogPostGenerator;
