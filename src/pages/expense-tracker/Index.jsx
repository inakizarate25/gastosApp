import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("gasto");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="flex flex-col items-center justify-between gap-10 p-5 bg-slate-800 min-h-screen text-gray-50">
      <header className="flex items-center justify-between w-full px-5 py-3">
        {profilePhoto && (
          <img src={profilePhoto} alt={name} className="rounded-full h-16" />
        )}
        <button className="px-4 py-2 bg-slate-700" onClick={signUserOut}>
          Cerrar sesión
        </button>
      </header>
      <div className="expense-tracker flex justify-center items-center flex-col w-full h-auto">
        <div className="container flex flex-col justify-center items-center gap-10">
          <h1 className="text-4xl font-bold">Gestor de gastos</h1>
          <div className="balance">
            <span>
              <h4 className="text-2xl flex flex-col items-center justify-center">
                Balance
              </h4>
              {balance >= 0 ? (
                <p className="text-4xl text-green-500">${balance}</p>
              ) : (
                <p className="text-4xl text-red-500"> -${balance * -1}</p>
              )}
            </span>
          </div>
          <div className="summary flex justify-center items-center gap-20">
            <div className="expenses">
              <h4 className="text-2xl">Gastos</h4>
              <p className="text-3xl text-orange-500">${expenses}</p>
            </div>
            <div className="incomes">
              <h4 className="text-2xl">Ingresos</h4>
              <p className="text-3xl text-blue-400">${income}</p>
            </div>
          </div>

          <form
            className="add-transaction flex items-center justify-center flex-col border border-gray-700 rounded-lg p-5 w-full gap-5"
            onSubmit={onSubmit}
          >
            <div className="flex items-center gap-5 justify-center flex-wrap w-full">
              <input
                className="text-gray-50 text-xl font-semibold py-2 px-2 rounded-sm w-full bg-transparent border-b-2 border-gray-400 "
                type="text"
                placeholder="Descripción"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="text-gray-50 text-xl font-semibold py-2 px-2 rounded-sm w-full bg-transparent border-b-2 border-gray-400 "
                type="number"
                placeholder="Monto"
                value={transactionAmount}
                required
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
            </div>

            <span className="ratios w-full flex justify-center items-center gap-7">
              <div className="flex justify-center items-center gap-2">
                <input
                  type="radio"
                  id="expense"
                  value="gasto"
                  required
                  checked={transactionType === "gasto"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="expense" className="text-2xl">
                  Gasto
                </label>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input
                  type="radio"
                  id="income"
                  value="ingreso"
                  required
                  checked={transactionType === "ingreso"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="income" className="text-2xl">
                  Ingreso
                </label>
              </div>
            </span>

            <button
              type="submit"
              className="px-6 py-4 bg-slate-700 text-2xl font-semibold rounded-md"
            >
              Agregar Movimiento
            </button>
          </form>
        </div>
      </div>
      {/* ------------ */}
      <div className="transactions flex flex-col justify-between items-center gap-6 w-full">
        <h3 className="text-4xl font-bold">Movimientos</h3>
        <ul className="flex flex-col items-start gap-6 justify-center w-full">
          {transactions.map((transaction) => {
            const { id, description, transactionAmount, transactionType } =
              transaction;
            return (
              <li
                key={id}
                className="flex items-center justify-between gap-1 border-2 border-gray-700 rounded-md w-full p-5"
              >
                <h4 className="text-2xl font-medium max-w-[100px]">
                  {description}
                </h4>
                <p className="text-2xl flex gap-3 flex-col items-end">
                  ${transactionAmount}
                  <label
                    style={{
                      color: transactionType === "gasto" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
