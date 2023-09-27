import { config } from 'dotenv'
config()

import KafkaConsumer from './src/kafka/consumer'
import { sleep } from './src/lib/helper'
import http from 'http'

// Consumer test
let consumer = new KafkaConsumer(process.env.DEFAULT_TOPIC);

(async () => {
    while (!consumer.connected) {
        console.log('Waiting for consumer to connect')
        await sleep(5)
    }

    consumer.subscribe(async (key: any) => {
        console.log('new data stream', key)
        if (key) {
            // Send to API for re-insert
            let endpoint = process.env.API_ENDPOINT
            let response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key })
            })
                .then((httpResponse) => {
                    try {
                        if (httpResponse.status != 200) {
                            throw httpResponse.statusText
                        }
                    }
                    catch (e) {
                        console.log('Error sending to re-insert ednpoint', e)
                    }
                    return httpResponse.json()
                })
                .catch(e => console.log(e))

            console.log('Retry endpoint response', response)
        }
    })
})()