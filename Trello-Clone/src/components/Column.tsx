import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import TaskAddButton from './TaskAddButton';
import TaskCard from './TaskCard';
import { ColumnPropsI, RootStateI, TaskI } from '../interfaces/Interfaces';


const Column = ({ colId, index }: ColumnPropsI) => {
    const useTypedSelector: TypedUseSelectorHook<RootStateI> = useSelector;
    const data = useTypedSelector((state) => state.task);

    function RenderColumnTasks() {
        const currColTasks = data.columns?.[colId].taskIds.map((taskId: string) => data.tasks?.[taskId]).filter((task): task is TaskI => task !== undefined);
        return (
            <>
                {
                    currColTasks?.map((task: TaskI, index: number) => {
                        // Replace this with the TaskCard component later
                        return <TaskCard key={task.id} currTaskColId={colId} task={task} index={index} />
                    })
                }
            </>
        )
    }

    return (
        <>
            <Draggable draggableId={colId} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className="column-container">
                        <div className='task-title-edit-container'>
                            <span {...provided.dragHandleProps} className="column-title">{data.columns?.[colId].title}</span>
                        </div>
                        <Droppable droppableId={colId} type='task'>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
                                    <RenderColumnTasks />
                                    {provided.placeholder}

                                    {<TaskAddButton colId={colId} />}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        </>
    )
}

export default Column