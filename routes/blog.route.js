import express from 'express';
import { createBlog, deleteBlog, getBlog, updateBlog } from '../controllers/blog.controller.js';
import tokenCheck from '../middleware/token_checker.js';
const route = express.Router();

route.post('/create-blog',tokenCheck,createBlog);
route.put('/update-blog',tokenCheck,updateBlog);
route.get('/list-blog',getBlog);
route.delete('/delete-blog',tokenCheck,deleteBlog);
export default route;