import React from "react";
import {useNavigate} from 'react-router-dom' 
import {useEffect, useState, useContext} from 'react' 
import  Axios  from 'axios';
import { UserContext } from "../Helper/Context";

function Reload() {
    let navigate = useNavigate();

    const {userData, setUserData, currentLoad, setCurrentLoad} = useContext(UserContext)

    const [amountToLoad, setAmountToLoad] = useState(0);
    const [change, setChange] = useState(0);
    let customerMoney = 0;

    Axios.defaults.withCredentials = true;

    function reloadCard(reloadValue)
    {
    if(amountToLoad >= 100 && amountToLoad <= 1000)
    {
    if(reloadValue >= amountToLoad){
        if(currentLoad + reloadValue < 10000)
        {
            let updatedLoad = currentLoad + reloadValue;
            setCurrentLoad(currentLoad + reloadValue)
            setChange(reloadValue - amountToLoad)

            Axios.put("http://localhost:3001/reloadCard", {cardLoad : updatedLoad, username: userData.username}).then
        ((response) => {
        }
        );
        }
        else{
            alert("Maximum Load of 10000 PHP only!")
        }
    }
    else{
        alert("Insufficient funds required for reload!")
    }
    }else{
        alert("Minimum of 100PHP and maximum of 1000PHP only!")
    }

}

    return (
         <div className="App">
          <div className = "UserInfo">
         <label>Enter amount to Load:</label>
         <input type="text" onChange={(event) => {
        setAmountToLoad(event.target.value);
        <label>Choose Bill to use:</label>
        }} />
         <button onClick={() => {reloadCard(100)}}>100 PHP</button>
         <button onClick={() => {reloadCard(500)}}>500 PHP</button>
         <button onClick={() => {reloadCard(1000)}}>1000 PHP</button>
        <br></br>
        <br></br>
        <br></br>
        <label>Customer Money: {amountToLoad}</label>
        <label>Change: {change}</label>
        <label>Balance: {currentLoad}</label>
        <br />
         </div>
          </div>
          
          );
          

}

export default Reload;