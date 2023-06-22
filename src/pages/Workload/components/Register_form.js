import "./Register_form.css"

import man_icon from "../../../picture/user.png";
import React, { useState } from "react";
import Input_set from "./Input_set";
import Chooseinvoice from "./Chooseinvoice";
import donationTeamImg from "../../../picture/donation_team.png";



const Register_form = ({ onSuccess }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_again, setPassword_again] = useState("");
    const [num, setnum] = useState("");
    


    const Name = "使用者名稱";
    const Email = "信箱帳號";
    const Password = "密碼";
    const Password_again = "驗證密碼";
    const Num = "電話號碼";
    const password_type = "password";
    const text_type = "text";

    const handleSubmit = async (event) => {
      event.preventDefault();      

      if (password !== password_again) {
        alert('Password and confirm password do not match!');
        return;
      }
      
      const requestOptions = {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password, password_again, num})
      };
      try {
        const response = await fetch(`http://0.0.0.0:8000/register`, requestOptions);
        if (!response.ok) { // 如果 HTTP 狀態碼不在 200-299 範圍內，表示出現錯誤
          alert(`Account has been used!`); // 你可以使用你自己的錯誤處理機制，這裡只是一個簡單的示例
          return;
        }
        const responseData = await response.json();
        console.log(responseData);
        onSuccess();
      } catch (error) {
        alert('Account has been used!');
        return;
      }
    };
    

    return ( 
      <div style={{display: "flex", flexDirection: "column", width:"100%", height:"100%"}}>
        <form className="Form_profile" onSubmit={handleSubmit} acceptCharset="UTF-8">
            <Input_set Text={Name} Icon = {man_icon} accepted = {name} API = {setName} Type = {text_type}/>
            <Input_set Text={Email} Icon = {man_icon} accepted = {email} API = {setEmail} Type = {text_type}/>
            <Input_set Text={Password} Icon = {man_icon} accepted = {password} API = {setPassword} Type = {password_type}/>
            <Input_set Text={Password_again} Icon = {man_icon} accepted = {password_again} API = {setPassword_again}  Type = {password_type}/>
            <Input_set Text={Num} Icon = {man_icon} accepted = {num} API = {setnum} Type = {text_type}/>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      );
      
  };  
export default Register_form;