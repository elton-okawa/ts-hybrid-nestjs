import { Kafka } from 'kafkajs';

async function produce() {
  const kafka = new Kafka({
    clientId: 'example',
    brokers: ['localhost:9094'],
  });

  const producer = kafka.producer();

  await producer.connect();

  console.log('Sending data...');
  await producer.send({
    topic: 'tp.test',
    messages: [
      {
        key: 'name',
        value: JSON.stringify({ firstKey: 'value', secondKey: 'second' }),
      },
    ],
  });

  await producer.disconnect();
  console.log('Finished');
}

produce();
