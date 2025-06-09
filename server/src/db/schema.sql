CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, --unique prevents duplicate emails
  password VARCHAR(255) NOT NULL
);

CREATE TABLE Recipes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL,
  liked BOOLEAN NOT NULL DEFAULT true, --i think default true will make it so that we dont have to change the status when we like something, just when we unlike it
  image TEXT NOT NULL
);