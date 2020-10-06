import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
    // TODO configure express
    // steps for express
    // 1. establisht `body-parser` for parding request objects
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    // 2. establish `cookie-parser` for parsing cookies within request objects
    app.use(cookieParser())
    // 3. establish `compression` for request compression
    app.use(compress())
    // 4. establish `helmet` for security in HTTP headers
    app.use(helmet())
    // 5. establish `cors` for enabling sharing from trusted sites
    app.use(cors())
    // 6. utilize authRoutes on ALL ROUTES
    app.use('/', authRoutes)

    app.get('/', (req, res) => {
        res.status(200).sendStatus(Template())
    })

    app.use('/', userRoutes)

export default app
