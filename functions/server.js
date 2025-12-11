// Import dependencies
const express = require("express");
const cors = require("cors");

const { apiLimiter, sensitiveLimiter } = require("./middleware/rateLimiter")
require("dotenv").config();




// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body
app.set("trust proxy", 1);

app.use(apiLimiter);

//Initialize database connections
require("./config/supabase");
require("./config/firebase");

//Router
const formsRouter = require("./routes/forms");
const memberRouter = require("./routes/member");
const adminRouter = require("./routes/admin");

//middleware
const verifyFirebaseToken = require("./middleware/verifyFirebase");
const requireAdmin = require("./middleware/requireAdmin");
//Routes
app.use("/forms", sensitiveLimiter, formsRouter);
app.use("/member", verifyFirebaseToken, memberRouter);
app.use("/admin", verifyFirebaseToken, requireAdmin,  adminRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
