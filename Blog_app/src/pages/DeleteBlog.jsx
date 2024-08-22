import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../home/Spinner';
import { useSnackbar } from 'notistack';

//Component to handle deletion of blog post
const DeleteBlog = () => {
    const [loading, setLoading] = useState(false);
    const [blog,setBlog] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const [blogError, setBlogError] = useState(null);
    async function getBlogData() {
        setLoading(true);
        //Retrieving blog based on its ID
        try {
            const response = await axios.get(`http://localhost:3000/api/posts/${id}`);    
            setBlog(await response.data.blog);
            setLoading(false);
        } catch (error) {
            setBlogError(error);
            setLoading(false); 
            enqueueSnackbar('Error retrieving blog details', {variant: 'error'});
        }
    }
    useEffect(() => {
        getBlogData()
    },[]
    )

    //Function to delete blog
    const handleDeleteBlog = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/api/posts/${id}`);
            setLoading(false);
            enqueueSnackbar('Blog deleted successfully', { variant: 'success' });
            navigate('/api/posts');
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Error deleting blog', { variant: 'error' });
            console.error(error);
        }
    };

    //Function to handle not deleting blog
    const handleDontDeleteBlog = () => {
        navigate('/api/posts');
    }
    
    return (
    <div className='p-4'>
        <h1 className='text-3xl my-4'>Delete blog</h1>
        {loading ? 
        <Spinner /> : ''
        }
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <h3 className='text-1xl p-1'><span>Are you sure you want to delete this blog: </span>    
            </h3>
            <h2>
            <span className='text-2xl' >{blog.title}</span>
            </h2>
            
            <button className='p-2 bg-sky-300 m-2 w-[200px] mx-auto' onClick={handleDeleteBlog}>
                Yes, Delete it
            </button>
            <button className='p-2 bg-sky-300 m-2 w-[200px] mx-auto' onClick={handleDontDeleteBlog}>
                No
            </button>
        </div>
    </div>
  )
}

export default DeleteBlog