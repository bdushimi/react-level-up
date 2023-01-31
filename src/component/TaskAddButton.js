import React from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { addNewTask } from "./taskSlice";

export default function TaskAddButton({ colId }) {
  const dispatch = useDispatch();

  function handleNewTask() {
    dispatch(addNewTask({ colId }));
  }

  return (
    <div>
      <button
        style={{
          color: "white",
          backgroundColor: "#009D5E",
          fontSize: "20",
          borderRadius: "5px",
          border: "none",
          padding: "5px 10px 5px 5px",
          cursor: "pointer",
        }}
        className="add-task-button"
        onClick={handleNewTask}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <AddIcon />
          {"Add a card"}
        </div>
      </button>
    </div>
  );
}
