const { query } = require("express");
const express = require("express")
// const path = require("path")
const app = express()
const https = require("https");
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res,next) {
  const query = req.body.cityname
  const apiKey = "159f0bf4516c74f5dfe3eac5d41a65a9"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric"
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      res.write(`<style type="text/css"> 
      body {
        color: white;
        height: 95%;
        width: 99%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      </style>`);
      res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius</h1>")
      res.end()
    })
  })
})
app.listen(3000, () => {
  console.log(`server running...`)
})


