import express  from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js'
import tasks from "./routes/tasks.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser('socrates'))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use('/api', authRoutes)
app.use('/api', tasks)

export default app