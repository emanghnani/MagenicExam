import { useState } from 'react';
import './Register.css';
import Axios from 'axios';
import React from 'react';
import {useNavigate } from 'react-router-dom' 
import moment from 'moment'
import { useForm } from 'react-hook-form'



function Register() {

  let navigate = useNavigate();
  
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const isDiscounted = false;

  
  Axios.defaults.withCredentials = true;

  const addUser = () => {

    let currentDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
    let expiryDate = new Date(currentDate).toISOString().slice(0, 19).replace('T', ' ');
    // let lastTravel = moment().format('YYYY-MM-DD H:mm:ss');
    
    var cardLoad = 100;
    
    Axios.post('http://https://magenic-exam-react.herokuapp.com/register', {
      username, 
      password, 
      expiryDate,
      cardLoad,
      isDiscounted,
    }).then((response) => {
      console.log(response)
      console.log(response.data.message)
    if(response.data.message){
      alert(response.data.message)
    }else{
      alert("Succesfully Created User!")
      navigate('/login')
      console.log("success")
    }
    });


  };

  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit= (data) =>{
    addUser()
  }

  return (
  <div className="App">
    <form onSubmit={handleSubmit(onSubmit)}>
    Q-Less Registration Interface
      <div className = "UserInfo">
      <br></br>
      <label>Username:</label>
      <input type="text" 
      name = "userN"
      {...register('userN', {required: "Username is required", pattern:{value:/^[a-zA-Z0-9.\-_$@*!]{8,30}$/, message:"Invalid username format, username must be between 8-30 characters and not use spaces/commas!"}})}
      onChange={(event) => {setUserName(event.target.value);
      }} />
      <p style={{ color: 'red' }}>{errors.userN?.message}</p>
      <label>Password:</label>
      <input type="password" 
      name = "pword"
      {...register('pword', {required: "Password is required", pattern:{value:/^[a-zA-Z0-9.\-_$@*!]{8,30}$/, message:"Invalid password format, username must be between 8-30 characters and not use spaces/commas!"}})}
      onChange={(event) => {setPassword(event.target.value);
      }} />
      <p style={{ color: 'red' }}>{errors.pword?.message}</p>
      <button>Submit</button>
      <button onClick={() => {
             navigate('/'); }}>Back to Home</button>
      </div>
      </form>
    </div>
  );

}

export default Register;
