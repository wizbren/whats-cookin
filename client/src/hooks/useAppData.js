import { useEffect, useState } from "react";

const useAppData = () => {
  const [apiMessage, setApiMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [likedStatus, setLikedStatus] = useState({});
  const [userId, setUserId] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipesFromDB, setRecipesFromDB] = useState([]);

  // Initial backend test message
  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  // Set userId from localStorage and fetch user data + liked recipes
  useEffect(() => {
    const storedUserId = Number(localStorage.getItem("userId"));
    if (!storedUserId) return;

    setUserId(storedUserId);

    fetch(`http://localhost:8080/api/users/${storedUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.user);
        setRecipesFromDB(data.recipes);

        const statusMap = {};
        data.recipes.forEach((recipe) => {
          statusMap[recipe.id] = recipe.liked ? "liked" : "notLiked";
        });
        setLikedStatus(statusMap);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  // Toggle like/unlike for a recipe
  const toggleLikedStatus = (recipeId, url, image) => {
    const currentStatus = likedStatus[recipeId] || "notLiked";
    const updatedStatus = currentStatus === "liked" ? "notLiked" : "liked";

    if (!userId) return console.error("No user ID found!");

    if (updatedStatus === "liked") {
      fetch("http://localhost:8080/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, url, image }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to save recipe");
          return res.json();
        })
        .then(() => {
          setLikedStatus((prev) => ({ ...prev, [recipeId]: "liked" }));
        })
        .catch((err) => console.error("Error saving recipe:", err));
    } else {
      fetch(`http://localhost:8080/api/recipes/${recipeId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete recipe");
          return res.json();
        })
        .then(() => {
          setLikedStatus((prev) => ({ ...prev, [recipeId]: "notLiked" }));
        })
        .catch((err) => console.error("Error deleting recipe:", err));
    }
  };

  // Fetch recipe suggestions using OpenAI + Edamam
  const fetchRecipes = async () => {
    try {
      const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that extracts food search terms for recipe APIs.",
            },
            {
              role: "user",
              content: `${prompt}. Reply with only the main ingredient or food.`,
            },
          ],
        }),
      });

      const openAIData = await openAIResponse.json();
      let queryString = openAIData.choices?.[0]?.message?.content || "";
      queryString = queryString.replace(/^Search query:\s*/i, "").trim();

      const quotedMatch = queryString.match(/"(.*?)"/);
      if (quotedMatch) queryString = quotedMatch[1];

      console.log("🔍 Final query to Edamam:", queryString);

      const edamamResponse = await fetch("http://localhost:8080/api/recipes/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryString }),
      });

      const edamamData = await edamamResponse.json();

      const cleanedRecipes = edamamData.hits.slice(0, 5).map((hit) => ({
        id: hit.recipe.url,
        title: hit.recipe.label,
        description: hit.recipe.ingredientLines.slice(0, 3).join(", "),
        image: hit.recipe.image,
        url: hit.recipe.url,
      }));

      setRecipes(cleanedRecipes);

      const newStatusMap = {};
      cleanedRecipes.forEach((recipe) => {
        const isLiked = recipesFromDB.some((dbRecipe) => dbRecipe.url === recipe.url);
        newStatusMap[recipe.url] = isLiked ? "liked" : "notLiked";
      });
      setLikedStatus(newStatusMap);
    } catch (err) {
      console.error("Error in fetchRecipes:", err);
    }
  };

  return {
    apiMessage,
    modalOpen,
    setModalOpen,
    likedStatus,
    toggleLikedStatus,
    userId,
    setUserId,
    recipes,
    setRecipes,
    fetchRecipes,
    prompt,
    setPrompt,
    userInfo,
    setUserInfo,
    submitted,
    setSubmitted,
    selectedRecipe,
    setSelectedRecipe,
    recipesFromDB,
    setRecipesFromDB,
  };
};

export default useAppData;
