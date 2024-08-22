import express from 'express';
import {Blog} from '../models/blogModel.js';
import {API_KEY, mongoDBURL} from '../config.js';
import axios from 'axios';

const router = express.Router();

//API call to OpenAI's GPT to generate blog content based on prompt
router.post('/api/generate', async (req, res) => {
    const prompt = req.body.prompt;
  
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
  
      const blogPost = {
        content: response.data.choices[0].message['content'].trim(),
      }
     return res.status(200).json(blogPost); 
    } catch (error) {
      console.error('Error generating blog post:', error);
    }
  });

//Route handler to save a blog to database
router.post('/save', async (request, response) => {

  const newBlog ={
    title: request.body.title,
    content: request.body.content,
    createdAt: request.body.createdAt
  };  
  try{
        
        const blog = await Blog.create(newBlog);
        response.status(200).send(blog);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route handler to retrieve all blogs from database
router.get('/api/posts', async(request, response) => {
    try{
        const blogs = await Blog.find({});
        return response.status(200).json({
            count: blogs.length,
            data: blogs
        });

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route handler to retrieve a blog based on its ID
router.get('/api/posts/:id', async(request, response) => {
  try{
      const {id} = request.params
      const blog = await Blog.findById(id);
      return response.status(200).json({
        blog
      });

  }
  catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
  }
});


//Route handler to delete a blog post based on its ID
router.delete('/api/posts/:id', async(request,response) => {
    try{
        const {id} = request.params;

        const result = await Blog.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Blog not found'});
        }

        return response.status(200).send({message: 'Blog deleted succesfully'}); 

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

});

export default router;
