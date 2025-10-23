const admin = require("firebase-admin");

// Import service account key (DO NOT move this file to src/)
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to assign admin role
async function makeAdmin(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: "admin" });
    console.log(` User with UID ${uid} is now an admin.`);
    process.exit();
  } catch (error) {
    console.error(" Error setting admin role:", error);
    process.exit(1);
  }
}

// Replace with UID of the user you want to promote
const uid = '1inT1OagTeZ0jJUmOnFYS5YVKnZ2';
makeAdmin(uid);
