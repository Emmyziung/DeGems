/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");   
const admin = require("firebase-admin");           
const cloudinary = require("cloudinary").v2;  

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });



// Cloudinary config (from Firebase environment variables)
cloudinary.config({
  cloud_name: functions.config().cloudinary.cloud_name,
  api_key: functions.config().cloudinary.api_key,
  api_secret: functions.config().cloudinary.api_secret,
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.deleteImage = functions.https.onCall(async (data, context) => {
  // Security: only allow authenticated admins
  if (!context.auth || context.auth.token.role !== "admin") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can delete images."
    );
  }

  const { publicId } = data;

  if (!publicId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "publicId is required"
    );
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to delete image from Cloudinary"
    );
  }
});
