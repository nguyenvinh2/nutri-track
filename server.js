'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;

const app = express();
const client = new pg.Client(process.env.DATABASE_URL);

client.connect();
client.on('error', err => console.error(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

app.set('view engine', 'ejs');

app.get('/searches', search);
app.post('/searches', searchFood);

function search(request, response) {
  response.render('pages/search');
}

function handleError(err, res) {
  res.render('pages/error', { error: err, response: res });
}

function searchFood(request, response) {
  const url = `https://api.nal.usda.gov/ndb/search/?format=json&q=${request.body.search}&ds=Standard%20Reference&sort=r&max=20&offset=0&api_key=${process.env.USDA_API_KEY}`;

  superagent.get(url)
    .then(foodResponse => {
      const foodList = foodResponse.body.list.item.forEach(food => {
        const item_url = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${food.ndbno}&type=b&format=json&api_key=${process.env.USDA_API_KEY}`;

        superagent.get(item_url)
          .then(content => {
            const ingredientList = content.body.foods[0].food.nutrients.forEach(ingredient => {
              console.log(ingredient);
            });
          });
      });
    })
    .catch(error => handleError(error, response));
}

//function Ingredient(data {
//  this.title = info.volumeInfo.title || 'Title Information Available';
//  this.author = info.volumeInfo.authors || 'Author Information Unvailable';
//  this.isbn = '';
//  this.imgUrl = '';
//  this.description = info.volumeInfo.description || 'Description Unavailable';
//}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));