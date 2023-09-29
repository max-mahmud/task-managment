import React, { useEffect } from "react";
import { useState } from "react";
import HeaderDropDown from "./HeaderDropDown";
import Logo from "../assets/icons8-a-67.png";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard, setBoardActive } from "../redux/boardSlice";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "./Modal/AddEditTaskModal";
import AddEditBoardModal from "./Modal/AddEditBoardModal";
import DeleteModal from "./Modal/DeleteModel";
import { selectIsDarkMode, toggleDarkMode } from "../redux/themeSlice";

const Header = ({ setIsBoardModalOpen, isBoardModalOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

  const board = boards.find((board) => board.isActive);

  const isDarkMode = useSelector(selectIsDarkMode);
  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    dispatch(setBoardActive({ index: 0 }));
  }, []);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(deleteBoard());
      dispatch(setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className=" flex justify-between dark:text-white items-center  ">
        {/* Left Side  */}
        <div className=" flex items-center space-x-2  md:space-x-4">
          <img src={Logo} alt="logo" className="h-[32px] " />
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-10 font-sans  ">
              {board?.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* DarkMode in big screen */}

        <div className="hidden mx-2 py-2 px-4 relative space-x-2 bg-slate-200 dark:bg-[#171B17] md:flex justify-center items-center rounded-lg">
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

        {/* Right Side */}

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button
            className=" button hidden md:block "
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className=" button py-1 px-3 md:hidden "
          >
            +
          </button>

          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {openDropdown && (
          <HeaderDropDown setOpenDropdown={setOpenDropdown} setIsBoardModalOpen={setIsBoardModalOpen} />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal setIsAddTaskModalOpen={setIsTaskModalOpen} type="add" device="mobile" />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board?.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
};

export default Header;
