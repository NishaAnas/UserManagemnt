import express from 'express'
import { test } from '../Controller/User.controller.js';

const router = express.Router();

router.get('/',test)

export default router;