// src/config/elasticClient.js
const { Client } = require("@elastic/elasticsearch");

const elasticClient = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "kKh4X90tQfugN17*TaRj", // thay bằng password reset
  },
  tls: {
    rejectUnauthorized: false, // cho self-signed cert
  },
});

module.exports = { elasticClient };
