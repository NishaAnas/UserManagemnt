import express from 'express'
import { deleteUser, test, updateUser } from '../Controller/User.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/',test)

router.post('/updateProfile/:id', verifyToken,updateUser)

router.delete('/deleteUser/:id',verifyToken,deleteUser)

export default router;


