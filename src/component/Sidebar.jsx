import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";

import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import { setBoardActive } from "../redux/boardSlice";
import AddEditBoardModal from "./Modal/AddEditBoardModal";
import { selectIsDarkMode, toggleDarkMode } from "../redux/themeSlice";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const isDarkMode = useSelector(selectIsDarkMode);
  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };


  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#1A1B20]  fixed top-[72px] h-screen  items-center left-0 z-20`
            : ` bg-green-600 dark:bg-[#191A20] dark:hover:bg-green-600 top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full  `
        }
      >
        <div>
          {/* reWrite modal  */}

          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-[#2b2c37]    w-full   py-4 rounded-xl">
              <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className="  dropdown-borad flex flex-col h-[70vh]  justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#12161238] hover:text-green-600 dark:hover:bg-white dark:hover:text-green-600 dark:text-white  ${
                        board.isActive && " bg-green-600 rounded-r-full text-white mr-8 "
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="  filter-white  h-4 " />{" "}
                      <p className=" text-lg font-bold ">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className=" flex  items-baseline space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-greenbg-green-600 px-5 py-4 hover:bg-[#19251E1A] hover:text-green-600 dark:hover:bg-white dark:hover:text-green-600 dark:text-yellow-50 "
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <img src={boardIcon} className="   filter-white  h-4 " />
                    <p className=" text-lg font-bold  ">Create New Board </p>
                  </div>
                </div>

                <div className=" mx-2  p-4 relative space-x-2 bg-slate-200 dark:bg-[#171B17] flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="sun indicating light mode" />

                  <button
                    // checked={darkSide}
                    onClick={handleDarkMode}
                    className={`${
                      isDarkMode ? "bg-green-600" : "bg-gray-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        isDarkMode ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </button>
                  <div className="icons8-a"></div>
                  <img src={darkIcon} alt="moon indicating dark mode" />
                </div>
              </div>
            </div>
          )}

          {/* Sidebar hide/show toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              className=" flex  items-center mt-2  absolute bottom-16  text-lg font-bold  rounded-r-full hover:text-green-600 cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#182C171A] dark:hover:bg-white  space-x-2 justify-center  my-4 text-gray-500 "
            >
              <img className=" min-w-[20px]" src={hideSidebarIcon} alt=" side bar show/hide" />
              {isSideBarOpen && <p> Hide Sidebar </p>}
            </div>
          ) : (
            <div className=" absolute p-5  " onClick={() => toggleSidebar()}>
              <img src={showSidebarIcon} alt="showSidebarIcon" />
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && <AddEditBoardModal type="add" setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}

export default Sidebar;
