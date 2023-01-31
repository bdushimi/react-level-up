import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {},
  columns: {},
  columnOrder: [],
  currTaskIdToEdit: "",
  currColIdToEdit: "",
  isDialogOpen: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    /* Default reducers start */
    // Sets "currTaskIdToEdit" to the id of the current task being edited
    setCurrTaskIdToEdit: (state, action) => {
      state.currTaskIdToEdit = action.payload.taskId;
    },
    // Sets "currColIdToEdit" to the id of the current column in which the task is being edited
    setCurrColIdToEdit: (state, action) => {
      state.currColIdToEdit = action.payload.currTaskColId;
    },
    // Changes the state of the edit dialog box between open and close
    setDialogStatus: (state, action) => {
      state.isDialogOpen = action.payload;
    },
    /* Default reducers end */

    // Add new reducers here
    setAllTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },

    setAllColumns: (state, action) => {
      state.columns = action.payload.columns;
    },

    setColumnOrder: (state, action) => {
      state.columnOrder = action.payload.columnOrder;
    },
    dragColumns: (state, action) => {
      state.columnOrder = action.payload;
    },
    dragTasksDifferentColumn: (state, action) => {
      let { srcColId, srcTaskIds, dstColId, dstTaskIds } = action.payload;

      state.columns[srcColId].taskIds = srcTaskIds
      state.columns[dstColId].taskIds = dstTaskIds
    },
    dragTasksSameColumn: (state, action) => {
      const colId = action.payload.id
      const taskIds = action.payload.taskIds

      state.columns[colId].taskIds = taskIds
    },
  },
});

export const {
  setColumnOrder,
  setAllColumns,
  setAllTasks,
  setDialogStatus,
  setCurrColIdToEdit,
  setCurrTaskIdToEdit,
  dragTasksSameColumn,
  dragTasksDifferentColumn,
  dragColumns
} = taskSlice.actions;

export default taskSlice.reducer;
