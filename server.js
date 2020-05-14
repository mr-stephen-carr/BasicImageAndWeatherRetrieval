const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
//using express to run the server
const app = express()

//API key I generated from a personal account
const apiKey = 'e2adcc567b12f40495542a276d7ea5e2';

//allows access to images & css folders
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    //function displays an error if JSON not received;
    // else it displays the city and temp
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
//renders the page. Means that house image reverts to the first image in the house array
app.post('/', function (req, res) {
  res.render('index');
})

app.listen(8080, function () {
  console.log('MVC example on port 8080')
})
