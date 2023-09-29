import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import AddEditBoardModal from "./Modal/AddEditBoardModal";

function Home() {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c]  overflow-x-scroll gap-6  ml-[261px]"
          : "bg-[#f4f7fd]  scrollbar-hide h-screen sm:flex    dark:bg-[#20212c] overflow-x-scroll gap-6  "
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns */}

      {columns.length > 0 ? (
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch ">
          <div className="flex flex-col sm:flex-row  ">
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} />
            ))}
          </div>

          <div
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
            className=" h-44 sm:h-screen dark:bg-[#000000A4] flex justify-center items-center font-bold text-2xl hover:text-green-600 transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide sm:mb-2  mx-5  pt-5 sm:pt-[90px] min-w-[280px] text-[#828FA3] sm:mt-[135px] mt-10 mb-10 rounded-lg "
          >
            + New Column
          </div>
        </div>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
      {isBoardModalOpen && <AddEditBoardModal type="edit" setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}

export default Home;
