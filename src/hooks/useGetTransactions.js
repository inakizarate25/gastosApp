import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotals, setTransactionsTotals] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  let unsuscribe;

  const getTransactions = async () => {
    try {
      const queryTransaction = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );
      unsuscribe = onSnapshot(queryTransaction, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpense = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "gasto") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        setTransactions(docs);

        let balance = totalIncome - totalExpense;
        setTransactionsTotals({
          balance: balance,
          income: totalIncome,
          expense: totalExpense,
        });
      });
    } catch (error) {
      console.error(error);
    }
    return () => unsuscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionsTotals };
};
