import { Producer } from 'kafkajs'
import kafka from './kafka'
import { sleep } from '../lib/helper'

class KafkaProducer {
    producer: Producer = kafka.producer()
    connected: boolean = false
    topic: string = 'default-topic'
    // 
    constructor(topic?: string) {
        if (topic)
            this.topic = topic
        // Connect producer
        try {
            this.producer
                .connect()
                .then(() => this.connect())
                .catch(e => {
                    throw e
                })
        }
        catch (e) {
            console.log('Producer error', e)
        }
    }

    // Connect to topic
    connect() {
        console.log('Producer connection successful')
        this.connected = true
    }

    // Send message
    async send(message: string) {
        while (!this.connected) {
            console.log('Producer not connected, retrying in 3sec')
            await sleep(3)
        }

        try {
            await this.producer
                .send({
                    topic: this.topic,
                    messages: [
                        { value: message },
                    ],
                })
                .catch(e => {
                    throw 'Unable to produce message: ' + e
                })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export default KafkaProducer