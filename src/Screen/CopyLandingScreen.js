import React, { useState } from 'react'
import "../../src/App.css"
import Form from '../Components/Form/Form';
import Todo from '../Components/Todo/Todo';
import DeleteModal from '../Components/Modal/DeleteModal';
import Editmodal from '../Components/EditModal/Editmodal';

const CopyLandingScreen = () => {

    const [task, setTask] = useState(""); //// For input form
    const [todoList, setTodoList] = useState([]); ///for todo list
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [storedId,setStoredId] =useState("")
    const [editModal,setEditModal] = useState(false)
    const [isData, setIsData] = useState(null); // Track editing state
    const [selectedIndex, setSelectedIndex] = useState(null); // Store edited task
  
    const onPressButton = () => {
      const payload = {
        id: new Date().toISOString(),
        text: task,
      };
  
      // console.log("DATA===",payload)
      if (task.trim() === "") return;  ////if empty not work
      setTodoList((prev) => [payload, ...prev]);
      setTask("");
    };
  
    const deleteData = () => {
      const updatedData = todoList.filter((item) => 
      item.id !== storedId);
    setTodoList(updatedData);
    closeModal()
      
    };
  
  
  
  
  
  
  
  
    // modal  //
  
  //  Delete modal  ///
  
    const openModal = (id) => {
  
      setStoredId(id)
      setIsModalOpen(true);
      
    }
     
    const closeModal = () => {
      setIsModalOpen(false);
      setEditModal(false);
      
    }
  
  // Edit modal   ////
  
  const isEditModalOpen = (item)=> {
    setIsData(item.text)
    setSelectedIndex(item.id)
    setEditModal(true)
    // todoList("")
  
  }
  
  
  
  
    const updatedData = () => {
          const update={
            id:selectedIndex,
            text:isData
          }
          const newData=todoList.map((item)=>{
            if(item.id == selectedIndex)
            {
              return update
            }
            else{
              return item
            }
          })
          setTodoList(newData)
          closeModal()
    };
    //console.log(updatedData)
  
  
    
  
  
  
    return (
      <div className="wrapper">
        <Form PressButton={onPressButton} task={task} setTask={setTask} />
        <Todo data={todoList} openModal={openModal} isEditModalOpen={isEditModalOpen}/>
        <DeleteModal   isOpen={isModalOpen} onClose={closeModal} deleteData={deleteData} />
        <Editmodal isOpen={editModal} onClose={closeModal} isData={isData} setIsData={setIsData} updatedData={updatedData}/>
        
  
  
      </div>
    );
}


export default CopyLandingScreen