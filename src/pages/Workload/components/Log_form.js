import "./Log_form.css"

import man_icon from "../../../picture/user.png";
import React, { useState, useContext } from 'react';
import Input_set from "./Input_set";
import Chooseinvoice from "./Chooseinvoice";
import donationTeamImg from "../../../picture/donation_team.png";
import AuthContext from "./AuthContext.js";


const Log_form = ({GO_Click, money_index}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const password_type = "password";
    const text_type = "text";
    const Email = "信箱帳號";
    const Password = "密碼";
    const { loggedIn, setLoggedIn } = useContext(AuthContext);


    const handleSubmit = async (event) => {
      event.preventDefault();      
      const requestOptions = {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      };
      try {
        const response = await fetch(`http://0.0.0.0:8000/login`, requestOptions);
        if (response.ok) {
          const data = await response.json();
          const accountName = data.Account;
          alert("Login successful, " + accountName); // 将回应内容转化为字符串并显示
          setLoggedIn(accountName);
          
        } else {
          const responseData = await response.json();
          const errorDetail = responseData.detail;
          alert(errorDetail);
        }
      } catch (error) {
        alert(error.status);
      }
    };
    
    return (
      <div style={{display: "flex", flexDirection: "column", width:"100%", height:"100%"}}>
        {loggedIn === "未登錄" ? (
          <form className="Form_profile" onSubmit={handleSubmit} acceptCharset="UTF-8">
            <Input_set Text={Email} Icon={man_icon} accepted={email} API={setEmail} Type={text_type} />
            <Input_set Text={Password} Icon={man_icon} accepted={password} API={setPassword} Type={password_type} />
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
        ) : (
          <form className="Form_profile" onSubmit={handleSubmit} acceptCharset="UTF-8">
            <div style={{fontSize:"80px"}}>
              嗨, {loggedIn}
            </div>
          </form>
        )}
      </div>
    );
  };  
export default Log_form;