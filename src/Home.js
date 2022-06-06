import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import Topbar from "./Topbar";

const Home = (props) => {
  console.log(props);

  return (
    <>
      <Topbar />

      <Container>111</Container>
    </>
  );
};

const Container = styled.div`
  width:600px;
  height:350px;
  position:absolute;
  left:30%;
  top:20%;
  border:1px solid;
  
  `;

export default Home;
