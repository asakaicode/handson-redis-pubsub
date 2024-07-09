import Redis from 'redis'

const publisher = Redis.createClient({
  url: 'redis://redis:6379'
})

const subscriber = publisher.duplicate()

const main = async () => {
  await publisher.connect()
  await subscriber.connect()

  await subscriber.subscribe('news', (message) => {
    console.log('Received:', message)
  })

  await publisher.publish('news', 'Hello, Redis Pub/Sub!')
}

main().catch(console.error)