import UserLikeList from './UserLikeList';

const User = (props) => {
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
    recipes,
    recipesFromDB,
    setRecipesFromDB,
  } = props; //use shared state + logic

  const handleChange = (event) => {
    setPrompt(event.target.value); // update string in shared prompt state
  };

  const handleSubmit = async (event) => {
    // VERIFY: added async/await so that fetchRecipes finishes before setSubmitted is flagged as true
    event.preventDefault(); // prevents page reload
    await fetchRecipes(); //run recipe search (triggers OpenAI => Edamam logic)
    setSubmitted(true);
  };

  const recipesToRender = recipes || []; //VERIFY
  console.log("recipesToRender in Main.jsx:", recipesToRender); //debug log to check what recipes render

  return (
    <div
      className="main-view"
      style={{ backgroundImage: "url('/images/food.png')" }}
    >
      <UserLikeList
        recipesFromSearch={recipesToRender}
        setModalOpen={setModalOpen}
        setSelectedRecipe={setSelectedRecipe}
        toggleLikedStatus={toggleLikedStatus}
        likedStatus={likedStatus}
        recipesFromDB={recipesFromDB}
      />
    </div>
  );
};

export default User;