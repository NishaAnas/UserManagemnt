import express from 'express'
import { signup } from '../Controller/Auth.controller.js';

const router = express.Router();


router.post('/signup',signup);

export default router;