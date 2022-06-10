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
const ADD = "write/ADD";
const UPDATE = "write/UPDATE";
const DELETE = "write/DELETE";

const initialState = {
  list: [
    {
      // write: "hihiman",
      // img_url: "textestestest",
    },
  ],
};

// Action Creators
export function loadWrite(write_list) {
  return { type: LOAD, write_list };
}

export function addWrite(write) {
  return { type: ADD, write };
}

export function updateWrite(write_index) {
  return { type: UPDATE, write_index };
}
//index는 수정이나삭제 할 글이 몇번째인지 알아야지
export function deleteWrite(write) {
  return { type: DELETE, write };
}

// middlewares 파이어베이스랑 데이터 연결
// 미들웨어 가져오기
export const loadWriteFB = () => {
  return async function (dispatch) {
    const write_data = await getDocs(collection(db, "write"));
    let write_list = [];
    // console.log(write_data);
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

// 미들웨어 추가하기
export const addWriteFB = (write) => {
  return async function (dispatch) {
    console.log(write);
    const docRef = await addDoc(collection(db, "write"), write);
    const write_data = { id: docRef.id, ...write };
    dispatch(addWrite(write_data));
    // 추가하는것도 비동기 작업이다 그래서 async,await로 차례대로하자
    // await =  addDoc 작업 끝날때까지 기다렸다가 답주고가
    // addDoc((db,콜렉션이름, 추가할데이터 함수로 받아온 write))
  };
};

// 미들웨어 수정하기
export const updateWriteFB = (write_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "write", write_id);
    await updateDoc(docRef, { completed: true });
    // docRef에 write콜렉션의 어떤것을 수정해줄건데
    // updateDoc = docRef를 어떻게 수정해줄거야
    // getState()를 사용해서 스토어의 데이터를 가져올 수 있어요.
    console.log(getState().write);
    const _write_list = getState().write.list;
    const write_index = _write_list.findIndex((b) => {
      return b.id === write_id;
    });
    dispatch(updateWrite(write_index));
  };
};
// write 데이터를 다 가져오자
// findIndex로 몇 번째에 있는 지 찾기!
// updateBucketFB의 파라미터로 넘겨받은 아이디와
// 아이디가 독같은 요소는 몇 번째에 있는 지 찾아봐요!

// 미들웨어 삭제하기
export const deleteWriteFB = (write_id) => {
  return async function (dispatch, getState) {
    console.log(write_id);
    if (!write_id) {
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "write", write_id);
    await deleteDoc(docRef);

    const _write_list = getState().write.list;
    const write_index = _write_list.findIndex((b) => {
      return b.id === write_id;
    });

    dispatch(deleteWrite(write_index));
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

    case "write/ADD": {
      console.log("이제 값을 넣을꺼야!");
      const new_write_list = [...state.list, action.write];
      // console.log({list: new_write_list});
      return { ...state, list: new_write_list };
      // console.log(new_Write_list);
    }
    // 액션에 createWrite이 디스패치되어 case를 switch했다,
    // 리턴값은 리스트에 새로운 버킷리스트를 넣어줄거야

    case "write/UPDATE": {
      const new_write_list = state.list.map((l, idx) => {
        if (parseInt(action.write_index) === idx) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      console.log({ list: new_write_list });
      return { ...state, list: new_write_list };
    }

    case "write/DELETE": {
      console.log(state, action);
      const new_write_list = state.list.filter((l, idx) => {
        // 리스트를 나열하고 클릭했을때 나오는 인덱스가 맞으면 빼줘
        return parseInt(action.bucket_index) !== idx;
      });

      return { ...state, list: new_write_list };
    }

    default:
      return state;
    // state로 내보내
  }
}
