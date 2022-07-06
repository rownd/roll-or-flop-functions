const _pick = require("lodash/pick");
const _sortBy = require("lodash/sortBy");
const functions = require("firebase-functions");
const {makeRequest} = require("./lib/api");

const RowndAppId = process.env.ROWND_APP_ID;

async function listAllUsers() {
  let users = await makeRequest(`/applications/${RowndAppId}/users/data`, {
    params: {
      page_size: 1000, // TODO: pagination.
    },
  });

  users = users.results.map((user) => {
    user = _pick(user.data, ["gamertag", "longest_streak"]);
    user.longest_streak = user.longest_streak || 0;
    return user;
  });
  return _sortBy(users, (user) => -1 * user.longest_streak);
}

exports.leaderboard = functions
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

      const leaderboard = await listAllUsers();
      response.status(200).send({leaderboard});
    });
