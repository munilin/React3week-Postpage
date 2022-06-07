// write.js
import {db} from "../../shared/firebase"
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";


// Actions
const LOAD = "write/LOAD";
const CREATE = "write/CREATE";
const UPDATE = "write/UPDATE";
const REMOVE = "write/REMOVE";

const initialState = {
  list: [
    {
      write: "hihiman",
      imag_url: "textestestest",
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

// middlewares
// 파이어베이스랑 통신하는 부분
export const loadWriteFB = () => {
  return async function (dispatch) {
    // 데이터를 가져와요!
    const write_data = await getDocs(collection(db, "write"));
    console.log(write_data);
    let write_list  = [];

    // 하나씩 우리가 쓸 수 있는 배열 데이터로 만들어줍시다!
    write_data.forEach((b) => {
      // 콘솔로 확인해요!
      console.log(b.id, b.data());
      write_list.push({ id: b.id, ...b.data() });
    });

    // 잘 만들어졌는 지 리스트도 확인해봐요! :)
    console.log(write_list);
    dispatch(loadWrite(write_list));
  }
}

// export const addBucketFB = (bucket) => {
//   return async function (dispatch){
//       dispatch(isLoaded(false));
//       const docRef = await addDoc(collection(db, "bucket"), bucket);
//       const bucket_data = {id: docRef.id, ...bucket};

//       dispatch(createBucket(bucket_data));

//   }
// }

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case "write/LOAD": {
      return {list: action.write_list}  //is_loaded를 다 넣어주지말고 ...state로 상태값 똑같이 설정 / 돌렸을때 프로그래스바가 미리가있음 강의는 스피너 사라지고 프로그래스가 움직이는데
    }

    
    // case "write/CREATE": {
    //   const new_write_list = [...state.list, action.write];
    //   return { list: new_write_list };
    // }

    default:
      return state;
  }
}
