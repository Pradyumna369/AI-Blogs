import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import Spinner from '../home/Spinner';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';

const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [show, setShow] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);

    //Generating a blog content based on prompt
    const generateBlog = async(prompt) => {
        try {
            setShow(false);
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/generate', { prompt });
            extractData(response.data.content);
            setLoading(false);
            setShow(true);
        } catch (error) {
            setLoading(false);
            console.error('Error generating blog post:', error);
            enqueueSnackbar('Error generating blog post', { variant: 'error' });
        }
    };

    //Extracting title and content based on response from API call
    const extractData = (text) => {
        const startIndex = text.indexOf("Title:");
        if (startIndex === -1) {
            setTitle(prompt);
            setContent(text);
        } else {
            const endIndex = text.indexOf('\n', startIndex);
            setTitle(text.slice(startIndex, endIndex).trim());
            setContent(text.slice(endIndex + 1).trim());
        }
    };

    //Function to create blog and save it to Mongodb database
    const handleSaveBlog = async() => {
        const blogPost = {
            title: title,
            content: content,
            createdAt: new Date()
        };
        try {
            setShow(false);
            await axios.post('http://localhost:3000/save', blogPost);
            setPrompt('');
            enqueueSnackbar('Blog published successfully ', { variant: 'success' });
        } catch (error) {
            console.error('Error saving blog post:', error);
            enqueueSnackbar('Error publishing blog', { variant: 'error' });
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [content]);

    return (
        <div className='p-4'>
            <div className='absolute top-10 right-10'>
            <Link to={`/api/posts`}>
                <button className='p-2 px-4 py-1 bg-sky-300 rounded-lg'>
                    Show blogs
                </button>
            </Link>
        </div>
        <div class="top-0 left-0 p-4">
        <Link to={`/`}>
        <h1 className='text-3xl font-extrabold text-transparent bg-clip-text bg-indigo-500'>
            AI Blogs
        </h1>
        </Link>
        </div>
            <BlogForm prompt={prompt} setPrompt={setPrompt} generateBlog={generateBlog} />
            {loading ? <Spinner /> : (show && 
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <textarea className='p-2 w-full' value={title} onChange={(e) => setTitle(e.target.value)} style={{ overflow: 'hidden', resize: 'none'}}/>
                    <textarea ref={textareaRef} className='p-2 w-full' value={content} onChange={(e) => setContent(e.target.value)} style={{ overflow: 'hidden', resize: 'none' }} />
            <div className='flex justify-center items-center gap-x-4'>
            <button className='p-2 bg-sky-300 m-8 rounded-xl' onClick={() => handleSaveBlog()}>
                Publish
            </button>
            <button className='p-2 bg-sky-300 m-8 rounded-xl' onClick={() => {setShow(false); setPrompt(' ')}}>
                Discard
            </button>
            </div>
        </div>
            )}
        </div>
    );
};

export default Home;
