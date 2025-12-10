const { db } = require("../config/firebase");

const submitForm = async (req, res) => {
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
};

module.exports = submitForm;