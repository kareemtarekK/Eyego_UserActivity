# 🧩 Activity Logging Microservice

This is a scalable, event-driven microservice built with Node.js, Kafka, MongoDB, and Docker. It handles user activity logs in real time, stores them efficiently, and exposes a REST API to query logs with pagination and filtering.

---

## 🚀 Project Features

- ✅ Kafka Producer/Consumer to process user activity logs asynchronously
- ✅ MongoDB storage with proper indexing for performance
- ✅ REST API with pagination & filtering support
- ✅ Built using DDD (Domain-Driven Design) principles
- ✅ Dockerized and ready to deploy on Kubernetes
- ✅ Designed for scalability and real-time processing

---

## 📁 Project Structure (Based on DDD)


---

## 🛠️ Tech Stack

- Node.js
- Apache Kafka
- MongoDB
- Express.js
- Docker
- Kubernetes
- Domain-Driven Design (DDD)

---

## 🐳 Docker Instructions
# Use official Node.js image
FROM node:18-alpine
# Set working directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
# Copy source code
COPY . .
# Expose the port
EXPOSE 5000
# Run the app
CMD ["node", "src/index.js"]


docker-compose

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    depends_on:
      - zookeeper

  mongo:
    image: mongo
    ports:
      - "27017:27017"

  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - kafka
      - mongo
    environment:
      - MONGO_URL=mongodb+srv://engkareemtarek555:PtsnK8MylaOW66sN@activitylogs.ttl0qgw.mongodb.net/?retryWrites=true&w=majority&appName=ActivityLogs
      - KAFKA_BROKER=kafka:9092
### 1. Build Docker Image

```bash
docker build -t activity-service .
