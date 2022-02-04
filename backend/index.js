import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import boxRouter from './boxRoutes.js'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json({ extended: true, limit: '2mb' }))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))
app.use(cors())

const FILE_PATH = 'stats.json'

const getRoute = (req) => {
    const route = req.route ? req.route.path : ''
    const baseUrl = req.baseUrl ? req.baseUrl : ''
    return route ? `${baseUrl === '/' ? '' : baseUrl}${route}` : 'unknown route'
}

const readStats = () => {
    let result = {}
    try {
        result = JSON.parse(fs.readFileSync(FILE_PATH))
    } catch (err) {
        console.error(err)
    }
    return result
}

const dumpStats = (stats) => {
    try {
        console.log(stats)
        fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' })
    } catch (err) {
        console.error(err)
    }
}

app.use((req, res, next) => {
    res.on('finish', () => {
        const stats = readStats()
        const event = `${req.method} ${getRoute(req)} ${res.statusCode}`
        stats[event] = stats[event] ? stats[event] + 1 : 1
        dumpStats(stats)
    })
    next()
})

app.get('/stats/', (req, res) => {
    res.json(readStats())
})

const port = process.env.PORT||5000;
const url=process.env.CONNECTION_URL

app.get('/', (req, res) => {
    res.send('hi')
})

const CONNECTION_URL = url

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log('Server listening on port:', port)
        })
    })
    .catch(err => console.log(err))

app.use('/box', boxRouter)

