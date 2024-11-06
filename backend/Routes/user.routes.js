import express from 'express'
import { test, updateUser } from '../Controller/User.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/',test)

router.post('/updateProfile/:id', verifyToken,updateUser)
export default router;


