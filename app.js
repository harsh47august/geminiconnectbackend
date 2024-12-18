const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

app.use(bodyParser.json());

app.post("/getResponse", (req, res) => {
  console.log(req.body);
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  model
    .generateContent(req.body.question)
    .then((result) => {
      console.log(result.response.text());
      const response = result.response.text();
      res.status(200).json({
        response: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

app.get("*", (req, res) => {
  res.status(404).json({
    msg: "SUCCESSFULL RUN",
  });
});

module.exports = app;
