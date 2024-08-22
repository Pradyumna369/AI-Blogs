import React from 'react';
import BlogSingleCard from './BlogSingleCard';

//Functional component representing list of blogs
const BlogsCard = ({blogs}) => {
  return (
    <div className='grid sm:grid-cols-2 ls:grid-cols-3 xl:grid-cols-4'>
        {blogs.map((item) => (
           <BlogSingleCard key={item._id} blog={item}/>
        ))           
        }
    </div>
  );
};

export default BlogsCard;