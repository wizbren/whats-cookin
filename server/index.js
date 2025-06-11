const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const userResult = await pool.query('SELECT * FROM Users WHERE id = $1', [userId]);
    const recipeResult = await pool.query('SELECT * FROM Recipes WHERE user_id = $1', [userId]);

    const user = userResult.rows[0];
    const recipes = recipeResult.rows;

    res.json({ user, recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});