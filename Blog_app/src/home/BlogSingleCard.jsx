import React,{useState} from "react";
import { Link } from 'react-router-dom';
import {MdOutlineDelete, MdOutlineTitle, MdContentPaste} from 'react-icons/md';
import BlogModel from './BlogModel';
import { BiShow } from "react-icons/bi";

//Functional component to represent a single blog in a list of blogs
const BlogSingleCard = ({blog}) => {
    const [showModel, setShowModel] = useState(false);
    const truncatedContent = blog.content.slice(0,300);
  return (
    <div
             key={blog._id}
             className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
            >
                <div className='flex justify-start items-center gap-x-2'>
                    <MdOutlineTitle className='text-red-300 text-2xl'/>
                    <h2 className='my-1'>{blog.title}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <MdContentPaste className='text-red-300 text-2xl'/>
                    <h2 className='my-1'>
                        {truncatedContent}{blog.content.length>300?"...":""}
                    </h2>
                </div>

                <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                    <BiShow
                    className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                    onClick={()=> setShowModel(true)}
                    />
                    <Link to={`/posts/delete/${blog._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600 hover:text-black'/>
                    </Link>
                </div>
                {
                    showModel && (
                        <BlogModel blog={blog} onClose={() => setShowModel(false)}/>
                    )
                }
            </div>
  )
}

export default BlogSingleCard