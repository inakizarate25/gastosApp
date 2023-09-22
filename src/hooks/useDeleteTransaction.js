import { deleteDoc, doc, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useDeleteTransaction = () => {
  const { userID } = useGetUserInfo();
  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
    where("userID", "==", userID);
  };
  return { deleteTransaction };
};
