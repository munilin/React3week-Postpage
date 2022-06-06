import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./shared/firebase";

const Post = (props) => {

  const file_link_ref = React.useRef(null);

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

    // const user_doc = await addDoc(collection(db, "users"), { // (콜렉션),{넣을데이터}
    //   user_id: user.user.email,
    //   name: name_ref.current?.value,
    //   image_url: file_link_ref.current?.url     
    // });  signup의 addDoc부분으로 내용같이넣기 / ? 옵셔널체이닝 이미지가 없으면 undefined로 넣어줘
  };

  return (
    <>
      <Topbar />
      <br />
      <Card>
        이미지 : <input type="file" onChange={uploadFB} />
      </Card>
    </>
  );
};

const Card = styled.div`
  width: 600px;
  height: 350px;
  border: 1px solid;
  margin-top: 40px;
`;

export default Post;
