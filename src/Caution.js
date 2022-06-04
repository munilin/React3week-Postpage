import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";

const Caution = (props) => {
  console.log(props);

  return (
    <>
      <Topbar />
      <div>로그인 이용 경고 화면 입니다</div>
    </>
  );
};

export default Caution;
