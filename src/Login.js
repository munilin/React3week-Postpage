import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";
import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, collection } from "firebase/firestore";

const Login = (props) => {
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
  };

  return (
    <>
      <Topbar /><br />
      <Div>
        아이디 : <input ref={id_ref} /> <br />
        비밀번호 : <input ref={pw1_ref} />
        <br />
        <button onClick={loginFB}>로그인</button>
      </Div>
    </>
  );
};

const Div = styled.div`
margin: 100px;
`

export default Login;
