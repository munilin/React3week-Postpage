import React from "react";
import styled from "styled-components";


const Topbar = (props) => {
  console.log(props);

  return (
      <>
    <div style={{
        margin: '15px',
        position: 'fixed',
        right: '15px',
    }}>
        {/* navigater로 연결하기*/}
      <button style={{
          position: 'fixed',
          left: '15px',
        }}>홈화면</button>

      <button>회원가입</button> &nbsp;
      <button>로그인</button>
    </div>
    

    </>
  );
};



export default Topbar;
