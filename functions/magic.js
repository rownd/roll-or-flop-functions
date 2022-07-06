const functions = require("firebase-functions");
const {makeRequest} = require("./lib/api");

async function generateMagicLink(authType, data, redirectUrl) {
  console.log("Generating Magic Link: %s, %s, %s",
      authType,
      JSON.stringify(data),
      redirectUrl,
  );
  return makeRequest("/hub/auth/magic", {
    method: "POST",
    data: {
      authentication_type: authType,
      data,
      redirct_url: redirectUrl,
    },
  });
}

exports.magic = functions
    .region("us-central1")
    .https
    .onRequest(async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "POST");

      if (request.method === "OPTIONS") {
        // stop preflight requests here
        request.status(204).send();
        return;
      }
      console.log(request.body);
      const body = request.body;
      const accessToken = body.access_token;
      const redirectUrl = body.redirect_url;
      const verificationType = body.verification_type;

      if (!(accessToken && redirectUrl && verificationType)) {
        return response.status(400).send(
            // eslint-disable-next-line max-len
            "You must provide all of 'access_token', 'redirect_url', and 'verification_type'",
        );
      }

      // Validate the JWT by calling the /me endpoint
      let userData = {};
      try {
        const profile = await makeRequest("/me", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        userData = profile.profile;
      } catch (err) {
        return response.status(401).send({
          message: "Invalid Token: " + err.message,
        });
      }

      const verificationFieldMap = {email: "email", phone: "phone_number"};
      if (!userData[verificationFieldMap[verificationType]]) {
        return response.status(400).send(
            "User is missing data for the verification type '%s'",
            verificationType,
        );
      }

      // Generate the magic link
      try {
        const magicLink = await generateMagicLink(
            verificationType, userData, redirectUrl,
        );
        return response.status(200).send(magicLink);
      } catch (err) {
        return response.status(400).send({message: err.message});
      }
    });
