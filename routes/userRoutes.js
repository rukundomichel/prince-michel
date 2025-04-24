import e, { request } from "express";
import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';


const router = e.Router();

router.get('/', async (request, response) => {
    try {
        const users = await User.find();

        response.status(200).json(users);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal system error' });
    }
})

router.get('/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const user = await User.findById(id);
        
        if (user === null) {
            return response.status(404).json({ success: false, message: 'Can not find user!! Sorry :(' });
        }

        response.status(200).json({ success: true, message: 'User Found Successful', data: user });
    } catch (err) {
        console.log(err);
        response.status(500).json({ success: false, message: 'System Error' });
    }
})


router.put('/:id', async (request, response) => {
    const { id } = request.params;

    try {
        if (
            !request.body.userName ||
            !request.body.password ||
            !request.body.role
        ) {
            return response.status(400).json({ success: false, message: "Please fill in all the required fields" })
        }

        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const newUser = {
            userName: request.body.userName,
            password: hashedPassword,
            role: request.body.role
        }

        const user = await User.findByIdAndUpdate(id, newUser);

        response.status(201).json({success: true, message: 'User updated succcessfully :)', data: user});
    } catch (err) {
        console.log(err);
        response.status(500).json({ success: false, message: 'System Error' });
    }
})



router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const userDeletion = await User.findByIdAndDelete(id);

        if (!userDeletion) {
            return response.status(400).json({ success: false, message: 'User Not Found, Please provide valid user!!' })
        }

        response.status(200).json({ success: true, message: 'User deleted successfully!!! :)' })
    } catch (err) {
        console.log(err);
        response.status(500).json({ success: false, message: 'System Error' });
    }
})

export default router