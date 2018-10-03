CREATE TABLE IF NOT EXISTS meals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  total_amount numeric(8,0),
  total_calories numeric(8,2), 
  total_fat numeric(8,2), 
  total_protein numeric(8,2),
  total_carbs numeric(8,2), 
  total_fiber numeric(8,2), 
  total_sugar numeric(8,2)
);
