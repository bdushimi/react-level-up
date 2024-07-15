export interface TaskI {
  id: string;
  taskTitle: string;
  taskDescription: string;
}

export interface ColumnI {
  id: string;
  title: string;
  taskIds: string[];
}

export interface DatasetI {
  tasks: { [key: string]: TaskI };
  columns: { [key: string]: ColumnI };
  columnOrder: string[];
}

export interface StateI {
  tasks: { [key: string]: TaskI };
  columns: { [key: string]: ColumnI };
  columnOrder?: string[];
  isDialogOpen: boolean;
  currTaskIdToEdit: string;
  currColIdToEdit: string;
}

export interface DragResult {
  destination:
    | {
        droppableId: string;
        index: number;
      }
    | null
    | undefined;
  source: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
  type: string;
}

export interface RootStateI {
  task: StateI;
}

export interface TaskCardPropsI {
  currTaskColId: string;
  task: {
    id: string;
    taskTitle: string;
    taskDescription: string;
  };
  index: number;
}

export interface ColumnPropsI {
  colId: string;
  index: number;
}

export interface TaskAddButtonI {
  colId: string;
}

export interface EditTaskDialogI {
  taskId: string;
  open: boolean;
}
