const { Kafka } = require("kafkajs");
const Activity = require("./../database/models/activityModel");

const kafka = new Kafka({
  clientId: "activity_logs",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "activity_logs_c2" });

const excuteConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "activity_logs_", fromBeginning: false });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const activity = new Activity(JSON.parse(message.value));
        await activity.save();
        console.log("user activity log saved to database ✅");
      } catch (err) {
        console.log(err + `💥`);
      }
    },
  });
};

module.exports = excuteConsumer;
