import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";

const Sign = (props) => {
  console.log(props);

  return (
    <>
      <Topbar />
      <br />
{/* 다른 이미지image,파일선택file도 input으로 함 */}
      <Box>
        <h1>회원가입</h1>
        <div>아이디</div>
        <input type="email" placeholder="아이디를 입력해주세요"/>
        <div>닉네임</div>
        <input type="text" placeholder="닉네임을 입력해주세요"/>
        <div>비밀번호</div>
        <input type="password" placeholder="비밀번호를 입력해주세요"/>
        <div>비밀번호 확인</div>
        <input type="password" placeholder="비밀번호를 다시 입력해주세요"/>
        <br/><br/><button>회원가입하기</button>
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

export default Sign;
