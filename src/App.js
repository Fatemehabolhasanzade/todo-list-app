import "./App.css";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { supabase } from './client'
import TasksList from "./TasksList";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(false)


  useEffect(() => {
    getTasks();
    setIsLoading(true);
  }, [task])

  const getTasks = async () => {
    const { data } = await supabase
      .from("todos")
      .select()
    // console.log(data);
    setTaskList(data.map(doc => ({
      id: doc.id,
      todo: doc.todo,
      inprogress: doc.inprogress,
      // time: doc.time,
    })).sort((a, b) => a.id - b.id));
    setIsLoading(false);
  }
  // console.log(taskList);

  const addTask = async (e) => {
    e.preventDefault();
    console.log("you are trying to add a task");
    await supabase
      .from('todos')
      .insert(
        [
          {
            todo: task,
            inprogress: true,
          }
        ]
      )
    setTask("");
    getTasks();
  }

  const resetPage = () => {
    setIsLoading(true)
    setIsChanged(false)
    window.location.reload()
  }

  return (
    <div className="App">
      <div className='container'>
        <header><h1>todolist application</h1></header>
        <form>
          <TextField
            id="outlined-basic"
            className="task-input"
            label="write a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            variant="outlined" />
          <Button
            type="submit"
            onClick={addTask}
            style={{ display: "none" }}
            variant="outlined">Outlined</Button>

        </form>

        {/* show tasks */}
        <div className="tasks">
          {isLoading && <div className="loading">
            data is loadind
            <img src="Flying hearts.gif" alt="" />
          </div>}
          {!isLoading && taskList.map(item => {
            return (

              <TasksList
                key={item.id}
                todo={item.todo}
                inprogress={item.inprogress}
                id={item.id}
                getTasks={() => getTasks}
                isChanged={isChanged}
                setIsChanged={setIsChanged}


              />
            )
          })
          }
        </div>
        <Button style={{ display: (isChanged ? "block" : "none") }}
          onClick={resetPage}>
          something changes... set changes?
        </Button>
      </div>


    </div>
  );
}


export default App;
