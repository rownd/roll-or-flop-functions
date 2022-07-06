const {helloWorld} = require("./hello-world");
const {leaderboard} = require("./leaderboard");
const {gifs} = require("./gifs");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = helloWorld;
exports.leaderboard = leaderboard;
exports.gifs = gifs;
