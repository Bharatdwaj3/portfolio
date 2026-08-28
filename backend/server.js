const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db_conn');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/profile', require('./routes/profileRouter'));
app.use('/skills', require('./routes/skillRouter'));
app.use('/projects', require('./routes/projectRouter'));

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
