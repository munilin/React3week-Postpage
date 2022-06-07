import React from "react";
import styled from "styled-components";

import { auth } from "./shared/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Topbar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Bar>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          홈화면
        </button>

          프로필사진

          닉네임
          
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
      </Bar>
    </>
  );
};

const Bar = styled.div`
  max-width: 800px;
  min-height: 30px;
  padding: 16px;
  margin: 20px auto;
  border: 1px solid #ddd;
`;

export default Topbar;
