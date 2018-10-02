CREATE TABLE IF NOT EXISTS meals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255)
);
