import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { userId, setUserId } = props;
  const navigate = useNavigate();

  // click handler for login buttons
  const handleLogin = (userId) => { 
    console.log(`Logging in user with ID: ${userId}`);
    if ([1, 2, 3].includes(userId)) { //super basic check to validate api request to DB
      setUserId(userId);
      navigate('/')
    }
  };

  return (
    <div className="login">
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
  );
};

export default Login;
