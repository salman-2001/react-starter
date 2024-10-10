import React, { useState } from "react";
import "../../src/App.css";
import Todo from "../Components/Todo/Todo";
import Form from "../Components/Form/Form";
import DeleteModal from "../Components/Modal/DeleteModal";
import Editmodal from "../Components/EditModal/Editmodal";

const TryOutModal = () => {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storedId, setStoredId] = useState("");
  const [editModal,setEditModal] = useState(false)
  const [isData, setIsData] = useState(null); // Track editing state


  const onPressButton = () => {
    if (task.trim() === "") return;

    const payload = {
      id: new Date().toISOString(),
      text: task,
    };

    console.log("hello world", payload);

    setTodoList((prev) => [payload, ...prev]);
    setTask("");
  };
 
//delete Modal

  const openModal = (id) => {
    setStoredId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditModal(false)
  };

  const deleteData = () => {
    const updatedData = todoList.filter((item) => item.id != storedId);
    setTodoList(updatedData);
    closeModal();
  };

  //edit modal

   const isEditModalOpen = (item) => {
    setIsData(item.text)
    setStoredId(item.id)
    setEditModal(true)
   }

   const updatedData = () => {
    const payload = {
        id: storedId,
        text: isData 
    }

    const array = todoList.map((item)=>{
        if(item.id == storedId){
            return payload
        }else{
            return item
        }
    })
    setTodoList(array)
    closeModal();

   }


  return (
    <div className="wrapper">
      <Form PressButton={onPressButton} setTask={setTask} task={task} />
      <Todo data={todoList} openModal={openModal} isEditModalOpen={isEditModalOpen}/>
      <DeleteModal isOpen={isModalOpen} onClose={closeModal} deleteData={deleteData} />
      <Editmodal isOpen={editModal} onClose={closeModal} updatedData={updatedData} setIsData={setIsData} isData={isData}/>
    </div>
  );
};

export default TryOutModal;
