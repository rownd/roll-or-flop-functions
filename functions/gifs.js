const functions = require("firebase-functions");
const {initializeApp,applicationDefault, cert} = require("firebase-admin/app");
const {getFirestore,Timestamp,FieldValue} =require("firebase-admin/firestore");

const projectId = process.env.GCLOUD_PROJECT;
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
// const firebaseConfig = process.env.FIREBASE_CONFIG;

initializeApp({
  projectId: {projectId},
});
const db = getFirestore();

// async function getAllDocuments() {
//   const collection = db.collection("gifs");
//   console.log("collection", {collection});
//   // const documents = await collection.get();
//   // console.log("documents", {documents});
//   // documents.forEach((doc) => {
//   //   console.log(doc.id, "=>", doc.data());
//   // });
//   return collection;
// }

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
      
      // const collection = db.collection("gifs");
      // console.log("collection", {collection});

      response.status(200).send();
    });
