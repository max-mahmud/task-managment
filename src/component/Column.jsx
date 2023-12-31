import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import { dragTask } from "../redux/boardSlice";

function Column({ colIndex }) {
  const colors = ["bg-orange-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-sky-500"];

  const dispatch = useDispatch();
  const [color, setColor] = useState(null);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);
  const handleDrag = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));
    if (colIndex !== prevColIndex) {
      dispatch(dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div
      onDrop={handleDrag}
      onDragOver={handleDragOver}
      className="scrollbar-hide mx-5 pt-[90px] w-full min-w-[280px] "
    >
      <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <span className={`rounded-full w-4 h-4  ${color} `} />
        {col.name} ({col.tasks.length})
      </p>

      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
