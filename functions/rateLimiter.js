// rateLimiter.js
const rateLimit = require("express-rate-limit");

// Global API limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100,                   // per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, res) => {
    res.status(429).json({ error: "Rate limit exceeded" });
  },
});

// Strict limit for sensitive routes
const sensitiveLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,        // 1 minute
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, res) => {
    res.status(429).json({ error: "Slow down" });
  },
});

module.exports = {
  apiLimiter,
  sensitiveLimiter,
};
