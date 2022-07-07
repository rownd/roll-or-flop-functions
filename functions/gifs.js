/* eslint-disable max-len */
"use strict";
const functions = require("firebase-functions");
const {Firestore} = require("@google-cloud/firestore");

// Create a new client
const firestore = new Firestore();

async function listAllGifs() {
  const collectionReference = firestore.collection("gifs");
  functions.logger.info("ref", {collectionReference});
  const documents = await collectionReference.get();
  functions.logger.info("documents", {documents});
  const documentData = documents.docs.map((d) => d.data());
  functions.logger.info("documents data", {documentData});
  const gifs = [];
  documentData.forEach((doc) => {
    gifs.push(doc.gif);
    functions.logger.info("doc.gif", doc.gif);
  });

  return gifs;
}

exports.gifs = functions
    .region("us-central1")
    .https
    .onRequest(async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "GET");

      if (request.method === "OPTIONS") {
      // stop preflight requests here
        request.status(204).send();
        return;
      }

      const gifs = await listAllGifs();
      functions.logger.info("returning", {gifs});
      response.status(200).send({gifs});
    });
