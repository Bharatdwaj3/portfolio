const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.Fbase_project_id,
    privateKey: process.env.Fbase_private_key?.replace(/\\n/g, '\n'),
    clientEmail: process.env.Fbase_client_email,
  }),
});

module.exports = admin;
