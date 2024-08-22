import React from 'react';

const BlogForm = ({ prompt, setPrompt, generateBlog }) => {
    return (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Enter a prompt</label>
                <input 
                    type="text"
                    placeholder='Ex: Write a blog about travelling'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <div className="flex justify-center items-center gap-x-4">
                <button 
                    className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                    onClick={() => generateBlog(prompt)}
                >
                    Generate blog
                </button>
            </div>
        </div>
    );
};

export default BlogForm;
