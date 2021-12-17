require('dotenv').config();
const news = require('./amazon-news');
const sentiment = require('./amazon-sentiment');
const express = require('express');
const app = express();
const port = 3005;

console.log(news);


app.get('/:stock/news', (req, res) => {
  const newsData = news.data;
  const newsJSON = JSON.stringify(news);
  let negSentiment = 0;
  let posSentiment = 0;
  res.send(newsJSON);
  for(story of newsData) {
    const sentiment = story.sentiment
    if (sentiment === "Positive") {
      posSentiment++;
    }
    if (sentiment === "Negative") {
      negSentiment++;
    }
  }
  console.log("Negative Sentiment", negSentiment);
  console.log("Positive Sentiment", posSentiment);
})

app.get('/:stock/sentiment', (req, res) => {
  const sentimentJSON = JSON.stringify(sentiment);
  res.send(sentimentJSON);
  console.log("body", req.body);
  console.log("params", req.params);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})