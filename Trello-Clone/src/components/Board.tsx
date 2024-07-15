import { collection, onSnapshot, query, QuerySnapshot, DocumentData } from "firebase/firestore"
import { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { db } from '../firebase'
import EditTaskDialog from './EditTaskDialog'




import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { dragColumns, dragTasksDifferentColumn, dragTasksSameColumn, setAllColumns, setAllTasks, setColumnOrder } from './taskSlice'
import { ColumnI, DragResult, RootStateI, StateI, TaskI } from "../interfaces/Interfaces"
import Column from "./Column"
const Board = () => {

    //  Get data from the redux store
    const useTypedSelector: TypedUseSelectorHook<RootStateI> = useSelector;
    const data = useTypedSelector((state) => state.task);
    const dispatch = useDispatch();

    function isColumnsDefined(data: StateI): data is StateI & { columns: { [key: string]: ColumnI } } {
        return data.columns !== undefined;
    }

    function onDragEnd(result: DragResult) {
        const { destination, source, draggableId, type } = result;

        //If there is no destination present
        if (!destination) {
            return
        }

        //If the source and destination is the same
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        //If columns are being dragged
        if (type === 'column') {
            const colOrderNew = Array.from(data.columnOrder || []);
            colOrderNew.splice(source.index, 1);
            colOrderNew.splice(destination.index, 0, draggableId);

            dispatch(dragColumns(colOrderNew))
            return;
        }

        let src, dst
        if (isColumnsDefined(data)) {
            src = data.columns[source.droppableId];
            dst = data.columns[destination.droppableId];
        } else {
            src = {};
            dst = {};
        }

        // If a task is dropped inside the same column
        if (src === dst) {
            const newTaskIds = Array.from(src.taskIds ?? []);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const updatedColumn = {
                ...src,
                taskIds: newTaskIds
            }

            dispatch(dragTasksSameColumn(updatedColumn))
            return;
        }

        // If a task is dropped in a different column
        const srcColId = src["id"];
        const srcTaskIds = Array.from(src.taskIds ?? []);
        srcTaskIds.splice(source.index, 1);

        const dstColId = dst["id"];
        const dstTaskIds = Array.from(dst.taskIds ?? []);
        dstTaskIds.splice(destination.index, 0, draggableId);

        dispatch(dragTasksDifferentColumn({
            srcColId: srcColId,
            srcTaskIds: srcTaskIds,
            dstColId: dstColId,
            dstTaskIds: dstTaskIds
        }))
    }

    useEffect(() => {
        // Query Tasks from the databse
        const queryTasks = query(collection(db, 'tasks'))
        const tasks: { [key: string]: TaskI }[] = [];
        onSnapshot(queryTasks, (querySnapshot) => {
            querySnapshot.docs.map(doc => (
                tasks.push(doc.data())
            ))
            dispatch(setAllTasks(tasks))
        })

        // Query Columns from the database
        const queryColumns = query(collection(db, 'columns'))
        const columns: { [key: string]: ColumnI }[] = [];
        onSnapshot(queryColumns, (querySnapshot) => {
            querySnapshot.docs.map(doc => (
                columns.push(doc.data())
            ))
            dispatch(setAllColumns(columns))
        })

        // Query COlumn Order from the databse
        const queryColumnOrder = query(collection(db, 'columnOrder'))
        let columnOrder: DocumentData = [];
        onSnapshot(queryColumnOrder, (querySnapshot: QuerySnapshot<DocumentData>) => {
            querySnapshot.docs.map(doc => (
                columnOrder = doc.data()
            ))
            dispatch(setColumnOrder(columnOrder))
        })
    }, [dispatch])


    return (
        <>
            <div style={{ textAlign: "center", color: "black" }}>
                <h1>Tasks Management Board</h1>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='all-columns' direction='horizontal' type='column'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: "flex" }}>
                            {data.columnOrder?.map((colId: string, index: number) => {
                                // Replace this with the Column component later
                                return <Column key={colId} colId={colId} index={index} />
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {
                data.isDialogOpen ?
                    <EditTaskDialog taskId={data.currTaskIdToEdit} open={data.isDialogOpen} /> :
                    null
            }
        </>
    )

}

export default Board