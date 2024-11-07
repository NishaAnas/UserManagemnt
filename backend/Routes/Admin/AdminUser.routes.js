import express from 'express';
import { createUser, deleteUser, listUsers, updateUser } from '../../Controller/Admin/AdminUser.controller.js';

const router = express.Router();

router.get('/list',listUsers);

router.post('/create', createUser); 

router.put('/update/:id', updateUser); 

router.delete('/delete/:id', deleteUser);

export default router;
