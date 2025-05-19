const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "activity_logs",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();

const sendMessage = async (logs) => {
  await producer.connect();
  await producer.send({
    topic: "activity_logs_",
    messages: [{ value: JSON.stringify(logs) }],
  });
  await producer.disconnect();
};

module.exports = sendMessage;
