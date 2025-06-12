import SearchResultList from "./SearchResultList";

const Main = (props) => {
  const {
    prompt,
    setPrompt,
    fetchRecipes,
    submitted,
    setSubmitted,
    recipesFromSearch,
    setModalOpen,
    setSelectedRecipe,
    toggleLikedStatus,
    likedStatus,
  } = props; //use shared state + logic

  const handleChange = (event) => {
    setPrompt(event.target.value); // update string in shared prompt state
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevents page reload
    fetchRecipes(); //run recipe search (triggers OpenAI => Edamam logic)
    setSubmitted(true);
  };

  const dummyRecipes = [
    {
      id: 1,
      title: "Green Salad with Avocado",
      description: "A fresh and healthy avocado salad.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://www.edamam.com/results/recipe/?recipe=green-salad-with-avocado-2dbeaf3e96adcdcbcb3a4445ec9729d9/search=salad",
    },
    {
      id: 2,
      title: "Israeli Salad",
      description: "A crunchy, vibrant Israeli salad.",
      image:
        "https://plus.unsplash.com/premium_photo-1676047258557-de72954cf17c?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://www.edamam.com/results/recipe/?recipe=israeli-salad-recipe-8727c90d6f0b4d295c54f566805d2385/search=salad",
    },
    {
      id: 3,
      title: "Hot Mustard",
      description: "A fiery mustard to wake up your taste buds.",
      image:
        "https://images.unsplash.com/photo-1551215536-a01ce2fb0d3d?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://www.edamam.com/results/recipe/?recipe=hot-mustard-recipe-dfcafdc018404541a005c346df3d101b/search=",
    },
    // add more if you want
  ];

  //logic for rendering dummy data if no real data exists
  const recipesToRender =
    recipesFromSearch && recipesFromSearch.length
      ? recipesFromSearch
      : dummyRecipes;

  return (
    <div
      className="main-view"
      style={{ backgroundImage: "url('/images/food.png')" }}
    >
      {!submitted ? (
        <form className="prompt-form" onSubmit={handleSubmit}>
          <textarea
            value={prompt} // control shared state
            onChange={handleChange}
            placeholder="What's on the menu, Chef?"
            className="prompt-textarea"
            rows={5} //*change this for prompt box size
          />
          <button type="submit" className="prompt-icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-fork-knife"
              viewBox="0 0 16 16"
            >
              <path d="M13 .5c0-.276-.226-.506-.498-.465-1.703.257-2.94 2.012-3 8.462a.5.5 0 0 0 .498.5c.56.01 1 .13 1 1.003v5.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5zM4.25 0a.25.25 0 0 1 .25.25v5.122a.128.128 0 0 0 .256.006l.233-5.14A.25.25 0 0 1 5.24 0h.522a.25.25 0 0 1 .25.238l.233 5.14a.128.128 0 0 0 .256-.006V.25A.25.25 0 0 1 6.75 0h.29a.5.5 0 0 1 .498.458l.423 5.07a1.69 1.69 0 0 1-1.059 1.711l-.053.022a.92.92 0 0 0-.58.884L6.47 15a.971.971 0 1 1-1.942 0l.202-6.855a.92.92 0 0 0-.58-.884l-.053-.022a1.69 1.69 0 0 1-1.059-1.712L3.462.458A.5.5 0 0 1 3.96 0z" />
            </svg>
          </button>
        </form>
      ) : (
        <button
          className="btn btn-success"
          style={{ fontSize: "2em", padding: "1em 2em" }}
          onClick={() => setSubmitted(false)}
        >
          Edit Your Search?
        </button>
      )}
      <SearchResultList
        recipesFromSearch={recipesToRender}
        setModalOpen={setModalOpen}
        setSelectedRecipe={setSelectedRecipe}
        toggleLikedStatus={toggleLikedStatus}
        likedStatus={likedStatus}
      />
    </div>
  );
};

export default Main;
