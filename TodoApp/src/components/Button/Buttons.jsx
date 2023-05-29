import React, { Fragment } from 'react'
import './Buttons.css'


export const Buttons = ({addTodoTask}) => {
  return (
    <Fragment>
            <button className='button-input' onClick={addTodoTask}>ADD TODO</button>
            {/* <button className='button-input'>{label}</button> */}
    </Fragment>
  )
}
