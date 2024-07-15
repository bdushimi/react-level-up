import React, { useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import Material UI items
import { Box } from '@mui/system';
import { Dialog, Slide, TextField, Tooltip, SlideProps } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Import reducers
import { updateTask, deleteTask, setDialogStatus } from './taskSlice';
import { EditTaskDialogI, RootStateI } from '../interfaces/Interfaces';

const Transition = React.forwardRef<unknown, SlideProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditTaskDialog = ({ taskId, open }: EditTaskDialogI) => {
    const useTypedSelector: TypedUseSelectorHook<RootStateI> = useSelector;
    const data = useTypedSelector((state) => state.task);
    const dispatch = useDispatch();

    const [title, setTitle] = useState(data.tasks?.[taskId]?.taskTitle || '');
    const [desc, setDesc] = useState(data.tasks?.[taskId]?.taskDescription || '');

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDesc(e.target.value)
    }

    function handleDialogCloseClick() {
        dispatch(updateTask({ id: taskId, taskTitle: title, taskDescription: desc }))
        dispatch(setDialogStatus(false))
    }

    function handleDeleteButtonClick() {
        dispatch(deleteTask({ taskId: taskId }))
        dispatch(setDialogStatus(false))
    }

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                onClose={handleDialogCloseClick}
                TransitionComponent={Transition}
            >
                <Box padding={2} style={{ margin: "10px" }}>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <h3>Task Name: </h3>
                        <TextField
                            id="task-title"
                            label={taskId}
                            variant="outlined"
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleTitleChange(e) }}
                            style={{ resize: "none", marginLeft: 10 }}
                            size='small'
                        />
                    </div>

                    {/*Description Box*/}
                    <div>
                        <div className='task-title-edit-container' style={{ margin: "20px 0 20px 0" }}>
                            <span style={{ fontSize: "20px", fontWeight: "bold" }}>Description</span>
                            <Tooltip title={"Delete this task"} placement="bottom-start">
                                <DeleteIcon fontSize="small" cursor="pointer" onClick={handleDeleteButtonClick} />
                            </Tooltip>
                        </div>
                        {/* <h3>Description</h3> */}
                        <TextField
                            placeholder={"Add description here..."}
                            multiline
                            rows="5"
                            value={desc}
                            variant="outlined"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDescriptionChange(e)}
                            style={{
                                resize: "none",
                                width: "100%",
                            }}
                        />
                    </div>
                </Box>
            </Dialog>
        </div>
    );
}

export default EditTaskDialog