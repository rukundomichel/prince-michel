import e from "express";
import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';

const router = e.Router();


const authMiddleware = async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) return res.status(401).json({ message: 'Authentication required' });
  
      const decoded = jwt.verify(token, 'secret_key'); // Replace with env variable in production
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(401).json({ message: 'User not found' });
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

  const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  };


router.post('/register', async (request, response) => {
    try {
        if (
            !request.body.userName ||
            !request.body.password ||
            !request.body.role
        ) {
            return response.status(400).json({ success: false, message: "Please fill in all the required fields" })
        }

        // const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const newUser = {
            userName: request.body.userName,
            password: hashedPassword,
            role: request.body.role
        }
        const user = await User.create(newUser);

        response.status(201).json({ success: true, message: 'User created successful!!' })
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal system error' });
    }
})

router.post('/login', async (request, response) => {
    //const {id} = request.params;
    if (
        !request.body.userName ||
        !request.body.password
    ) {
        return response.status(400).json({ success: false, message: 'Please fill in all the requred fields!!!' });
    }
    try {
        const user = await User.findOne({ userName: request.body.userName });
        // { userName: request.body.userName }
        if (!user) {
            return response.status(401).json({ success: false, message: 'Can not find User' });
        }
        // console.log(user);

        if (await bcrypt.compare(request.body.password, user.password)) {
            response.status(200).json({ success: true, message: 'Welcome user ' })
        } else {
            response.status(400).json({ success: false, message: 'The password is not true' })
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: 'System Error' });
    }
})


export default router;