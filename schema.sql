DROP TABLE IF EXISTS meals;

CREATE TABLE IF NOT EXISTS meals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  total_amount numeric(19,0),
  total_calories numeric(19,2), 
  total_fat numeric(19,2), 
  total_protein numeric(19,2),
  total_carbs numeric(19,2), 
  total_fiber numeric(19,2), 
  total_sugar numeric(19,2)
);
