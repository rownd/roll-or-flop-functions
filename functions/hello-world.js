const functions = require("firebase-functions");

exports.helloWorld = functions
    .region("us-central1")
    .https
    .onRequest((request, response) => {
      functions.logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    });
