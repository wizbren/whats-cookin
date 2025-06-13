import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { userId, setUserId, setUserInfo } = props;
  const navigate = useNavigate();

  // User data from database - first 3 users
  const userData = {
    1: { id: 1, name: "Berti Josiah", email: "bjosiah0@yahoo.co.jp" },
    2: { id: 2, name: "Colly Westcott", email: "cwestcott1@umn.edu" },
    3: { id: 3, name: "Zolly Hinks", email: "zhinks2@domainmarket.com" }
  };

  // click handler for login buttons
  const handleLogin = (userId) => { 
    console.log(`Logging in user with ID: ${userId}`);
    if ([1, 2, 3].includes(userId)) { //super basic check to validate api request to DB
      const selectedUser = userData[userId];
      setUserId(userId);
      setUserInfo(selectedUser);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userInfo", JSON.stringify(selectedUser));
      navigate('/');
    }
  };

  return (
    <div className="login" style={{ backgroundImage: "url('/images/food.png')" }}>
      <div className="login-container">
        <h2>Select User to Login</h2>
        <div className="login-buttons">
          <button className="btn btn-success btn-lg" onClick={() => handleLogin(1)}>
            User 1
          </button>
          <button className="btn btn-success btn-lg" onClick={() => handleLogin(2)}>
            User 2
          </button>
          <button className="btn btn-success btn-lg" onClick={() => handleLogin(3)}>
            User 3
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;