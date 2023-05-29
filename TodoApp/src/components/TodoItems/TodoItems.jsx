import React, { Fragment, useState } from 'react'
// import editImage from '../assets/edit.png'
// import image2 from '../assets/image2.png'
import editBtn from "../../assets/edit.png";
import deleteBtn from "../../assets/delete.png";
import './TodoItems.css'
import { EditItem } from '../EditItems/EditItem';
import axios from 'axios'

export const TodoItems = ({TaskList,editBtnHandle,SetActiveButton,buttonActive,SetTodoList}) => {

  const API_URL="http://localhost:3005/api/todo"
  // const [currentId,currentTask,currentTag]=buttonActive;

    const deleteHandle= async(id)=>{

      try {
        const response = await axios(API_URL, {
          method: "DELETE",
          data: {
            id: id,
          },
        });
        SetTodoList(response.data);
        
      } catch (error) {
        
      }

    
    }


    const taskCompleteHandle= async(currentTask)=>{

        try {
          const response = await axios.patch(API_URL, {
              id:currentTask.key,
          });

          SetTodoList(response.data);
          SetActiveButton(response.data);
          
          
        } catch (error) {
          console.log(error);
        }

    }

  return (
    <Fragment>
      {TaskList !== null && TaskList.map((list)=>(
        <div key={list.key} className="item-main-container"> 

          
          {list.key === buttonActive.key && buttonActive.tag === true ? <div><EditItem currentTask={buttonActive} SetActiveButton={SetActiveButton} TaskList={TaskList} SetTodoList={SetTodoList}/></div>:
          
          <>
          <div className="list-item-container" onClick={() => {taskCompleteHandle(list)}} >
            <p className =  {list.complete ? 'title-para':null}  > {list.task}  </p>
          </div>
          <div className="edit-button-container"  onClick={() => {editBtnHandle(list) }}>
            <img src={editBtn} />
          </div>
          <div className="delete-button-container">
            <img src={deleteBtn} onClick={()=>{deleteHandle(list.key)}} />
            </div>        
          </>
          }
      </div>
        ))}


      {/* <div className="item-main-container">

          <div className="list-item-container">
            <p>This is Todo item</p>
          </div>
          <div className="edit-button-container">
            <img src={editBtn} />
          </div>
          <div className="delete-button-container">
            <img src={deleteBtn} />
            </div>        
      </div> */}
          
    </Fragment>
  )
}
