import { useState } from 'react';
import './Register.css';
import Axios from 'axios';
import React from 'react';
import {useNavigate } from 'react-router-dom' 
import { useForm } from 'react-hook-form'



function RegisterDiscounted() {

  let navigate = useNavigate();
  
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [radio, setRadio] = useState("senior");
  const [discountCardNumber, setDiscountCardNumber] = useState("");
  const isDiscounted = true;
  
  Axios.defaults.withCredentials = true;

  const addUser = (data) => {

    var currentDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
    var expiryDate = new Date(currentDate).toISOString().slice(0, 19).replace('T', ' ');
    var cardLoad = 500;
    
    Axios.post('http://https://magenic-exam-react.herokuapp.com/register', {
      username, 
      password, 
      expiryDate,
      cardLoad,
      isDiscounted,
      discountCardNumber
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

  // const {register, handleSubmit, formState: {errors},} = useForm()
  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit= (data) =>{
    addUser()
  }
  
  console.log(errors)

  return (
  <div className="App">
  <form onSubmit={handleSubmit(onSubmit)}>
    Q-Less Discounted Card Registration Interface
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
      <label>Select Card Type:</label>
      <br />
      <div className = "CardTypes">
      <label>Senior Citizen</label>
      <input type = "radio" 
             checked={radio === "senior"}
             value = "senior"
             onChange = {(e) => {setRadio(e.target.value)}}/>
      <label>PWD</label>
      <input type = "radio" 
             checked={radio === "pwd"}
             value = "pwd"
             onChange = {(e) => {setRadio(e.target.value)}}/>
      </div>
      <br />
      <label>PWD Card Number:</label>
      <input type="text" 
      disabled={radio === "senior"}
      name = "pwdid"
      {...register('pwdid', {pattern:{value:/^\d{4}-\d{4}-\d{4}$/, message:"Invalid ID format, must follow ####-####-#### format"}})}
      onChange={(event) => {setDiscountCardNumber(event.target.value);}} />
       <p style={{ color: 'red' }}>{errors.pwdid?.message}</p>
      <label>Senior Citizen Card Number:</label>
      <input type="text" 
      disabled={radio === "pwd"}
      name = "seniorcitizen"
      {...register('seniorcitizen', {pattern:{value:/^\d{2}-\d{4}-\d{4}$/, message:"Invalid ID format, must follow ##-####-#### format"}})}
      onChange={(event) => {setDiscountCardNumber(event.target.value);}} />
        <p style={{ color: 'red' }}>{errors.seniorcitizen?.message}</p>
       <button>Submit</button>
        <button onClick={() => {
             navigate('/'); }}>Back to Home</button>
      </div>
      </form>
    </div>
    
    
  );

}

export default RegisterDiscounted;
