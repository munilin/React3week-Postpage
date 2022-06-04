import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";

const Post = (props) => {
  console.log(props);

  return (
    <>
      <Topbar />
      <Card></Card>
    </>
  );
};

const Card = styled.div`
  width: 800px;
  height: 350px;
  background-color: red;
  margin-top: 40px;
`;

export default Post;
