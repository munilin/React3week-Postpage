import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadWriteFB, deleteWriteFB, updateWriteFB } from "./redux/modules/write";
import Topbar from "./Topbar";

const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadWriteFB());
  }, []);
  // 렌더링 될 때마다 실행 됨
  // useEffect가 middleware를 실행시켜줌
  // useEffect 안에 [value] =  화면에 value값이 변경될 때 실행
  // 빈칸은 화면에 첫 렌더링이 될 때 실행

  const write_data = useSelector((state) => state.write);
  // FB 콜렉션 write 불러오기
  // console.log(write_data);
  // 리듀서된 state를 가져와서 write_data에 넣어줘
  // console.log(write_data);
  return (
    <>
      <Topbar />
      {write_data.list.map((list, index) => {
        // console.log(list.id);
        return (
          <Container
            key={index} //쓰면안되는 이유가 있음
          >
            <div>프로필사진 / 닉네임 / 날짜</div>
            <button
              onClick={() => {
                navigate("/post" + index);
                dispatch(updateWriteFB(list[index].id));
              }}
            >
              수정하기
            </button>

            <button
              onClick={() => {
                dispatch(deleteWriteFB(list[index]));
                console.log("삭제하기 버튼을 눌렀어!");
              }}
            >
              삭제하기
            </button>

            <FileBox>
              <img src={list.img_url} alt="preview-img" />
            </FileBox>
            <div>{list.write}</div>
            <h5>좋아요 / 댓글 / 하트</h5>
          </Container>
        );
      })}

      <button
        onClick={() => {
          navigate("/post");
        }}
      >
        작성하기
      </button>
    </>
  );
};

const Container = styled.div`
  width: 800px;
  height: 600px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid;
  & div {
    margin: 20px auto;
  }
`;

const FileBox = styled.div`
  background-color: #efefef;
  width: 300px;
  height: 300px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

export default Home;
