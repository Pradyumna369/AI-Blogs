import React from 'react';
import { PiBookOpenTextLight } from 'react-icons/pi';
import {AiOutlineClose} from 'react-icons/ai';

//Functional component to display a modal showing full details of blog post
const BlogModel = ({blog, onClose}) => {
  return (
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
     onClick={onClose}>
        <div
        onClick = {(event) => event.stopPropagation()}
        className='w-[1000px] max-w-full h-[600px] bg-white rounded-xl p-4 flex flex-col relative'
        >
            <AiOutlineClose
            className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
            onClick={onClose}
            />

                <div className='flex justify-start items-center gap-x-2'>
                    <PiBookOpenTextLight className='text-red-300 text-2xl'/>
                    <h2 className='my-1'>{blog.title}</h2>
                </div>
                
                <div className='flex justify-start items-center gap-x-2'>
                   
                </div>
                <div className='overflow-auto'>
                    <p className='my-2 whitespace-pre-line'>
                        {blog.content}
                    </p>
                    <br/>
                <h2 className='w-fit py-1 rounded-lg text-gray-500'>
                    Created at: {new Date(blog.createdAt).toLocaleString()}
                </h2>
                </div>
                    
        </div>
    </div>
  )
}

export default BlogModel