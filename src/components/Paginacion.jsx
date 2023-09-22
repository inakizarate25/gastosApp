import { useState } from "react";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
import trash from "../assets/trash-alt.svg";
import arrow from "../assets/step-forward.svg";
import { Toaster } from "react-hot-toast";

const Paginacion = ({ itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { transactions } = useGetTransactions();

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = transactions.slice(startIndex, endIndex);
  const { deleteTransaction } = useDeleteTransaction();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-12">
      {transactions.length <= 5 ? (
        ""
      ) : (
        <span className="text-xl font-bold self-start">
          Pagina {currentPage}
        </span>
      )}

      <ul className="flex flex-col items-start gap-6 justify-center w-full">
        {currentItems.map((transaction) => {
          const { id, description, transactionAmount, transactionType } =
            transaction;
          return (
            <li
              key={id}
              className="flex items-center justify-between gap-1 border-2 border-gray-700 rounded-md w-full p-5 pr-11 relative"
            >
              <h4 className="text-2xl font-medium max-w-[100px]">
                {description}
              </h4>
              <p className="text-2xl flex gap-3 flex-col items-end">
                ${transactionAmount}
                {transactionType === "gasto" ? (
                  <span className="text-orange-600 font-semibold">GASTO</span>
                ) : (
                  <span className="text-blue-400 font-semibold">INGRESO</span>
                )}
              </p>

              <button
                className="h-8 w-8 absolute bg-red-600 rounded-sm text-2xl p-1 top-0 right-0"
                onClick={() => deleteTransaction(id)}
              >
                <img src={trash} alt="" className="" />
              </button>
            </li>
          );
        })}
      </ul>

      {transactions.length <= 5 ? (
        ""
      ) : (
        <div className="botones w-[200px] flex items-center justify-center gap-10">
          <button
            className="bg-slate-700 h-10 w-10 rounded-md cursor-pointer transform rotate-180"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src={arrow} alt="prev" />
          </button>
          <p>{currentPage}</p>
          <button
            className="bg-slate-700 h-10 w-10 rounded-md cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src={arrow} alt="next" />
          </button>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Paginacion;
