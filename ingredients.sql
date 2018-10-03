DROP TABLE IF EXISTS ingredients;

CREATE TABLE IF NOT EXISTS ingredients ( 
  id SERIAL PRIMARY KEY, 
  ndbno VARCHAR(255),
  ingredient text,
  amount numeric(6,0),
  calories numeric(6,2), 
  fat numeric(6,2), 
  protein numeric(6,2),
  carbs numeric(6,2), 
  fiber numeric(6,2), 
  sugar numeric(6,2), 
  meal_id INT
);