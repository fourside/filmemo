const request = require("request");

async function get(url) {
  const options = {
    url,
    method: "GET",
    json: true,
  };
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(body);
    });
  });
}

module.exports = { get };
