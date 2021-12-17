require("dotenv").config();
const news = require("./amazon-news");
const sentiment = require("./amazon-sentiment");
const request = require("request");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3005;

app.use(cors());

app.get("/:stock/news", (req, res) => {
  console.log(req.params);
  if (req.params["stock"] === "AMZN") {
    const newsData = news.data;
    const newsJSON = JSON.stringify(news);
    res.send(newsJSON);
    return;
  }
  request(
    `https://stocknewsapi.com/api/v1?tickers=${req.params.stock}&items=50&token=${process.env.API_KEY}`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body); // Print the body of response.
      }
    }
  );
});

app.get("/:stock/sentiment", (req, res) => {
  const sentimentJSON = JSON.stringify(sentiment);
  res.send(sentimentJSON);
  console.log("body", req.body);
  console.log("params", req.params);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
