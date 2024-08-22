import React from 'react';

const GeneratedBlog = ({ title, content, handleSaveBlog }) => {
    return (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <p className='my-2 whitespace-pre-line rounded-xl' contenteditable="true">
                {title} <br/>
                {content}
            </p>
        </div>
    );
};

export default GeneratedBlog;
