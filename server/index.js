require("dotenv").config();
console.log("🔍 Edamam ID:", process.env.EDAMAM_APP_ID);
console.log("🔍 Edamam KEY:", process.env.EDAMAM_APP_KEY);
const express = require("express");
const cors = require("cors");
const pool = require("./src/db");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const recipesRoutes = require("./src/routes/recipes"); // Mounts Edamam API route
app.use("/api/recipes", recipesRoutes);

// Basic test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// 🔵 GET full user info (name, all their recipes)
app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    console.log("Running user query...");

    const recipeResult = await pool.query(
      "SELECT * FROM recipes WHERE user_id = $1",
      [userId]
    );
    console.log("Running recipe query...");

    const user = userResult.rows[0];
    const recipes = recipeResult.rows;

    res.json({ user, recipes });
  } catch (err) {
    console.error("❌ Error in /api/users/:id:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 🔵 POST new recipe
app.post("/api/recipes", async (req, res) => {
  const { user_id, url, image } = req.body;

  if (!user_id || !url || !image) {
    return res.status(400).json({ error: "Missing user_id, url, or image" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO recipes (user_id, url, image)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, url) DO NOTHING
      RETURNING *`,
      [user_id, url, image]
    );
    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      res.status(200).json({ message: "Recipe already exists" });
    }
  } catch (err) {
    console.error("❌ Error adding recipe:", err);
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

// 🔵 DELETE recipe
app.delete("/api/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  const { user_id } = req.body;

  try {
    const result = await pool.query(
      `DELETE FROM recipes
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [recipeId, user_id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Recipe not found or not owned by user" });
    }

    res.json({ message: "Recipe deleted", recipe: result.rows[0] });
  } catch (err) {
    console.error("❌ Error deleting recipe:", err);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

// GET liked recipes only for a specific user (FIXED)
app.get("/api/users/:id/liked-recipes", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM recipes WHERE user_id = $1 AND liked = true",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error in /api/users/:id/liked-recipes:", err);
    res.status(500).json({ error: "Failed to fetch liked recipes" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
