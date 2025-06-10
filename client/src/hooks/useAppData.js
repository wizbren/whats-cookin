import { useEffect, useState } from "react";

const useAppData = () => {
  const [apiMessage, setApiMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [likedStatus, setLikedStatus] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);


  //handles state of liked recipes and should therefore update the DB/API too
  const toggleLikedStatus = (recipeId) => {
    setLikedStatus((prev) => {
      const currentStatus = prev[recipeId] || "notLiked";
      const updatedStatus = currentStatus === "liked" ? "notLiked" : "liked";

      return {
        ...prev,
        [recipeId]: updatedStatus,
      };
    });
  };

  return {
    apiMessage,
    modalOpen,
    setModalOpen,
    likedStatus,
    toggleLikedStatus,
  };
};

export default useAppData;
