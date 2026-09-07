import dotenv from 'dotenv'
import {getRepoData, getLanguageStats, getActivityStreak, getTopRepos, getCommitStats} from '../services/getUserRepoData.js'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'


dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../../.env') })

const Token = process.env.GITHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${Token}`,
  Accept: "application/vnd.github+json",
};


export const getUsers = (async (req, res)=>{
    const username = req.params.username
    const response = await getRepoData(username, headers)
    return res.status(200).json(response)
});

export const getStat = (async(req, res) => {
    const username = req.params.username
    const data = await getLanguageStats(username, headers);
    return res.status(200).json(data);
})

export const getStreak = (async(req, res) => {
  const username = req.params.username
  const data = await getActivityStreak(username, headers);
  return res.status(200).json(data);
})

export const getTopRepositories = (async(req, res) => {
  const username = req.params.username
  const data = await getTopRepos(username, headers);
  return res.status(200).json(data);
})

export const getCommits = (async(req, res) => {
  const username = req.params.username
  const data = await getCommitStats(username, headers);
  return res.status(200).json(data);
})