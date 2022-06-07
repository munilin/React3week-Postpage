import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import {loadWriteFB} from "./redux/modules/write";
import Topbar from "./Topbar";

const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //useEffect가 dispatch 실행시켜줌
  React.useEffect(() => {
    dispatch(loadWriteFB());
  }, []);

  //데이터 불러오기
  const write_data = useSelector((state) => state.write);
  console.log(write_data)

    return (
      <>
      <Topbar />
      <Container>
      {write_data.list.map((list, index) => {
      console.log(list)
        return (
        <div>{list.sdf}</div>
        );
      })}
        포스트 화면입니다
        <button
          onClick={() => {
            navigate("/post");
          }}
        >
          글쓰기{" "}
        </button>
      </Container>
    </>
  );
};

{/* 
      {write_data.list.map((list, index) => {
      console.log(list)

        return (
        <div>{list.sdf}</div>
        );
      })}
*/}

const Container = styled.div`
  width: 800px;
  height: 400px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid;
`;

export default Home;
