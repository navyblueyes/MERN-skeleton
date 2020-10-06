import path from 'path'
import express from 'express'
import { MongoClient } from 'mongodb'
import template from './../template'
import config from '../config/config'
import app from './express'
import mongoose from 'mongoose'

import devBundle from './devBundle'
//^ comment out before building for production
devBundle.compile(app)
//^ comment out before building for production

// variables/definitions
const CURRENT_WORKING_DIR = process.cwd()
mongoose.Promise = global.Promise



//Middleware
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
  res.status(200).send(template())
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})


// Database Connection URL
// Use mongoose connect method to connect to the server
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})


//
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
MongoClient.connect(url, (err, db)=>{
  console.log("Connected successfully to mongodb server")
  db.close()
})
