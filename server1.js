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

app.get('/', getMeals);
app.get('/searches', search);
app.get('/meals/:meal_id', buildMeal);
app.get('/new-meal', meal);// <<<<<<<<<<<<<<<<<<< Jeff added

app.post('/searches', searchFood);
app.post('/add', addIngredient);

app.get('/meal', meal);// <<<<<<<<<<<<<<<<<<< Jeff added
app.post('/meal', addMeal);// <<<<<<<<<<<<<<<<<<< Jeff added


function buildMeal(request, response) {// <<<<<<<<<<<<<<<<<<< ***IGNORE CHANGES I'VE MADE TO THIS FUNCTION***
  console.log('######### meal_id: ', request.params.meal_id);

  let SQL = `SELECT * FROM meals WHERE id=$1;`;
  let values = [request.params.meal_id];

  return client.query(SQL, values)
    .then(results => response.render('pages/ingredients-list', {meal: results.rows[0]}))
    .catch(error => {
      response.render('pages/error', {errorMsg: error});
    });
}

//SET LANDING PAGE
function getMeals(request, response) {

  let SQL = `SELECT * FROM meals;`;

  return client.query(SQL)
    .then(results => response.render('index', { mealList: results.rows }))
    .catch(error => {
      response.render('pages/error', { errorMsg: error });
    });

}

function search(request, response) {
  response.render('pages/search');
}

function meal(request, response) {// <<<<<<<<<<<<<<<<<<< Jeff added
  response.render('pages/new-meal');
}

function searchFood(request, response) {
  const url = `https://api.nal.usda.gov/ndb/search/?format=json&q=${request.body.search}&ds=Standard%20Reference&sort=r&max=20&offset=0&api_key=${process.env.USDA_API_KEY}`;

  superagent.get(url)
    .then(foodResponse => {
      const foodList = [];
      foodResponse.body.list.item.map(food => {
        const item_url = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${food.ndbno}&type=b&format=json&api_key=${process.env.USDA_API_KEY}`;

        superagent.get(item_url).then(content => {
          const calories = content.body.foods[0].food.nutrients[1].value;
          const protein = content.body.foods[0].food.nutrients[3].value;
          const fat = content.body.foods[0].food.nutrients[2].value;
          const carbs = content.body.foods[0].food.nutrients[4].value;
          const fiber = content.body.foods[0].food.nutrients[5].value;
          const sugar = content.body.foods[0].food.nutrients[6].value;
          const ingredientItem = new Ingredient(food.name, calories, fat, protein, carbs, fiber, sugar);
          foodList.push(ingredientItem);
          if (foodList.length === foodResponse.body.list.item.length) {
            response.render('pages/result', { ingredients: foodList });
          }
        });
      });
    })
    .catch(error => handleError(error, response));
}

function Ingredient(name, calories, fat, protein, carbs, fiber, sugar) {
  this.name = name;
  this.calories = calories;
  this.fat = fat;
  this.protein = protein;
  this.carbs = carbs;
  this.fiber = fiber;
  this.sugar = sugar;
}

function addIngredient(request, response) {
  let { ingredient, calories, fat, protein, carbs, fiber, sugar, meal } = request.body;
  let SQL = 'INSERT INTO ingredients(ingredient, calories, fat, protein, carbs, fiber, sugar) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  let values = [ingredient, calories, fat, protein, carbs, fiber, sugar];
  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

function handleError(err, res) {
  res.render('pages/error', { error: err, response: res });
}

function addMeal(request) {

  //let meal = new Meal(request.body.name, request.body.description, request.body.image_url);

  let { name, description, image_url } = request.body;

  let SQL = `INSERT INTO meals (name, description, image_url) VALUES ($1, $2, $3);`;
  let values = [name, description, image_url];

  return client.query(SQL, values);

}

function Meal(name, description, image_url) {
  this.name = name;
  this.description = description;
  this.image_url = image_url;

}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));