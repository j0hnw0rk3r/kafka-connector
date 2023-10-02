import { config } from 'dotenv'
config()

import express from "express"
import logger from "morgan"
import cors from "cors"
import routes from "./routes"
import { consumer } from './lib/kafka'

const app = express()

app.use(logger("dev"))
app.use(express.json({
    "limit": '100mb'
}))
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const httpServer = require("http").createServer(app)
app.use("/", routes)

httpServer.listen(process.env.PORT || 5001, () => {
    console.log(`listening on port ${process.env.PORT || 5001}`)
});

// Run kafka consumer listener
(async () => await consumer())()