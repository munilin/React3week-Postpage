import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";
import { db } from "./shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "./shared/firebase";

const Post = (props) => {
  
  const file_link_ref = React.useRef(null);
  const write_ref = React.useRef(null);

  //사진업로드
  const uploadFB = async (e) => {
    console.log(e.target.files);

    const uploded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    console.log(uploded_file);

    const file_url = await getDownloadURL(uploded_file.ref);
    console.log(file_url);

    file_link_ref.current = { url: file_url };
    
    const user_doc = await addDoc(collection(db, "users"), { // (콜렉션),{넣을데이터}
      wirte: write_ref.current?.value,
      image_url: file_link_ref.current?.url     
    });  
    console.log(user_doc.id);
    //signup의 addDoc부분으로 내용같이넣기 / ? 옵셔널체이닝 : 이미지가 없으면 undefined로 넣어줘

  };

  return (
    <>
      <Topbar />
      <br />
      <Card>
        <h1>게시글 작성</h1>
        
        <input type="url" placeholder="사진을 선택해주세요" />레이아웃고르기
        <input type="file" onChange={uploadFB} />
        <br />
        게시물 내용
        <br />
        <input type="text" ref={write_ref} placeholder="게시글 작성"/>
        <button >게시글 작성</button>
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
