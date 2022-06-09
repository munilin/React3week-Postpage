import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "./Topbar";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "./shared/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWriteFB } from "./redux/modules/write";
import { collection, addDoc } from "firebase/firestore";

const Post = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const file_link_ref = React.useRef(null);
  const write_ref = React.useRef(null);

  //사진업로드
  const uploadFB = async (e) => {
    // console.log(e.target.files);

    const uploded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    ); // console.log(uploded_file);
    const file_url = await getDownloadURL(uploded_file.ref);
    // console.log(file_url);
    file_link_ref.current = { url: file_url };
    // const user_doc = await addDoc(collection(db, "write"), {
    //   write: write_ref.current?.value,
    //   img_url: file_link_ref.current?.url,
    // });
  };
  // console.log(user_doc.id);
  // user_doc은 입력만해도 자동으로 들어가서 주석했음
  // ? 옵셔널체이닝 : 값 없으면 undefined로 넣어줘

  // 추가하기 버튼에 넣을 디스패치 최종값
  const addWriteList = () => {
    dispatch(
      addWriteFB({
        write: write_ref.current?.value,
        img_url: file_link_ref.current?.url,
      })
    );
    navigate("/");
  };

  //사진 미리보기 fileReader
  const [imageSrc, setImageSrc] = useState("");
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <>
      <Topbar />
      <br />
      <Card>
        <h1>게시글 작성</h1>
        <h2>레이아웃고르기</h2>
        <input
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            uploadFB(e); //가로안에 e를 넣으면되는거를..한참 ...헤맸다
          }}
        />
        <FileBox>
          <img src={imageSrc} alt="preview-img" />
        </FileBox>

        <h3>게시물 내용</h3>
        <input type="text" ref={write_ref} placeholder="게시글 작성" />
        <button onClick={addWriteList}>게시글 작성</button>
      </Card>
    </>
  );
};

const Card = styled.div`
  max-width: 800px;
  height: 600px;
  border: 1px solid;
  text-align: left;
  margin: 20px auto;
  padding: 16px;
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

export default Post;
