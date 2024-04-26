const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'
});

const app = express();

// API endpoint to fetch users' UID
app.get('/api/users', async (req, res) => {
  try {
    const userRecords = await admin.auth().listUsers();
    const uids = userRecords.users.map(user => user.uid);
    res.json(uids);
  } catch (error) {
    console.error('Error fetching users\' UID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
