import express from 'express';
import { Adminsignin, Adminsignout, Adminsignup } from '../../Controller/Admin/AdminAuth.controller.js';

const router = express.Router();

router.post('/adminSignup',Adminsignup);

router.post('/adminSignin',Adminsignin);

router.get('/adminSignout',Adminsignout);



export default router;

