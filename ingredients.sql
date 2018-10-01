DROP TABLE IF EXISTS ingredients;

CREATE TABLE IF NOT EXISTS ingredients ( 
  id SERIAL PRIMARY KEY, 
  ingredient text, 
  calories numeric(5,3), 
  fat numeric(5,3), 
  protein numeric(5,3),
  carbs numeric(5,3), 
  fiber numeric(5,3), 
  sugar numeric(5,3), 
  meal_id SERIAL FOREIGN KEY
);