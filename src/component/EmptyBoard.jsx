import { useState } from "react";
import AddEditBoardModal from "./Modal/AddEditBoardModal";

function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div className=" bg-white dark:bg-[#2B3732] h-screen w-screen flex flex-col  items-center justify-center">
      <h3 className=" text-gray-500 font-bold">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-green-600 mt-8 relative  text-white bg-green-600 py-2 rounded-full"
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {isBoardModalOpen && <AddEditBoardModal type={type} setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}

export default EmptyBoard;
