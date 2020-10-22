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


// basic server-side rendering, need React, React Router, and Material-UI
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import MainRouter from './../client/MainRouter'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme'


const app = express()
    // steps for express
    // 1. establish `body-parser` for parding request objects
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

    //server-side rendering [SSR]... notice that it is executed on EVERY GET [.get('*')] request

    {/* ServerStyleSheets is Material-UI comp for wrapping css+React for SSR;
                collect puts CSS into one sheer
        StaticRouter used in server-side rendering when user isn’t clicking around
            so the location never actually changes
            Docu 'location' - URL the server received, probably req.url on a node server.
            Docu 'context' -- plain JS object for components to add properties during render
        ThemeProvider holds the CSS;   MainRouter holds all the React Components
    */}
    app.get('*', (req, res) => {
        const sheets = new ServerStyleSheets()
        const context = {}
        const markup = ReactDOMServer.renderToString(
            sheets.collect(
                <StaticRouter location={req.url} context= {context}>
                    <ThemeProvider theme={theme}>
                        <MainRouter />
                    </ThemeProvider>
                </StaticRouter>
            )
        )
    })

    devBundle.compile(app)

    const CURRENT_WORKING_DIR = process.cwd()
    app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

export default app
