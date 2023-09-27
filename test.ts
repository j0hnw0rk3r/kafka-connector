import KafkaProducer from './src/kafka/producer'
import KafkaConsumer from './src/kafka/consumer'

// Consumer test
let consumer = new KafkaConsumer();

(async () => {
    consumer.subscribe((data: any) => {
        console.log('new data stream', data)
    })
})();

// Producer test using random words
let producer = new KafkaProducer(process.env.DEFAULT_TOPIC);

(async () => {
    setInterval(() => {
        let rw = Math.random().toString(36).substring(2, 7)
        producer.send(rw)
    }, 5000)
})();