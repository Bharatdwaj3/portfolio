const mongoose = require('mongoose');
require('dotenv').config();

const mongo_username = process.env.MONGO_USER;
const mongo_password = process.env.MONGO_PASS;
const mongo_cluster = process.env.MONGO_CLUSTER;
const mongo_database = process.env.MONGO_DB;

mongoose.connect(
  `mongodb://${mongo_username}:${mongo_password}@${mongo_cluster}/${mongo_database}?retryWrites=true&w=majority&authSource=admin`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log(`Connected to: ${mongoose.connection.name}`))
  .catch(err => console.log(err));

module.exports = { mongoose };
