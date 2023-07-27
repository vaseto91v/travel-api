import express, {Express} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes'
require('dotenv').config()


const app: Express = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`API is listening on port ${process.env.PORT}`)
})
