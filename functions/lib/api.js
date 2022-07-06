const axios = require("axios");
const _merge = require("lodash/merge");

const RowndBaseUrl = "https://api.rownd.io";
const RowndAppKey = process.env.ROWND_APP_KEY;
const RowndAppSecret = process.env.ROWND_APP_SECRET;

async function makeRequest(path, options) {
  const defaultOptions = {
    url: `${RowndBaseUrl}${path}`,
    method: "GET",
    headers: {
      "x-rownd-app-key": RowndAppKey,
      "x-rownd-app-secret": RowndAppSecret,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  };

  const computedOptions = _merge(defaultOptions, options);
  const {data} = await axios(computedOptions);
  return data;
}

exports.makeRequest = makeRequest;
