const functions = require("firebase-functions");

const {initializeApp} = require("firebase/app");
const {getFirestore, collection, getDocs} = require("firebase/firestore/lite");

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

      const firebaseConfig = JSON.parse(
        process?.env?.FIREBASE_CONFIG ?? '{}',
      );
      
      const app = initializeApp({...firebaseConfig, projectId: firebaseConfig?.projectId});

      // Initialize Cloud Firestore and get a reference to the service
      const db = getFirestore(app);

      const querySnapshot = await getDocs(collection(db, "gifs"));
      const gifs = querySnapshot.map((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        return doc.data()?.gif;
      });

      response.status(200).send({gifs});
    });
