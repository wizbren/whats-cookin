import { useEffect, useState } from "react";

const useAppData = () => {
  const [apiMessage, setApiMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [likedStatus, setLikedStatus] = useState({});
  const [userId, setUserId] = useState(null); //set user Id for login
  const [recipes, setRecipes] = useState([]); // store recipe results from Edamam in array
  const [prompt, setPrompt] = useState(""); // moved from Main.jsx, process User text input
  const [userInfo, setUserInfo] = useState(null); //keeps track of currently logged in users info
  const [submitted, setSubmitted] = useState(false); //state for conditional rendering of form/button
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipesFromDB, setRecipesFromDB] = useState([]); // user's saved/liked recipes

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  //handles state of liked recipes and should therefore update the DB/API too
  // when called later call like this toggleLikedStatus(recipe.id, recipe.url, recipe.image)
  const toggleLikedStatus = (recipeId, url, image, title, description) => {
    console.log("Toggle called with:", { recipeId, url, image, userId }); //debugging

    const currentStatus = likedStatus[recipeId] || "notLiked";
    const updatedStatus = currentStatus === "liked" ? "notLiked" : "liked";

    if (updatedStatus === "liked") {
      //if status is liked, it gets added
      fetch("http://localhost:8080/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          url,
          image,
          title, //added for user view
          description, //added for user view
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to save recipe");
          return res.json();
        })
        .then(() => {
          setLikedStatus((prev) => ({
            ...prev,
            [recipeId]: "liked",
          }));
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
          setLikedStatus((prev) => ({
            ...prev,
            [recipeId]: "notLiked",
          }));
        })
        .catch((err) => console.error("Error deleting recipe:", err));
    }
  };
  const fetchRecipes = async () => {
    try {
      //uses OpenAI to convert a prompt into a search query
      const openAIResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // <== UNSURE IF THIS IS CORRECT WAY TO REF KEY
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant that extracts food search terms for recipe APIs.",
              }, // String currated by ChatGPT
              {
                role: "user",
                content: `${prompt}. Reply with only the main ingredient or food.`,
              }, // uses state ; String currated by ChatGPT
            ],
          }),
        }
      );

      const openAIData = await openAIResponse.json();
      //    const queryString = openAIData.choices?.[0]?.message?.content || "";

      let queryString = openAIData.choices?.[0]?.message?.content || "";
      queryString = queryString.replace(/^Search query:\s*/i, "").trim();
      console.log("🧠 Raw OpenAI query:", queryString);

      // VERIFY: Trirs to pull out just the first quoted word if it's in quotes
      const quotedMatch = queryString.match(/"(.*?)"/);
      if (quotedMatch) {
        queryString = quotedMatch[1];
      }
      console.log("🔍 Final query to send to Edamam:", queryString);

      console.log("OpenAI query:", queryString);

      //use OpenAI to fetch from Edamam
      const edamamResponse = await fetch(
        "http://localhost:8080/api/recipes/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: queryString }),
        }
      );
      const edamamData = await edamamResponse.json();
      console.log("Edamam recipes: ", edamamData.hits);

      const cleanedRecipes = edamamData.hits.slice(0, 5).map((hit, index) => ({    // VERIFY: this controls how many recipes are displayed
        id: hit.recipe.url, //cant use an integer as it interacts with other users
        title: hit.recipe.label,
        description: hit.recipe.ingredientLines.slice(0, 3).join(", "), // VERIFY: this controls how many ingredients are displayed
        image: hit.recipe.image,
        url: hit.recipe.url,
      }));

      setRecipes(cleanedRecipes); // VERIFY: changed from edamamData.hits to cleanedRecipes to use transformed array
      console.log("Cleaned recipes set in state:", cleanedRecipes);

      //-------------------------------------------------------------------------
      //this is here as a test block to see if i can make the initial states of teh like button for new searches match the database information
      //note that it works... leaving here until it can be tested to not have unexpeded interactions
      const newStatusMap = {};
      cleanedRecipes.forEach((recipe) => {
        const isLiked = recipesFromDB.some(
          (dbRecipe) => dbRecipe.url === recipe.url
        );
        newStatusMap[recipe.url] = isLiked ? "liked" : "notLiked";
      //-------------------------------------------------------------------------
      
      });
      setLikedStatus(newStatusMap);
    } catch (err) {
      console.error("Error in fetchRecipes:", err);
    }
  };

  useEffect(() => {
    if (!userId) {
      setLikedStatus({});
      return;
    }

    fetch(`http://localhost:8080/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.user);
        //------------------------------------------------------------
        //         if (!submitted) {
        //   setRecipes(data.recipes); // reuse your existing state
        // }
        //------------------------------------------------------------
        setRecipesFromDB(data.recipes); // reuse your existing state
        // set likedStatus from DB
        const statusMap = {};
        data.recipes.forEach((recipe) => {
          statusMap[recipe.id] = recipe.liked ? "liked" : "notLiked";
        });
        setLikedStatus(statusMap);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, [userId]);

  //handles state of logged in user by user id
  // i think we dont need this actually, keeping commented until im sure
  // useEffect(() => {
  //   // Replace when db for users connected
  //   fetch("http://localhost:8080/api/users")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUserId(data.id);
  //     })
  //     .catch((error) => console.error("Error fetching user ID:", error));
  // }, []);

  return {
    apiMessage,
    modalOpen,
    setModalOpen,
    likedStatus,
    toggleLikedStatus,
    userId,
    setUserId,
    recipes, // allows Main to access it
    setRecipes,
    fetchRecipes, // function expoesed to run logic in Main
    prompt, // for controlled form
    setPrompt, // for textarea change
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
