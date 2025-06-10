import { useEffect, useState } from "react";

const useAppData = () => {
  const [apiMessage, setApiMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);    // store recipe results from Edamam in array
  const [prompt, setPrompt] = useState("");      // moved from Main.jsx, process User text input

  useEffect(() => {
    fetch("http://localhost:8080/api/test")     
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  const fetchRecipes = async () => {
    try {
          //uses OpenAI to convert a prompt into a search query
      const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,      // <== UNSURE IF THIS IS CORRECT WAY TO REF KEY
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant that extracts food search terms for recipe APIs." },  // String currated by ChatGPT
            { role: "user", content: `Turn this prompt into ingredients or a search query for Edamam: ${prompt}` }        // uses state ; String currated by ChatGPT
          ],
        }),
      });

      const openAIData = await openAIResponse.json();
      const queryString = openAIData.choices?.[0]?.message?.content || "";

      console.log("OpenAI query:", queryString);

      //use OpenAI to fetch from Edamam  +  LINE 41 needs to be looked at and changed(need App ID and Key)
      const edamamResponse = await fetch(
        `https://api.edamam.com/search?q=${encodeURIComponent(queryString)}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
      );
      const edamamData = await edamamResponse.json();

      console.log("Edamam recipes: ", edamamData.hits);
      setRecipes(edamamData.hits); // store recipe results

    } catch (err) {
      console.error("Error in fetchRecipes:", err);
    }
  };  

  return {
    apiMessage,
    modalOpen,
    setModalOpen,
    recipes,        // allows Main to access it
    fetchRecipes,   // function expoesed to run logic in Main
    prompt,         // for controlled form
    setPrompt,      // for textarea change
  };
};

export default useAppData;