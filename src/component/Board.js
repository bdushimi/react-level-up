import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

// Import the dataset
import dataset from "./dataset";
import Column from "./Column";
import EditTaskDialog from './EditTaskDialog'


import {
  setAllTasks,
  setAllColumns,
  setColumnOrder,
  dragColumns,
  dragTasksDifferentColumn,
  dragTasksSameColumn,
} from "./taskSlice";

export default function Board() {
  const data = useSelector((state) => state.task);
  const dispatch = useDispatch();

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    // if there is no destination
    if (!destination) {
      return;
    }

    // if the source and destination are the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // if columns are being dragged
    if (type === "column") {
      const newColOrder = Array.from(data.columnOrder);
      newColOrder.splice(source.index, 1); // remove item at source.index position
      newColOrder.splice(destination.index, 0, draggableId);

      dispatch(dragColumns(newColOrder));
      return;
    }

    const src = data.columns[source.droppableId];
    const dst = data.columns[destination.droppableId];

    // if task is dropped inside the same column
    if (src === dst) {
      const newTaskIds = Array.from(src.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...src,
        taskIds: newTaskIds,
      };

      dispatch(dragTasksSameColumn(updatedColumn));
      return;
    }

    // If a task is dropped in a different column
    const srcColId = src["id"];
    const srcTaskIds = Array.from(src.taskIds);
    srcTaskIds.splice(source.index, 1);

    const dstColId = dst["id"];
    const dstTaskIds = Array.from(dst.taskIds);
    dstTaskIds.splice(destination.index, 0, draggableId);

    dispatch(
      dragTasksDifferentColumn({
        srcColId: srcColId,
        srcTaskIds: srcTaskIds,
        dstColId: dstColId,
        dstTaskIds: dstTaskIds,
      })
    );
  }

  useEffect(
    () => {
      dispatch(setAllTasks({ tasks: dataset["tasks"] }));
      dispatch(setAllColumns({ columns: dataset["columns"] }));
      dispatch(setColumnOrder({ columnOrder: dataset["columnOrder"] }));
    },

    // React guarantees that dispatch function identity is stable and won't change on re-renders.
    // Basically this means that, the effect i.e function passed to the useEffect hoot, will run only once i.e after the first render
    [dispatch]
  );

  return (
    <>
      <div style={{ textAlign: "center", color: "white" }}>
        <h1>Tasks Management Board</h1>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: "flex" }}
            >
              {data.columnOrder.map((colId, index) => {
                // Replace this with the Column component later
                return <Column key={colId} colId={colId} index={index}/>;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add the EditTaskDialog component here */}
      {
          data.isDialogOpen ?
          <EditTaskDialog taskId={data.currTaskIdToEdit} open={data.isDialogOpen} /> :
          null
      }
    </>
  );
}
