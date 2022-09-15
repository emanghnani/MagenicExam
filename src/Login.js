import {useNavigate} from 'react-router-dom' 
import { useState } from 'react';
import './Register.css';
import Axios from 'axios';
import React from 'react';



function Login() {

  Axios.defaults.withCredentials = true;
  let navigate = useNavigate();
  
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = () => {
    
    Axios.post('http://https://magenic-exam-react.herokuapp.com/login', {
      username, 
      password, 
    }).then((response) => {
    
    if(response.data.message){
        alert(response.data.message)
    }
    else{
        navigate('/cardInterface');
    }
    });
  };


  return(
    <div className="App">
      Q-Less Login Interface
      <div className = "UserInfo">
      <br></br>
      <label>Username:</label>
      <input type="text" onChange={(event) => {
        setUserName(event.target.value);
      }} />
      <label>Password:</label>
      <input type="password" onChange={(event) => {
        setPassword(event.target.value);
      }} />
      <button onClick={loginUser}>Login</button>
      <button onClick={() => {
             navigate('/'); }}>Back to Home</button>
      </div>
    </div>
  );
}

export default Login;