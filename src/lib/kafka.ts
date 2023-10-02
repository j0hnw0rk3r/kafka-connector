import KafkaConsumer from '../kafka/consumer'
import { sleep } from './helper'

// Consumer test
let _consumer = new KafkaConsumer(process.env.DEFAULT_TOPIC);

export const consumer = async () => {
    while (!_consumer.connected) {
        console.log('Waiting for consumer to connect')
        await sleep(5)
    }

    _consumer.subscribe(async (key: any) => {
        console.log('new data stream', key)
        if (key) {
            // Send to API for re-insert
            let endpoint = process.env.RETRY_ENDPOINT
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
                        console.log('Error sending to re-insert endpoint: ', e)
                    }
                    return httpResponse.json()
                })
                .catch(e => console.log(e))

            console.log('Retry endpoint response', response)
        }
    })
}