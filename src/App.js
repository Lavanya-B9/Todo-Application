import React, { useEffect, useState } from 'react'
import Alert from './Components/Alert';
import Todolist from './Components/Todolist';

//getting data from Local Storage
const getLocalStorage = () =>{
  let list = localStorage.getItem('list');
  if(list){
    return(list = JSON.parse(localStorage.getItem('list')))
  }else{
    return [];
  }

}

const App = () => {
  const [task,setTask] = useState('');
  const [list,setList] = useState(getLocalStorage());
  const [isEditing,setIsEditing] = useState(false);
  const [editID,setEditID] = useState(null);
  const [alert,setAlert] = useState({show:false,msg:'',type:''});

  //storing data in Local Storage
  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(list));
  },[list])

  const submitHandler =(e) => {
    e.preventDefault();
    if(!task){
      showAlert(true , 'danger', "Please Enter Your Task!!");
    } else if(task && isEditing){
      setList(
        list.map((item)=> {
          if(item.id === editID){
            return {...item , title:task}
          }
          return item
        })
      );
      setTask('');
      setEditID(null)
      setIsEditing(false)
      showAlert(true,'success','Your Task Has Updated');
    }else{
      showAlert(true,'success','Task Added Your List');
      const newTask = {id:new Date().getTime().toString(), title:task};
      setList([...list,newTask]);
      setTask('');
    }
 };

  const showAlert =(show =false ,type='',msg='') => {
    setAlert({show,type,msg})
  };

  const deleteHandler =(id) => {
    showAlert(true,'danger','Item Has Removed');
    setList(list.filter((item) => item.id !== id))
  };

  const editHandler =(id) => {
    const editTask = list.find((item)=> item.id ===id);
    setIsEditing(true)
    setEditID(id);
    setTask(editTask.title)
  };
  
  const clearAllHandler =() => {
    showAlert(true,'warning','All Tasks Removed')
    setList('');
  };
  
  
  return (
       <div className='section-center'>
      <form onSubmit={submitHandler} >
        {alert.show && <Alert{...alert}removeAlert={showAlert} list={list}/>}
        <h3 style={{marginBottom:'1.5rem',textAlign:'center'}}>TodoList Using LocalStorage</h3>
        <div className='mb-3 form'>
          <input type='text' placeholder='Enter Your Task Here...'  className='form-control' value={task}
          onChange={(e)=>setTask(e.target.value)}
          />&nbsp;
          <button className='btn btn-success'>
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
{list.length > 0 && (
  <div style={{marginTop:'2rem'}}>
    <Todolist todoList={list} deleteHandler={deleteHandler} editHandler={editHandler}/>
    <div className='text-center'>
      <button className='clr-all-btn' onClick={clearAllHandler}>Clear All</button>
    </div>
</div>
)}
    </div>
   
  )
}

export default App