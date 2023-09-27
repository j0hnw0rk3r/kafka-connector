import { Kafka, KafkaConfig, logLevel } from 'kafkajs'

let kafkaCfg: KafkaConfig = {
    clientId: 'my-kafka-client',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    logLevel: logLevel.ERROR
}

if (process.env.KAFKA_ENVIRONMENT === 'production') {
    // Authenticate via AWS IAM
    kafkaCfg.ssl = true
    kafkaCfg.sasl = {
        mechanism: 'aws',
        authorizationIdentity: process.env.MSK_CLUSTER_ROLE_ID,
        accessKeyId: process.env.MSK_CLUSTER_ACCESS_KEY,
        secretAccessKey: process.env.MSK_CLUSTER_SECRET_KEY
    }
}

const kafka = new Kafka(kafkaCfg);
export default kafka