const express = require("express");
const cors = require("cors");
const pool = require("./src/db");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

//this is temp test code, to be deleted
app.get("/api/whoami", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_user, current_database();");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error checking identity:", err);
    res.status(500).json({ error: "Failed to check user" });
  }
});


app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    console.log("Running user query..."); //debugging
    const recipeResult = await pool.query("SELECT * FROM recipes WHERE user_id = $1", [userId]);
    console.log("Running recipe query..."); //debugging

    const user = userResult.rows[0];
    const recipes = recipeResult.rows;

    res.json({ user, recipes });
  } catch (err) {
    console.error("❌ Error in /api/users/:id:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
