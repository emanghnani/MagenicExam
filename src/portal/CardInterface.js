import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {useEffect, useState, } from 'react' 
import  Axios  from 'axios';
import moment from 'moment'
import { UserContext } from "../Helper/Context";

function CardInterface() {

    const [userData, setUserData] = useState("");
    const [currentLoad, setCurrentLoad] = useState("");
    const [lastTravel, setLastTravel] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [dailyTravels, setDailyTravels] = useState(0);

    Axios.defaults.withCredentials = true;

    useEffect(() => {
       
        Axios.get("http://https://magenic-exam-react.herokuapp.com/login").then((response) => {{
          console.log(response.data.loggedIn)
            if(response.data.loggedIn == true)
            {
            console.log(response.data.user[0])
            setUserData(response.data.user[0])
            setCurrentLoad(response.data.user[0].cardLoad)
            setExpiryDate(moment(response.data.user[0].expiryDate).format('YYYY-MM-DD H:mm:ss'))
            setLastTravel(moment(response.data.user[0].lastTravel).format('YYYY-MM-DD H:mm:ss'))
            setIsDiscounted(response.data.user[0].discounted)
            setDailyTravels(response.data.user[0].dailyTravels)
            }
        }
        })
    }, [])

  return (
    <UserContext.Provider value = {{userData, setUserData, currentLoad, setCurrentLoad, expiryDate, setExpiryDate, lastTravel, setLastTravel, isDiscounted, dailyTravels, setDailyTravels}} >
    <div className="cardInterface">
    Q-Less Card Homepage
   <div className = "UserInfo">
   <label>Welcome {userData.username}</label>
   <label>Your current balance is: {currentLoad}</label>
   <label>Your last travel date is: {lastTravel}</label>
   <label>Your expiry date is: {expiryDate}</label>
   </div>
    <br></br>
    <br></br>
      <div className="cardInterfaceNav">
        <Link to="/cardInterface/travel"> Travel </Link>
        <Link to="/cardInterface/reload"> Reload </Link>
      </div>
      <br></br>
      <br></br>
      <Outlet />
    </div>
    </UserContext.Provider>
  );
}

export default CardInterface;