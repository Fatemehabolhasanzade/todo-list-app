import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react'
import { supabase } from "./client";


const TasksList = ({
    todo,
    inprogress,
    id,
    getTasks,

}) => {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [changeProgress, setChangeProgress] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };


    const toggleProgress = async () => {
        // setIsLoading(true);
        setChangeProgress(true);
        await supabase
            .from('todos')
            .update({ inprogress: !inprogress })
            .match({ id })
        getTasks();
        setChangeProgress(false);

    }


    const removeTask = async () => {
        setOpen(false);
        setDeleting(true);
        await supabase
            .from('todos')
            .delete()
            .match({ id })
        getTasks();
        // setDeleting(false);
    }

    return (
        <div key={id} className='taskItem'>
            <div className='listItem'>
                <div className='taskEdit'>
                    <div className={`taskRemove ${deleting && "deleting"}`} onClick={handleClickOpen} >
                        {!deleting && <svg xmlns="http://www.w3.org/2000/svg"
                            width="16" height="16" fill="red"
                            className="bi bi-x-square"
                            viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>}
                        {deleting &&
                            <CircularProgress
                                style={{
                                    display: "block",
                                    width: "20px",
                                    height: "20px",

                                }}
                                color="secondary"

                            />}
                    </div>
                    <div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: "50%"
                            }}
                        >
                            <DialogTitle id="alert-dialog-title">
                                {`are you sure you want to delete "${todo}"?`}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Deleting the task will remove it from history,
                                    Are you still sure you want to delete it?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} autoFocus> Forget about it!</Button>
                                <Button onClick={removeTask} > I'm sure.</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    {!changeProgress && <div onClick={toggleProgress} className="taskProgress" >
                        {inprogress
                            ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                            </svg>}
                    </div>}
                    {changeProgress &&
                        <CircularProgress

                            style={{
                                width: "20px",
                                height: "20px",

                            }}
                            color="success"
                        />}

                </div>
                <div className={`listItemText ${!inprogress ? "done" : undefined}`}>
                    {todo}
                </div>
            </div>
        </div>
    )
}

export default TasksList;
