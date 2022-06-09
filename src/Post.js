import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "./Topbar";

import { db } from "./shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "./shared/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWriteFB } from "./redux/modules/write";

const Post = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const file_link_ref = React.useRef(null);
  const write_ref = React.useRef(null);

  const [filename, setFilename] = useState("");

  //사진업로드
  const uploadFB = async (e) => {
    setFilename(e.target.files); //input에 사진 이름 띄우기 안되는 중
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

  const addWriteList = () => {
    dispatch(
      addWriteFB({
        write: write_ref.current?.value,
        img_url: file_link_ref.current?.url,
      })
    );
    navigate("/");
    // console.log(addWriteFB);
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
          type="text"
          value={filename}
          onChange={uploadFB} //사진 이름 띄우기 안되는 중
          placeholder="사진을 선택해주세요"
        />
        <input 
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
          }}
        />
        <div style={{
            backgroundColor: "#efefef",
            width: "150px",
            height: "150px",
          }}>
        <img style={{
            width: "100%",
            height: "100%",
          }} src={imageSrc} alt="preview-img" />
        </div>

        <h3>게시물 내용</h3>
        <input type="text" ref={write_ref} placeholder="게시글 작성" />
        <button onClick={addWriteList}>게시글 작성</button>
      </Card>
    </>
  );
};

const Card = styled.div`
  max-width: 800px;
  height: 300px;
  border: 1px solid;
  text-align: left;
  margin: 20px auto;
  padding: 16px;
`;

export default Post;
