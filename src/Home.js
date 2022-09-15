import React from "react";
import {useNavigate} from 'react-router-dom' 

function Home() {
    let navigate = useNavigate();
    return (
        <div className="App">
          Q-Less Interface
         <div className = "UserInfo">
         <button onClick={() => {
             navigate('/register');
         }}>Register for Q-Less Transport Card</button>
         <button onClick={() => {
             navigate('/registerDiscounted'); }}
             >Register for Q-Less Discounted Transport Card</button>
         <button onClick={() => {
             navigate('/Login'); }}>Login</button>
         </div>
         </div>
        );

}

export default Home;