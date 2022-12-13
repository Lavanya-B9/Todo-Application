import React from 'react'

const Todolist = ({todoList,deleteHandler,editHandler}) => {
  return (
    <div className='container'>
        {todoList.map((item)=> {
            const{id,title} = item;
            return (
                <ul className='list-group list-group-flush' key={id}>
                    <li className='list-group-item d-flex justify-content-between align-items-center'>
                        {title}
                        <div style={{float:'right'}}>
                            <button className='btn btn-warning' onClick={()=>editHandler(id)}>Edit</button>&nbsp;
                            <button className='btn btn-danger' onClick={()=>deleteHandler(id)}>Delete</button>
                        
                        </div>
                    </li>
                </ul>
            )
        })}

    </div>
  )
}

export default Todolist