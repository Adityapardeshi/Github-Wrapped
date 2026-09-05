import { Router } from "express";
import {getUsers} from '../controllers/userController.js'

const router = Router();

router.get('/get_data/:username', getUsers)

export default router