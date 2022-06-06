import React from "react";
import styled from "styled-components";

import { auth } from "./shared/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Topbar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          margin: "15px",
          position: "fixed",
          right: "15px",
          width: "700px",
        }}
      >
        {/* navigater로 연결하기*/}
        <button
          style={{
            position: "fixed",
            left: "15px",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          홈화면
        </button>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </button>
        &nbsp;
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </button>
        <button
          onClick={() => {
            navigate("/");
            signOut(auth);
          }}
        >
          로그아웃
        </button>
      </div>
    </>
  );
};

export default Topbar;
