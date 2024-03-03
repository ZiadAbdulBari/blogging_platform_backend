import express from 'express';
import { createBlog, deleteBlog, getBlog, getOwnBlog, updateBlog } from '../controllers/blog.controller.js';
import tokenCheck from '../middleware/token_checker.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const route = express.Router();
const cpUpload = upload.fields([{ name: 'images', maxCount: 3 }, { name: 'video', maxCount: 1 }])
route.post('/create-blog',tokenCheck,cpUpload,createBlog);
route.put('/update-blog',tokenCheck,updateBlog);
route.get('/list-blog',getBlog);
route.get('/own-blog',tokenCheck,getOwnBlog);
route.delete('/delete-blog',tokenCheck,deleteBlog);
export default route;