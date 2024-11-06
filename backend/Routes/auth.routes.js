import express from 'express'
import { googleAuth, signin, signout, signup } from '../Controller/Auth.controller.js';

const router = express.Router();


router.post('/signup',signup);

router.post('/signin',signin);

router.post('/google',googleAuth);

router.get('/signOut',signout)

export default router;