import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Redis from 'ioredis'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' }
})

// Redis
const redis = new Redis("redis://redis:6379")
const subscriber = redis.duplicate()

subscriber.subscribe('likes')

subscriber.on('message', (channel, message) => {
  io.emit('notification', message)
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

// Endpoint for 'Like'
app.post('/like', (req, res) => {
  redis.publish('likes', 'いいねされました！')
  res.sendStatus(200)
})