DROP TABLE IF EXISTS ingredients;

CREATE TABLE IF NOT EXISTS ingredients ( 
  ingredient_id SERIAL PRIMARY KEY, 
  ndbno VARCHAR(255),
  ingredient text,
  amount numeric(19,0),
  calories numeric(19,2), 
  fat numeric(19,2), 
  protein numeric(19,2),
  carbs numeric(19,2), 
  fiber numeric(19,2), 
  sugar numeric(19,2), 
  meal_id INT
);