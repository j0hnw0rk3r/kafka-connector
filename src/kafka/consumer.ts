import { Consumer } from 'kafkajs'
import kafka from './kafka'
import { sleep } from '../lib/helper'

class KafkaConsumer {
    consumer: Consumer = kafka.consumer({ groupId: 'group-1' })
    connected: boolean = false
    // 
    constructor() {
        // Connect consumer
        try {
            this.consumer
                .connect()
                .then(async () => await this._subscribe())
                .catch(e => {
                    throw e
                })
        }
        catch (e) {
            console.log('consumer error', e)
        }
    }

    // subscribe to topic
    async _subscribe(topic?: string) {
        console.log('consumer connection successful')
        this.connected = true
        // 
        await this.consumer.subscribe({
            topic: topic || process.env.DEFAULT_TOPIC,
            fromBeginning: false
        })
    }

    // Subscribe to incoming messages
    async subscribe(callback: any) {
        while (!this.connected) {
            console.log('consumer not connected, retrying in 3sec')
            await sleep(3)
        }
        // 
        try {
            await this.consumer
                .run({
                    eachMessage: async ({ topic, message }) => {

                        try {
                            await sleep(5) // Pause 5 seconds for every message
                            callback(message.value.toString())
                        } catch (e) {
                            if (e.retryAfter) {
                                console.log('Timeout Issue, retrying')
                                this.consumer.pause([{ topic }])
                                setTimeout(() => this.consumer.resume([{ topic }]), e.retryAfter * 1000)
                            }

                            throw e
                        }
                    }
                })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export default KafkaConsumer