import { Router } from "express";
import {getUsers, getStat, getStreak, getTopRepositories, getCommits} from '../controllers/userController.js'

const router = Router();

router.get('/get_data/:username', getStat)
router.get('/activity-streak/:username', getStreak)
router.get('/top-repos/:username', getTopRepositories)
router.get('/commit-stats/:username', getCommits)

export default router