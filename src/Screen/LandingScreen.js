import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../src/App.css";
import Form from "../Components/Form/Form";
import Todo from "../Components/Todo/Todo";
import DeleteModal from "../Components/Modal/DeleteModal";
import Editmodal from "../Components/EditModal/Editmodal";
import { isVisible } from "@testing-library/user-event/dist/utils";

const BASE_URL = "https://api.futurefocusadvisor.in/api";
const header = {
  "Content-Type": "application/json",
};

const LandingScreen = () => {
  const [task, setTask] = useState(""); //// For input form
  const [todoList, setTodoList] = useState([]); ///for todo list
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storedId, setStoredId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [isData, setIsData] = useState(null); // Track editing state
  const [selectedIndex, setSelectedIndex] = useState(null); // Store edited task

  //// fetch ////


  const getAllTodoList = useCallback ( async () => {
    try {
      const result = await fetch(`${BASE_URL}/todo`);
      const convertData = await result.json();
      console.log("result === ", convertData);
      setTodoList(convertData.data);
    } catch (error) {
      console.log(error);
      setTodoList([]);
    }
  },[todoList]);

  useEffect(() => {
    getAllTodoList();
  },[]);

  const onPressButton = useCallback (async () => {
    if (task.trim() === "") return; ////add button not work in blank space

    try {
      const payload = {
        text: task,
      }

      //   console.log("DATA===",payload)

      const response = await fetch(`${BASE_URL}/add-todo`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: header,
      });

      const result = await response.json();
      console.log(result);

      setTodoList((pastData) => [result.data, ...pastData]);
      setTask(""); /////reset after add
    } catch (error) {
      console.log("error res ===", error);
    }
  },[todoList,task]);

  const deleteData = useCallback (async () => {
    try {
      const payload = {
        id: storedId,
      };

      const response = await fetch(`${BASE_URL}/delete-todo`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: header,
      });
    //   const result = await response.json();
    //   console.log("res ===", result);
    //   console.log("rft===", result);

      const updatedData = todoList.filter((item) => item.id !== storedId);
      setTodoList(updatedData);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  },[todoList,storedId]);

  // modal  //

  //  Delete modal  ///

  const openModal = useCallback ((id) => {
    setStoredId(id);
    setIsModalOpen(true);
  },[storedId,isModalOpen]);

  const closeModal = useCallback (() => {
    setIsModalOpen(false);
    setEditModal(false);
  },[isModalOpen,editModal]);

  // Edit modal   ////

  const isEditModalOpen = useCallback((item) => {
    setIsData(item.text);
    setSelectedIndex(item.id);
    setEditModal(true);
    // todoList("")
  },[isData,selectedIndex,editModal]);

  const updatedData = useCallback (async () => {
    try {
      if (isData != "") {
        //// for not edit when data is blank

        const payload = {
          id: selectedIndex,
          text: isData,
        };

        //   console.log("payload ===",payload.text)

        const response = await fetch(`${BASE_URL}/update-todo`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: header,
        });
        console.log("res upd ===", response);
        const newData = todoList.map((item) => {
          if (item.id == selectedIndex) {
            return payload;
          } else {
            return item;
          }
        });
        setTodoList(newData);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  },[todoList,selectedIndex,isData]);
  // console.log(updatedData)


  const isVisible = useMemo(()=>{
    if(task === "salman"){
        return true
    }
    return false
  },[task])

  return (
    <div className="wrapper">
        {isVisible && <p>please check before enter</p>}
      <Form PressButton={onPressButton} task={task} setTask={setTask} />
      <Todo
        data={todoList}
        openModal={openModal}
        isEditModalOpen={isEditModalOpen}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        deleteData={deleteData}
      />
      <Editmodal
        isOpen={editModal}
        onClose={closeModal}
        isData={isData}
        setIsData={setIsData}
        updatedData={updatedData}
      />
    </div>
  );
};

export default LandingScreen;
