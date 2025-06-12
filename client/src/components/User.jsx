import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams(); // Extract user ID from route
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${id}/liked-recipes`)
      .then(res => setRecipes(res.data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, [id]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Liked Recipes</h2>
      {recipes.length === 0 ? (
        <p>No liked recipes found.</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id} style={{ marginBottom: '1rem' }}>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                {recipe.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
