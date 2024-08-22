import {Route, Routes} from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import GenerateBlog from './pages/GenerateBlog'
import DeleteBlog from './pages/DeleteBlog'
import ShowBlog from './pages/ShowBlogs'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/posts/delete/:id' element={<DeleteBlog/>}/>
      <Route path='/api/posts' element={<ShowBlog/>}/> 
    </Routes>
  );
};

export default App
