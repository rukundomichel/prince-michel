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

export default router;