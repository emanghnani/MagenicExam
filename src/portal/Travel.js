import React, { useContext } from "react";
import {useNavigate } from 'react-router-dom' 
import {useEffect, useState, } from 'react' 
import  Axios  from 'axios';
import moment from 'moment'
import cardInterface from "./CardInterface";
import { UserContext } from "../Helper/Context";

function Travel() {

    const {userData, setUserData, lastTravel, 
        setLastTravel, expiryDate, setExpiryDate, 
        currentLoad, setCurrentLoad, isDiscounted, 
        dailyTravels, setDailyTravels} = useContext(UserContext)

    Axios.defaults.withCredentials = true;

    function updateCardLoad(price) {

        let dailyTravel = dailyTravels;
        if(isDiscounted == 1)
        {
             price = price - 5;
             console.log(moment().add(1, 'hours'))
             if(moment(lastTravel).isAfter(moment().add(24, 'hours'))){
                dailyTravel = 1;
                console.log('not between 24 hours')
            }else{
                dailyTravel = dailyTravel + 1;
                setDailyTravels(dailyTravel)
                console.log(dailyTravel)
                console.log('date is within 24 hours');
            }

            if(dailyTravel >=2 && dailyTravel <= 5 )
            {
                price = price * 0.77;
            }
            else
            {
                price = price * 0.8;
            }
        }
        if(currentLoad > price)
        {
        let newLoad = currentLoad - price
        setCurrentLoad(newLoad);
        let dateNow = moment().format('YYYY-MM-DD H:mm:ss');
        setLastTravel(dateNow);
        var lastTravelUpdate = dateNow;
        let currentDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
        let expiry = new Date(currentDate).toISOString().slice(0, 19).replace('T', ' ');
        setExpiryDate(expiry);
        console.log(dailyTravel)
        Axios.put("http://localhost:3001/update", {cardLoad : newLoad, lastTravel: lastTravelUpdate, expiryDate: expiry, dailyTravels: dailyTravel, username: userData.username }).then
        ((response) => {
        }
        );
        }
        else{
            alert("Insufficient Funds!")
        }
        
    }

    let navigate = useNavigate();
    return (
        <div className="App">
         <div className = "UserInfo">
        <label>Select ticket to purchase:</label>
         <button onClick={() => {updateCardLoad(15)}}>Manila-Paranaque </button>
         <button onClick={() => {updateCardLoad(15)}}>Paranaque-Manila</button>
         <button onClick={() => {updateCardLoad(15)}}>Makati-Quezon City</button>
         <button onClick={() => {updateCardLoad(15)}}>Quezon City-Makati</button>
         <button onClick={() => {updateCardLoad(15)}}>Manila-Makati</button>
         <button onClick={() => {updateCardLoad(15)}}>Makati-Manila</button>
         </div>
         </div>
        );

}

export default Travel;