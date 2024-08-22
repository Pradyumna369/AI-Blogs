import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import BlogSingleCard from '../home/BlogSingleCard';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

//Component to display a list of blogs
const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true)
    axios
    .get('http://localhost:3000/api/posts')
    .then((response) => {
      setBlogs(response.data.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
            setLoading(false);
      enqueueSnackbar('Error fetching blogs', { variant: 'error' });
    })
  },[])

  return (
    <div className='p-4'> 
    
    <div class="top-0 left-0 p-4">
    <Link to={`/`}>
                <h1 class=" fixed text-3xl font-extrabold text-transparent bg-clip-text bg-indigo-500 ">
                    AI Blogs
                </h1>
      </Link>
            </div>
    
    <div className='flex flex-col rounded-xl w-[700px] p-4 mx-auto'>
      {
        blogs.map((item) => (
          <BlogSingleCard key={item._id} blog={item}/>
        ))
      }
    </div>
    </div>
  )
}

export default ShowBlogs;