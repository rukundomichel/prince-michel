import e, { request, response } from "express";
import {Blog} from '../models/blogsModel.js'

const router = e.Router();

//Get all blogs
router.get('/', async(request, response) => {
    try{
        const blogs = await Blog.find();

        response.status(200).json({data: blogs})
    }catch(err){
        console.log(err);
        response.status(500).json({success: false, message: 'System Error!'})
        
    }
})

// Get one blog

router.get('/:id', async(request, response)=>{
    try{
        const { id } = request.params;

        const blog = await Blog.findById(id);

        if(!blog){
            return response.status(404).json({success: false, message: 'Blog Not found! :('});
        }

        response.status(200).json({success: true, message: 'Blog found successfull', data: blog});
    }catch(err){
        console.log(err);
        response.status(500).json({success: false, message: 'System error!!'})
    }
})

// Post blog

router.post('/create', async(request, response)=> {

    try{
        if(
            !request.body.title ||
            !request.body.description ||
            !request.body.author ||
            !request.body.category
        ){
            return response.status(400).json({success: false, message: 'Please fill in all requered fields'})
        }

        const newBlog = {
            title: request.body.title,
            description: request.body.description,
            author: request.body.author,
            category: request.body.category
        }

        const blog = await Blog.create(newBlog);

        response.status(201).json({success: true, message: 'blog created success full', data: blog});
    }catch(err){
        console.log(err);
        response.status(500).json({success: false, message: 'System Error!'})
    }
})

export default router;