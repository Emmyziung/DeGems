// Import dependencies
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { apiLimiter, sensitiveLimiter } = require("./rateLimiter")
require("dotenv").config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body
app.set("trust proxy", 1);

app.use(apiLimiter);



// Load Firebase service account
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

// Handle form submissions
app.post("/apply", sensitiveLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, reason } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save to Firestore
    const docRef = await db.collection("applications").add({
      firstName,
        lastName,
      email,
      phone,
      reason,
      status: "pending",
      createdAt: new Date(),
    });

    console.log("New application:", docRef.id);
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
