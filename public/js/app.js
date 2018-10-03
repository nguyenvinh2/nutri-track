'use strict';

const ingredientsCount = $('table .ingredient-row').length;
let oldAmount = [];

getIngredientAmount();


$(document).ready(function () {
});

$('#update-amount').keypress(
  function (event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  });

$(`.ingredient-amount input`).change(() => {
  amountChangeListerner();
});

function amountChangeListerner() {
  let ingredientTotal = new Array(7).fill(0);
  for (let i = 0; i < ingredientsCount; i++) {
    const newAmount = parseInt($(`.ingredient-amount.${i} input`).val());
    const calories = parseFloat($(`.ingredient-calories.${i}`).text()) * newAmount / parseInt(oldAmount[i]);
    const fat = parseFloat($(`.ingredient-fat.${i}`).text()) * newAmount / parseInt(oldAmount[i]);
    const protein = parseFloat($(`.ingredient-protein.${i}`).text()) * newAmount / parseInt(oldAmount[i]);
    const carbs = parseFloat($(`.ingredient-carbs.${i}`).text()) * newAmount / parseInt(oldAmount[i]);
    const fiber = parseFloat($(`.ingredient-fiber.${i}`).text()) * newAmount / parseInt(oldAmount[i]);
    const sugar = parseFloat($(`.ingredient-sugar.${i}`).text()) * newAmount / parseInt(oldAmount[i]);

    $(`.ingredient-calories.${i}`).text(calories.toFixed(2));
    $(`.ingredient-fat.${i}`).text(fat.toFixed(2));
    $(`.ingredient-protein.${i}`).text(protein.toFixed(2));
    $(`.ingredient-carbs.${i}`).text(carbs.toFixed(2));
    $(`.ingredient-fiber.${i}`).text(fiber.toFixed(2))
    $(`.ingredient-sugar.${i}`).text(sugar.toFixed(2));

    ingredientTotal[0] += newAmount;
    ingredientTotal[1] += calories;
    ingredientTotal[2] += fat;
    ingredientTotal[3] += protein;
    ingredientTotal[4] += carbs;
    ingredientTotal[5] += fiber;
    ingredientTotal[6] += sugar;

    oldAmount[i] = $(`.ingredient-amount.${i} input`).val();
  }
  displayIngredientTotal(ingredientTotal);

}

function runAmountListener(event) {
  if (event.keyCode === 13) {
    amountChangeListerner();
  }
}

function getIngredientAmount() {
  for (let i = 0; i < ingredientsCount; i++) {
    oldAmount.push($(`.ingredient-amount.${i} input`).val());
  }
}

function displayIngredientTotal(data) {
  $(`.total-amount`).text(data[0]);
  $(`.total-calories`).text(data[1].toFixed(0));
  $(`.total-fat`).text(data[2].toFixed(0));
  $(`.total-protein`).text(data[3].toFixed(0));
  $(`.total-carbs`).text(data[4].toFixed(0));
  $(`.total-fiber`).text(data[5].toFixed(0));
  $(`.total-sugar`).text(data[6].toFixed(0));
}
