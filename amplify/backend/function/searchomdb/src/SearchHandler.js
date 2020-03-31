const httpClient = require("./httpClient");

const omdbUrl = "http://www.omdbapi.com/";
const apiKey = process.env.APIKEY;

async function searchHandler(req, res) {
  const { title } = req.query;
  const url = `${omdbUrl}?s=${title}&apikey=${apiKey}`;
  try {
    if (!apiKey) {
      throw new Error("not prepared");
    }
    const result = await httpClient.get(url);
    res.json(result);
    console.log("success");
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}

module.exports = { searchHandler };
