const {admin} = require("../config/firebase");

const verifyFirebaseTokenMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.*)$/);
  if (!match) return res.status(401).json({ error: 'No Authorization token' });

  const idToken = match[1];

    try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // decodedToken contains uid and any custom claims (e.g., role or admin)
    req.user = decodedToken;
    console.log("verified req.user: ", req.user)
    return next();
  } catch (err) {
    console.error('Token verify error', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = verifyFirebaseTokenMiddleware;