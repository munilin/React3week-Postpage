// write.js
import { db } from "../../shared/firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Actions
const LOAD = "write/LOAD";
const CREATE = "write/CREATE";
const UPDATE = "write/UPDATE";
const REMOVE = "write/REMOVE";

const initialState = {
  list: [
    {
      write: "hihiman",
      img_url: "textestestest",
    },
  ],
};

// Action Creators
export function loadWrite(write_list) {
  return { type: LOAD, write_list };
}

export function createWrite(write) {
  return { type: CREATE, write };
}

export function updateWrite(write) {
  return { type: UPDATE, write };
}

export function removeWrite(write) {
  return { type: REMOVE, write };
}

// middlewares 파이어베이스랑 통신하는 부분
// 가져오기
export const loadWriteFB = () => {
  return async function (dispatch) {
    const write_data = await getDocs(collection(db, "write"));
    // console.log(write_data);
    let write_list = [];
    // firebase 콜렉션 db에서 write를 가져올거야, 콘솔확인
    // 빈 배열 하나 만들어주고

    write_data.forEach((b) => {
      write_list.push({ id: b.id, ...b.data() });
      // write_data를 하나씩 배열 데이터로 만들어줍시다!
      // 콘솔로 확인해요!
      // console.log(b.id, b.data());
      // write_list 빈 배열에 하나씩 넣어줘
    });

    dispatch(loadWrite(write_list));
    // 잘 만들어졌는 지 리스트도 확인해봐요! :)
    // console.log(write_list);
    // loadwrite(write_list) = Load Type에 FB 데이터를 디스패치 보내
  };
};

//추가하기
export const addWriteFB = (write) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "write"), write);
    const write_data = { id: docRef.id, ...write };
    dispatch(createWrite(write_data));
    // console.log(write_data);
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // 리듀서를 내보낼건데 state= 값이 없으면 init초기값을 보여줘
    // 액션 타입을 case로 swith 해보자

    case "write/LOAD": {
      return { list: action.write_list };
    }
    // 미들웨어에서 디스패치한 wirte_list를
    // list에 넣어서 보여줘

    case "write/CREATE": {
      // console.log("이제 값을 바꿀꺼야!");
      const new_Write_list = [...state.list, action.write];
      // console.log({list: new_Write_list});
      return { ...state, list: new_Write_list };
      // console.log(new_Write_list);
      // return { ...state의 맨앞에 붙여줘 / 반대는 자리 바꾸기}
    }
    // 액션에 createWrite이 디스패치되어 case를 switch했다,
    // 리턴값은 리스트에 새로운 버킷리스트를 넣어줄거야

    default:
      return state;
    // state로 내보내
  }
}
