import React, { Fragment, useEffect, useState } from 'react'
import './Todo.css'
import { TextInput } from './TextInput/TextInput'
import { Buttons } from './Button/Buttons'
import { TodoItems } from './TodoItems/TodoItems'
import { EditItem } from './EditItems/EditItem'
import axios from 'axios'

// npm i uuid for random id from node js
import { v4 as tskId } from "uuid";

const API_URL="http://localhost:3005/api/todo"



export const Todo = () => {

  // error useState
  const [errorMessage, SetErrorMessage] = useState("");

  //list of Task
  const [todolist, SetTodoList] = useState([]);

  // Input Value
  const [inputValue, SetInputValue] = useState("");
  const [currentId, SetCurrentId] = useState("");

  //Edit Delete button handle state
  const [buttonActive, SetButtonActive] = useState([
    {
      key: "",
      task: "",
      tag: false,
    }
  ]);

  // Input Value
  const handleChangeInputValue = (event) => {
    SetInputValue(event.target.value);
    SetErrorMessage("");
  }


  // Add Todo Task to array
  const addTodoTask =async () => {
    if (inputValue != "") {

      let currentTask = {
        key: tskId(),
        name: inputValue,
        tag: false,
        complete:false,

      }

      // console.log(currentTask,"==cT");

      try {
        const response = await axios(API_URL, {
          method: "POST",
          data: {
            todo: inputValue,
          },
        });
       
        // console.log(todolist,"===todo list");
        SetTodoList((prev) => [...prev, response]);
        console.log(todolist,"===todo list");
        SetTodoList(response.data);
      } catch (error) {
        console.error(error);

      }

      // SetTodoList((prev) => [...prev, currentTask]);
      SetInputValue("");
      // SetErrorMessage("");
    } else {
      SetErrorMessage("Enter Valid Data");
    }
  }
  // when press Enter key in input then add task to array
  const handleEnterKey = (event) => {

    if (event.key === "Enter") {
      addTodoTask();
      // saveTaskToLocal();
      // console.log(event.key,"=====press enter");

    }

  }

  // Task save to local storage



  const saveTaskToLocal = () => {

    if (todolist?.length > 0) {

    // localStorage.setItem("todolist", JSON.stringify(todolist));
    
  }
  }

  // retrive task from local storage

  const getTaskFromLocal = async () => {


    // let dataLocalStorage = localStorage.getItem("todolist");

    const response = await axios(API_URL);
    // console.log(response.data,"respo");
    SetTodoList(response.data)
    // SetTodoList(JSON.parse(dataLocalStorage));
    // let getData = JSON.parse(dataLocalStorage);
    // if (getData) {

    //   SetTodoList(getData)
    // }
  }

  const editBtnHandle = (currentTask) => {
    let activeDetails = {
      key:currentTask.key,
      task: currentTask.task,
      tag: true,
      complete:currentTask.complete
    }

    SetButtonActive(activeDetails);
    SetCurrentId(currentTask.key);

  }

  // console.log(todolist.key=="all task");


  // two useEffect for -- save to local storage when trigger todolist -- other get data from local storage
  useEffect(() => {

    saveTaskToLocal()

  }, [todolist])

  useEffect(() => {
    getTaskFromLocal()
  }, [])

  return (
    <Fragment>

      <div className='todo-container' >
        <h1>Todo List</h1>
        <div className='input-container'>
          <TextInput inputValue={inputValue} handleChange={handleChangeInputValue} errorMessage={errorMessage} enterKeyPress={handleEnterKey} />
          <Buttons addTodoTask={addTodoTask} />
          <TodoItems TaskList={todolist} editBtnHandle={editBtnHandle} buttonActive={buttonActive} SetActiveButton={SetButtonActive} SetTodoList={SetTodoList} />
          {/* <EditItem /> */}
        </div>
      </div>
    </Fragment>
  )
}
