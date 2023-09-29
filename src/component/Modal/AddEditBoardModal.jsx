import React, { useState } from "react";
import crossIcon from "../../assets/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, editBoard } from "../../redux/boardSlice";

function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find((board) => board.isActive);

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board?.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board?.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return setError("Name Must");
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const handleChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const handleDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const handleSubmit = (type) => {
    if (!name) {
      console.log("name plz");
    }
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(addBoard({ name, newColumns }));
    } else {
      dispatch(editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">{type === "edit" ? "Edit" : "Add New"} Board</h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">Board Name</label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-text-green-600 outline-1  ring-0  "
            placeholder=" e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>
        {error && <p className="text-red-500 mt-1 font-medium">{error}</p>}
        {/* Board Columns */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">Board Columns</label>

          {newColumns?.map((column, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-text-green-600 outline-[1px]  "
                onChange={(e) => {
                  handleChange(column?.id, e.target.value);
                }}
                type="text"
                value={column?.name}
              />
              <img
                src={crossIcon}
                onClick={() => {
                  handleDelete(column.id);
                }}
                className=" m-4 cursor-pointer "
              />
            </div>
          ))}
          <div>
            <button
              className=" w-full items-center hover:opacity-70 dark:text-green-600 dark:bg-white  text-white bg-green-600 py-2 rounded-full "
              onClick={() => {
                setNewColumns((state) => [...state, { name: "", tasks: [], id: uuidv4() }]);
              }}
            >
              + Add New Column
            </button>
            <button
              onClick={() => {
                const isValid = validate();
                if (isValid === true) handleSubmit(type);
              }}
              className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-green-600 mt-8 relative  text-white bg-green-600 py-2 rounded-full"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
