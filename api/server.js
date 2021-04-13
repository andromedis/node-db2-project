// Imports
const express = require("express")
const helmet = require('helmet')
const carsRouter = require('./cars/cars-router')

// Express server instance
const server = express()

// Middleware
server.use(express.json())
server.use(helmet())

// Routers
server.use('/api/cars', carsRouter)

// Export server
module.exports = server
