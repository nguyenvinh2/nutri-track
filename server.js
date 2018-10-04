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

app.set('view engine', 'ejs');

app.get('/', getMeals);
app.get('/new-meal', meal);// <<<<<<<<<<<<<<<<<<< Jeff added
app.get('/meals/:meal_id', buildMeal);
app.get('/about-us', renderAboutUs);
app.get('/get-started', renderGetStarted);

app.post('/meals-edit/save', saveMealEdits)
app.post('/meals-edit', editMeal);
app.post('/meals-delete', deleteMeal);
app.post('/meals/:meal_id', searchFood);
app.post('/add', addIngredient);
app.post('/meal', addMeal);// <<<<<<<<<<<<<<<<<<< Jeff added
app.post('/delete', deleteIngredients);
app.post('/meal-update', updateIngredients);

function editMeal(request, response) {
  let SQL = `SELECT * FROM meals WHERE id = $1`;
  let values = [request.body.meal_id];
  return client.query(SQL, values)
    .then(result => {
      console.log(result.rows);
      response.render('pages/edit-meal.ejs', { meal: result.rows });
    })
    .catch(handleError);
}

function saveMealEdits(request, response) {
  console.log(request.body);
  let SQL = `UPDATE meals SET(name, description, image_url) = ($1, $2, $3) WHERE id = $4;`;
  let values = [request.body.name, request.body.description, request.body.image_url, request.body.meal_id];
  return client.query(SQL, values)
    .then(() => {
      response.redirect(`/meals/${request.body.meal_id}`);
    })

}


function deleteMeal(request, response) {
  console.log(request.body);
  let SQL = `DELETE FROM ingredients WHERE meal_id = $1;`;
  let values = [request.body.meal_id]
  return client.query(SQL, values)
    .then(() => {
      let SQL2 = `DELETE FROM meals WHERE id = $1;`;
      return client.query(SQL2, values)
        .then(() => {
          response.redirect(`/`);
        })
        .catch(handleError);
    })
    .catch(handleError);
}


function renderAboutUs(request, response) {// <<<<<<<< JEFF ADDED
  response.render('pages/about-us');
}

function renderGetStarted(request, response) {
  response.render('pages/how-to');
}


function deleteIngredients(request, response) {
  let SQL = `DELETE FROM ingredients WHERE ingredient = $1 AND meal_id = $2;`;
  let values = [request.body.delete, request.body.meal_id]
  return client.query(SQL, values)
    .then(() => {
      response.redirect(`/meals/${request.body.meal_id}`);
    })
    .catch(handleError);
}

function updateIngredients(request, response) {
  console.log(request.body);
  let SQL = `  UPDATE ingredients SET(calories, fat, protein, carbs, fiber, sugar, amount) = (calories*$1/amount, fat*$1/amount, protein*$1/amount, carbs*$1/amount, fiber*$1/amount, sugar*$1/amount, $1) WHERE meal_id = $2 AND ingredient = $3;`;
  const amount = request.body.amount;
  if (Array.isArray(amount)) {
    for (let i = 0; i < request.body.amount.length; i++) {
      let values = [request.body.amount[i], request.body.meal_id, request.body.ingredient[i]];
      console.log(values);
      client.query(SQL, values)
        .then(() => {
          if (i === request.body.amount.length - 1) {
            response.redirect(`/meals/${request.body.meal_id}`);
          }
        })
        .catch(handleError);
    }
  } else {
    let values = [request.body.amount, request.body.meal_id, request.body.ingredient];
    client.query(SQL, values)
      .then(() => {
        response.redirect(`/meals/${request.body.meal_id}`);
      })
      .catch(handleError);
  }
}



function buildMeal(request, response) {
  let SQL = `SELECT * FROM ingredients RIGHT JOIN meals ON meals.id = ingredients.meal_id WHERE meals.id = $1;`;
  let values = [request.params.meal_id];


  return client.query(SQL, values)
    .then(result => {
      response.render('pages/ingredients-list', { ingredients: result.rows });

    })
    .catch(handleError);
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


function meal(request, response) {// <<<<<<<<<<<<<<<<<<< Jeff added
  response.render('pages/new-meal');
}

function searchFood(request, response) {
  const url = `https://api.nal.usda.gov/ndb/search/?format=json&q=${request.body.search}&ds=Standard%20Reference&sort=r&offset=0&api_key=${process.env.USDA_API_KEY}`;

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
          const meal_id = request.body.meal_id;
          const ingredientItem = new Ingredient(food.name, food.ndbno, calories, fat, protein, carbs, fiber, sugar, meal_id);
          foodList.push(ingredientItem);
          if (foodList.length === foodResponse.body.list.item.length) {
            response.render('pages/result', { ingredients: foodList, search: request.body.search });
          }
        });
      });
    })
    .catch(error => handleError(error, response));
}

function Ingredient(name, ndbno, calories, fat, protein, carbs, fiber, sugar, meal) {
  this.name = name;
  this.ndbno = ndbno;
  this.amount = 100;
  this.calories = calories;
  this.fat = fat;
  this.protein = protein;
  this.carbs = carbs;
  this.fiber = fiber;
  this.sugar = sugar;
  this.meal_id = meal;
}

function addIngredient(request, response) {
  let { ingredient, calories, fat, protein, carbs, fiber, sugar, meal_id, amount, ndbno} = request.body;
  let SQL = 'INSERT INTO ingredients(ingredient, calories, fat, protein, carbs, fiber, sugar, meal_id, amount, ndbno) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10 WHERE NOT EXISTS (SELECT * FROM ingredients WHERE ingredient=$1 AND meal_id=$8);';
  let values = [ingredient, calories, fat, protein, carbs, fiber, sugar, meal_id, amount, ndbno];
  return client.query(SQL, values)
    .then(response.redirect(`/meals/${request.body.meal_id}`))
    .catch(err => handleError(err, response));
}

function handleError(err, res) {
  res.render('pages/error', { error: err, response: res });
}

function addMeal(request, response) {
  console.log(request.body);
  let { name, description, image_url } = request.body;
  let SQL = `INSERT INTO meals (name, description, image_url) VALUES ($1, $2, $3);`;
  let values = [name, description, image_url];

  return client.query(SQL, values)
    .then(response.redirect(`/`))
    .catch(err => handleError(err, response));
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));