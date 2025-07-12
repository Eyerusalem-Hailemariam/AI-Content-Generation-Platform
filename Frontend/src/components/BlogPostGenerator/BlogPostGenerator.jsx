import React, { useState } from 'react'
import generateService from '../../services/blogService'

function BlogPostGenerator() {


    const [prompt, setPrompt] = useState('');
    const [generateBlog, setGeneratedBlog] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {

        if(!prompt.trim()) return;

        setLoading(true);
        setGeneratedBlog('');

        try {
            const blog = await generateService.generateBlog(prompt);
            setGeneratedBlog(blog);
        } catch(error) {
            alert('Failed to generate blog post');
        } finally {
            setLoading(false);
        }
        
    };

  return (
    <div style={{maxWidth: '600px', marigin: '0 auto'}}>
    <h2>Blog Post Generator</h2>
        <textarea rows="4" placeholder='Enter your blog prompt here...' value={prompt} onChange={(e) => setPrompt(e.target.value)}
            style={{ width: '100%', padding: '10px'}}/>
        
        <br/>

        <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Blog Post'}
        </button>

        <div style={{mariginTop: '20px', whiteSpace:'pre-wrap'}}>
    {generateBlog && (
        <>
        <h3>
            Generated Blog Post:
        </h3>
        <p>{generateBlog}</p>
        </>
    )}
        </div>

    </div>
  )
}

export default BlogPostGenerator;
