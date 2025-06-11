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
          Return to Main Page
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
              alignItems: 'center'
            }}>
              {recipe.image && (
                <img 
                  src={recipe.image} 
                  alt="Recipe" 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '8px', 
                    marginRight: '15px',
                    objectFit: 'cover'
                  }} 
                />
              )}
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
                {recipe.title || 'View Recipe'}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;