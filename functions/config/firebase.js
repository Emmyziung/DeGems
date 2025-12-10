// config/firebase.js
require("dotenv").config();
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const path = require("path");

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountPath) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT_KEY_PATH in env.");
  process.exit(1);
}

const serviceAccount = require(path.resolve(serviceAccountPath));

// Prevent duplicate initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = getFirestore();

module.exports = {
  admin,
  db,
};
