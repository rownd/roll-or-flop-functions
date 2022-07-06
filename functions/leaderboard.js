const functions = require("firebase-functions");

exports.leaderboard = functions
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

      const leaderboard = [
        {
          username: "gamerguy1",
          score: 10,
        },
        {
          username: "playa452",
          score: 10,
        },
        {
          username: "leetz0r",
          score: 9,
        },
        {
          username: "bad2thab0ne",
          score: 1,
        },
      ];
      response.status(200).send({leaderboard});
    });
