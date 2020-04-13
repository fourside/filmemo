const httpClient = require("./httpClient");

const omdbUrl = "http://www.omdbapi.com/";
const apiKey = process.env.APIKEY;

async function searchHandler(req, res) {
  try {
    if (!apiKey) {
      throw new Error("not prepared");
    }
    const { title, imdbID, page } = req.query;
    let url;
    if (title) {
      url = `${omdbUrl}?s=${title}&apikey=${apiKey}`;
    } else if (imdbID) {
      url = `${omdbUrl}?i=${imdbID}&apikey=${apiKey}`;
    } else {
      throw new Error("pass title or imdbID");
    }
    if (page) {
      url = `${url}&page=${page}`;
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
