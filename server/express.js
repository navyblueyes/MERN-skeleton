import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import devBundle from './devBundle'
import path from 'path'

const app = express()
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

    app.use((err, req, res, next) => {
        // UnauthorizedError is an error from jwt; token cannot be validated
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({"error" : err.name + ": " + err.message})
        } else if (err) {
            res.status(400).json({"error" : err.name + ": " + err.message})
            console.log(err)
        }
    })

    //server-side rendering
    app.get('*', (req, res) => {

    })

    devBundle.compile(app)

    const CURRENT_WORKING_DIR = process.cwd()
    app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

export default app
