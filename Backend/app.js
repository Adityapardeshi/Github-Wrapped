import express from 'express'
import dotenv from 'dotenv'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import  router from "./src/routes/router.js"

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '.env') })

const app = express();

app.use(express.json());

app.use("/api", router)

const PORT = process.env.PORT || 3040

app.listen(process.env.PORT, ()=>{
    console.log("backend is running on " + PORT);
})