import { appFireStore } from "../../common/fireBaseSetting";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { appAuth } from "../../common/fireBaseSetting";
import { CommentType } from "./Detailpage";

export const createComment = (
  event: React.FormEvent<HTMLFormElement>,
  locationPath: any,
  CommentList: CommentType[],
  setCommentList: React.Dispatch<React.SetStateAction<CommentType[]>>
) => {
  event.preventDefault();
  const target = event.target as HTMLInputElement;
  const input = target.childNodes[0] as HTMLInputElement;
  const inputValue = input.value;
  //공백 방지
  if (inputValue === "") return;
  addData(inputValue, locationPath, CommentList, setCommentList);
  input.value = "";
};

const addData = async (
  inputValue: string,
  location: any,
  CommentList: CommentType[],
  setCommentList: React.Dispatch<React.SetStateAction<CommentType[]>>
) => {
  const userUid = appAuth.currentUser?.uid;
  if (userUid) {
    const locationPath = location.pathname.slice(8);
    const docSnap = await getDoc(doc(appFireStore, "userInfo", userUid));
    const result = docSnap.data();
    const userName = result?.userName;
    if (userName) {
      let time = Date.now();
      const docInfo = await addDoc(
        collection(appFireStore, "DetailPageComment", locationPath, "Comments"),
        {
          name: userName,
          uid: userUid,
          Comment: inputValue,
          time: time,
        }
      );
      setCommentList([
        {
          Comment: inputValue,
          uid: userUid,
          name: userName,
          id: docInfo.id,
          time: time,
        },
        ...CommentList,
      ]);
    }
  }
};

export const getCommentData = async (
  location: any,
  setCommentList: React.Dispatch<React.SetStateAction<CommentType[]>>
) => {
  const CommentArr: any = [];
  const locationPath = location.pathname.slice(8);
  const CommentData = query(
    collection(appFireStore, "DetailPageComment", locationPath, "Comments"),
    orderBy("time", "desc")
  );
  const QuerySnapShot = await getDocs(CommentData);
  QuerySnapShot.forEach((doc) => {
    const docObj = {
      ...doc.data(),
      id: doc.id,
    };
    CommentArr.push({ ...docObj });
  });
  setCommentList(CommentArr);
};

export const removeComment = async (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  location: any,
  setCommentList: React.Dispatch<React.SetStateAction<CommentType[]>>,
  CommentList: CommentType[]
) => {
  const confirm = window.confirm("정말로 삭제하겠습니까?");
  if (confirm) {
    const locationPath = location.pathname.slice(8);
    const target = event.target as HTMLButtonElement;
    const closest = target.closest("div");
    const dataset = closest?.dataset.id;
    if (dataset) {
      const desertRef = doc(
        appFireStore,
        "DetailPageComment",
        locationPath,
        "Comments",
        dataset
      );
      try {
        await deleteDoc(desertRef);
        const filterRemoveData = CommentList.filter((item) => {
          return item.id !== dataset;
        });
        setCommentList(filterRemoveData);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("게시물 id를 찾을 수 없음");
    }
  }
};
