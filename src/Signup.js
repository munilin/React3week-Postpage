import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";
import { auth, db } from "./shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {

  const navigate = useNavigate();

  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw1_ref = React.useRef(null);
  const pw2_ref = React.useRef(null);

  const signupFB = async () => {
    // 값이 전부 말짱해! > 벨리데이션
  
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw1_ref.current.value
    );
    console.log(user);

    const user_doc = await addDoc(collection(db, "users"), { // (콜렉션),{넣을데이터}
      user_id: user.user.email,
      name: name_ref.current.value,
    }); 
    console.log(user_doc.id);

  };

  return (
    <>
      <Topbar />
      <br />
      {/* 다른 이미지image,파일선택file도 input으로 함 */}
      <Box>
        <h1>회원가입</h1>
        <div>아이디</div>
        <input type="email" ref={id_ref} placeholder="아이디를 입력해주세요" />
        <div>닉네임</div>
        <input type="text" ref={name_ref} placeholder="닉네임을 입력해주세요" />
        <div>비밀번호</div>
        <input type="password" ref={pw1_ref} placeholder="비밀번호를 입력해주세요" />
        <div>비밀번호 확인</div>
        <input type="password" ref={pw2_ref} placeholder="비밀번호를 다시 입력해주세요" />
        <br />
        <br />
        <button onClick={() => {
              signupFB();
              navigate("/");
            }}>회원가입하기</button >
      </Box>
    </>
  );
};

const Box = styled.div`
  text-align: left;
  display: center;
  margin: 100px 15px;
  & input {
    margin-bottom: 15px;
    width: 800px;
  }
`;

export default Signup;
