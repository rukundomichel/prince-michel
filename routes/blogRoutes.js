import e from "express";
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


export default router;