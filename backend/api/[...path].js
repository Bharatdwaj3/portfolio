const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('../config/db_conn');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/profile', require('../routes/profileRouter'));
app.use('/skills', require('../routes/skillRouter'));
app.use('/projects', require('../routes/projectRouter'));

module.exports = app;
