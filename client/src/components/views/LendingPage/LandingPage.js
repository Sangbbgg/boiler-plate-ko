import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  const navigate = useNavigate();
  const onClickHeadler=()=>{

    axios.get("/api/users/logout")
    .then(response=>{
      if(response.data.success){
        navigate('/login')
      }else{
        alert("로그아웃 실패")
      }
      console.log(response.data)
    })
  }
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
      <h2>시작 페이지호호!</h2>
      <button onClick={onClickHeadler}>
        로그아웃
      </button>
    </div>
  );
}

export default LandingPage;
