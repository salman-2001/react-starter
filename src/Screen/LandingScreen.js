import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../src/App.css";
import Form from "../Components/Form/Form";
import Todo from "../Components/Todo/Todo";
import DeleteModal from "../Components/Modal/DeleteModal";
import Editmodal from "../Components/EditModal/Editmodal";
import { isVisible } from "@testing-library/user-event/dist/utils";
import useLandingScreenHook from "./useLandingScreenHook";



const LandingScreen = () => {

const {
    onPressButton,
    task,
    setTask,
    todoList,
    openModal,
    isEditModalOpen,
    isModalOpen,
    closeModal,
    deleteData,
    editModal,
    isData,
    setIsData,
    updatedData,
    isVisible,
    formik,
    isPlaying
} = useLandingScreenHook()

  return (
    <div className="wrapper">
        {isVisible && <p>please check before enter</p>}
      <Form PressButton={onPressButton} task={task} setTask={setTask} formik={formik} isPlaying={isPlaying}/>
      
     
      <Todo
        data={todoList}
        openModal={openModal}
        isEditModalOpen={isEditModalOpen}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        deleteData={deleteData}
        isPlaying={isPlaying}
      />
      <Editmodal
        isOpen={editModal}
        onClose={closeModal}
        isData={isData}
        setIsData={setIsData}
        updatedData={updatedData}
        formik={formik}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default LandingScreen;
