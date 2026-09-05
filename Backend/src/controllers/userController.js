
import dotenv from 'dotenv'
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
    console.log(username)
    const response = await fetch(`https://api.github.com/users/${username}`, {headers})
    const data = await response.json()
    return res.status(response.status).json(data)
});