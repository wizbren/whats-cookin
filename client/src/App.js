import { useEffect, useState } from 'react';


function App() {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/test')
      .then(res => res.json())
      .then(data => setApiMessage(data.message))
      .catch(err => console.error('Error fetching API:', err));
  }, []);

  return (
    <div>
      <h1>What's Cookin'</h1>
      <p>Message from API: {apiMessage}</p>
    </div>
  );
}

export default App;