import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBoardActive } from "./redux/boardSlice";
import EmptyBoard from "./component/EmptyBoard";
import { selectIsDarkMode, toggleDarkMode } from "./redux/themeSlice";
import Home from "./component/Home";

const App = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0) dispatch(setBoardActive({ index: 0 }));
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className=" overflow-hidden  overflow-x-auto">
      <>
        {boards.length > 0 ? (
          <>
            <Header setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen} />
            <Home setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen} />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
    </div>
  );
};

export default App;
