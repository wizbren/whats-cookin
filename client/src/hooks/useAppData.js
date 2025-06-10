import { useEffect, useState } from "react";

const useAppData = () => {
  const [apiMessage, setApiMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [likedStatus, setLikedStatus] = useState({});
  const [userId, setUserId] = useState(null); //set user Id for login

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  //handles state of liked recipes and should therefore update the DB/API too
  // when called later call like this toggleLikedStatus(recipe.id, recipe.url, recipe.image)
  const toggleLikedStatus = (recipeId, url, image) => {
    const currentStatus = likedStatus[recipeId] || "notLiked";
    const updatedStatus = currentStatus === "liked" ? "notLiked" : "liked";

    setLikedStatus((prev) => ({
      ...prev,
      [recipeId]: updatedStatus,
    }));

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
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Liked recipe saved:", data))
        .catch((err) => console.error("Error saving recipe:", err));
    } else {
      fetch(`http://localhost:8080/api/recipes/${recipeId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete recipe");
          }
          return res.json();
        })
        .then((data) => console.log("Recipe deleted:", data))
        .catch((err) => console.error("Error deleting recipe:", err));
    }
  };

  //handles state of logged in user by user id
  useEffect(() => {
    // Replace when db for users connected
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.id);
      })
      .catch((error) => console.error("Error fetching user ID:", error));
  }, []);

  return {
    apiMessage,
    modalOpen,
    setModalOpen,
    likedStatus,
    toggleLikedStatus,
    userId,
    setUserId,
  };
};

export default useAppData;
