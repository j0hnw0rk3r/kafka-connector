import { Kafka, KafkaConfig, logLevel } from 'kafkajs'
import { createMechanism } from '@jm18457/kafkajs-msk-iam-authentication-mechanism'

if (process.env.KAFKA_ENVIRONMENT == 'production' && !process.env.KAFKA_BROKERS) {
    throw 'KAFKA_BROKERS must be set in the environment variables'
}

let kafkaCfg: KafkaConfig = {
    clientId: 'my-kafka-client',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    logLevel: logLevel.ERROR
}

if (process.env.KAFKA_ENVIRONMENT == 'production') {
    // Authenticate via AWS IAM
    kafkaCfg.ssl = true
    kafkaCfg.sasl = createMechanism({ region: 'us-west-2' })
}

const kafka = new Kafka(kafkaCfg)

export default kafka