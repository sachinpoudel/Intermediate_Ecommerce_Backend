import express ,{Request,Response} from 'express'
import { PORT } from './secret'
import rootRouter from './routes/rootRoute'
import { PrismaClient } from '../generated/prisma'
import { errorMiddleware } from './middlwares/errorMiddleware'

const app = express()
app.use(express.json());

app.use("/api", rootRouter)
export const prisma = new PrismaClient()
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log("running success")
})