DROP TABLE IF EXISTS ingredients;

CREATE TABLE IF NOT EXISTS ingredients ( 
  id SERIAL PRIMARY KEY, 
  ingredient text,
  amount numeric(5,0),
  calories numeric(5,2), 
  fat numeric(5,2), 
  protein numeric(5,2),
  carbs numeric(5,2), 
  fiber numeric(5,2), 
  sugar numeric(5,2), 
  meal_id INT
);