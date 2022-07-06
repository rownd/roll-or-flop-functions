const functions = require("firebase-functions");
const {Firestore} = require("@google-cloud/firestore");

// Create a new client
const firestore = new Firestore();

exports.gifs = functions
    .region("us-central1")
    .https
    .onRequest((request, response) => {
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "GET");

      if (request.method === "OPTIONS") {
        // stop preflight requests here
        request.status(204).send();
        return;
      }

      const collection = firestore.collection("gifs").get();
      const documents = collection.docs;
      response.status(200).send({documents});
      functions.logger.info("Return all gifs", {documents});
    });
