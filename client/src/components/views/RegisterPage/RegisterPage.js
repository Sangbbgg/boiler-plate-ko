import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHeandler = (e) => {
    e.preventDefault();

    if(Password !== ConfirmPassword){
      return alert("비밀번호를 확인해주세요.")
    }

    const body = {
      email: Email,
      name: Name,
      password: Password,

    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.registerSuccess) {
        navigate("/login");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={onSubmitHeandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}></input>

        <label>Password</label>
        <input
          type="Password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>

        <label>Confirm Password</label>
        <input
          type="Password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        ></input>

        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default RegisterPage;
