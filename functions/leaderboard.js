const functions = require("firebase-functions");

exports.leaderboard = functions
    .region("us-central1")
    .https
    .onRequest((request, response) => {
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
