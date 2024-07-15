import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import TaskAddButton from './TaskAddButton';
import TaskCard from './TaskCard';


const Column = ({ colId, index }) => {
    const data = useSelector((state) => state.task);

    function RenderColumnTasks() {
        const currColTasks = data.columns[colId].taskIds.map(taskId => data.tasks[taskId]);

        return (
            <>
                {
                    currColTasks.map((task, index) => {
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
                            <span {...provided.dragHandleProps} className="column-title">{data.columns[colId].title}</span>
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