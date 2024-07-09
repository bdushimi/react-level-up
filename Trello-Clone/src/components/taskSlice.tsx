import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {},
  columns: {},
  columnOrder: [],
  currTaskIdToEdit: "",
  currColIdToEdit: "",
  isDialogOpen: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    /* Default reducers start */
    // Sets "currTaskIdToEdit" to the id of the current task being edited
    setCurrTaskIdToEdit: (state, action) => {
      state.currTaskIdToEdit = action.payload.taskId
    },
    // Sets "currColIdToEdit" to the id of the current column in which the task is being edited
    setCurrColIdToEdit: (state, action) => {
      state.currColIdToEdit = action.payload.currTaskColId
    },
    // Changes the state of the edit dialog box between open and close
    setDialogStatus: (state, action) => {
      state.isDialogOpen = action.payload
    },
    /* Default reducers end */

    // Add new reducers here

    // receives the tasks data as payload. 
    // The reducer will set the tasks object in the initialState to the data received as the payload.
    setAllTasks: (state, action) => {
      state.tasks = action.payload.tasks
    },

    // receives the columns data as payload. 
    // The reducer will set the columns object in the initialState to the data received as the payload.
    setAllColumns: (state, action) => {
      state.columns = action.payload.columns
    },

    // receives the column order list as payload. 
    // The reducer will set the columnOrder list in the initialState to the list received as the payload.
    setColumnOrder: (state, action) => {
      state.columnOrder = action.payload.columnOrder
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
    addNewTask: (state, action) => {
      let colId = action.payload.colId

      // get the keys of the tasks object
      let keys = Object.keys(state.tasks).sort()
      keys.sort((a, b) => a.replace(/[^\d]+/g, '') - b.replace(/[^\d]+/g, ''));

      // Get the id of the task present at the end of the tasks object 
      let lastId = "task-0"
      if (keys.length !== 0) {
        lastId = keys[keys.length - 1]
      }

      // set the integer id of the next task
      let nextId = parseInt(lastId.split("-")[1]) + 1
      let newTaskId = "task-" + nextId.toString()

      // Add the new task in the tasks object of the initial state
      state.tasks[newTaskId] = {
        id: newTaskId,
        taskTitle: "New Task",
        taskDescription: ""
      }

      // Append the new task id to the taskIds list of the particulat column
      state.columns[colId].taskIds.push(newTaskId)
    },
    // Add new reducers here
    updateTask: (state, action) => {
      const { id, taskTitle, taskDescription } = action.payload

      const updatedTask = {
        id: id,
        taskTitle: taskTitle,
        taskDescription: taskDescription
      }

      // update the data base only if the task title or task description changes
      if (state.tasks[id].taskTitle !== taskTitle || state.tasks[id].taskDescription !== taskDescription) {
        state.tasks[id] = updatedTask
      }
    },
    // Add new reducers here
    deleteTask: (state, action) => {
      const taskId = action.payload.taskId;
      const colId = state.currColIdToEdit;

      // update the redux state
      state.columns[colId].taskIds = state.columns[colId].taskIds.filter(item => item !== taskId)
      delete state.tasks[taskId];
    },
  },
});


export const { setAllTasks, setAllColumns, setColumnOrder, dragColumns, dragTasksSameColumn, dragTasksDifferentColumn, addNewTask, updateTask, deleteTask, setCurrTaskIdToEdit, setCurrColIdToEdit, setDialogStatus } = taskSlice.actions;
export default taskSlice.reducer;