import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8080/api/users/${userId}/liked-recipes`)
      .then(res => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching recipes:', err);
        setLoading(false);
      });
  }, [userId, navigate]);

  const deleteRecipe = (id) => {
    axios.delete(`http://localhost:8080/api/recipes/${id}`)
      .then(() => {
        setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      })
      .catch(err => console.error('Error deleting recipe:', err));
  };

  const goBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return <div>Loading your favorite recipes...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={goBack} style={{ marginRight: '10px' }}>
          ← Back
        </button>
        <h2>Your Favorite Recipes</h2>
      </div>
      
      {recipes.length === 0 ? (
        <p>You haven't liked any recipes yet!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recipes.map(recipe => (
            <li key={recipe.id} style={{ 
              marginBottom: '15px', 
              padding: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <a 
                href={recipe.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  textDecoration: 'none', 
                  color: '#007bff',
                  fontSize: '16px',
                  flex: 1
                }}
              >
                {recipe.title || recipe.url}
              </a>
              <button 
                onClick={() => deleteRecipe(recipe.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;