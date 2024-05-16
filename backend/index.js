import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config({
    path: "../.env"
})

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT || 3000;

import loginRouter from './routes/login.route.js'
import registerRouter from './routes/register.route.js'
import homeRouter from './routes/home.route.js'

app.post('/api/', loginRouter)
app.post('/api/register', registerRouter)
app.post('/api/home', homeRouter)


app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`)
})