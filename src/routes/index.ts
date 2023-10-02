import { Router } from 'express'
import KafkaProducer from '../kafka/producer'

const router = Router()

router.get('/health', (_req: any, res: any) => res.status(200).json({ status: 'healthy' }))

// Get key instance from 15+API
let producer = new KafkaProducer(process.env.DEFAULT_TOPIC);

router.post("/publish_key", (req: any, res: any) => {
    console.log('New published key from API for re-insert', req.body.key)

    // Now send to MSK for streaming
    producer.send(req.body.key)

    res.status(200).json({ status: 'ok' })
})

export default router
