import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";
import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const navigate = useNavigate();


  const id_ref = React.useRef(null);
  const pw1_ref = React.useRef(null);

  const loginFB = async () => {
    console.log(id_ref.current.value, pw1_ref.current.value);
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw1_ref.current.value
    );

    console.log(user);

    const user_docs = await getDocs(
      query(collection(db, "users"), where("user_id", "==", user.user.email))
    );

    user_docs.forEach((u) => {
      console.log(u.data());
    });
    navigate("/");
  };

  return (
    <>
      <Topbar />
      <br />
      <Div>
        <h1>로그인</h1>
        아 이 디
        <br />
        <input type="email" ref={id_ref} /> <br />
        비밀번호
        <br />
        <input type="password" ref={pw1_ref} />
        <br />
        <button
          onClick={() => {
            loginFB();
            // navigate같이 넣으면 먼저 실행되서 이동이 안됨 그래서 loginFB 끝으로 옮김
          }}
        >
          로그인
        </button>
      </Div>
    </>
  );
};

const Div = styled.div`
  max-width: 800px;
  height: 300px;
  border: 1px solid;
  text-align: left;
  margin: 20px auto;
  padding: 16px;
  & input {
    margin-bottom: 15px;
    width: 500px;
    border: 1px solid blue;
  }
`;

export default Login;
