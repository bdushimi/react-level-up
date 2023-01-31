import React from "react";
import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function Column({ colId, index }) {
  const data = useSelector((state) => state.task);

  function RenderColumnTasks() {
    const currColTasks = data.columns[colId].taskIds.map(
      (taskId) => data.tasks[taskId]
    );
  }

  return (
    <>
      <Draggable draggableId={colId} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="column-container"
          >
            <div className="task-title-edit-container">
              <span {...provided.dragHandleProps} className="column-title">
                {data.columns[colId].title}
              </span>
            </div>
            <Droppable droppableId={colId} type="task">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  <RenderColumnTasks />
                  {provided.placeholder}

                  {/* Add the TaskAddButton component here */}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
}
