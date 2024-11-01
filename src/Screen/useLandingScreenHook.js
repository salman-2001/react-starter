import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useFormik} from 'formik';
import * as Yup from "yup"     /// destructring all from yup (*) to "Yup"
import axios from 'axios';
import { axiosApi } from '../Components/service/apiConfig';   // importing axios from service <=> apiCOnfig
import { useGlobalContext } from '../GlobalProvider';


// const BASE_URL = "https://api.futurefocusadvisor.in/api";
// const header = {
//   "Content-Type": "application/json",      //// by using axios we not need to convert convert-type
// };


const useLandingScreenHook = () => {            ///custom hook


const {todoList,setTodoList,setDeleteData,setEDitData,addData} = useGlobalContext()


 //// usestate  ////

 const [task, setTask] = useState("");                     //// For giving input  form
//  const [todoList, setTodoList] = useState([]);             ///for getting output in todo list   =>   removed and pasted in globalPorvider for state management
 const [isModalOpen, setIsModalOpen] = useState(false);     ////for opening delete modal
 const [storedId, setStoredId] = useState("");               ///for storing id from the components
 const [editModal, setEditModal] = useState(false);          ///for opening editing modal
 const [isData, setIsData] = useState(null);                  // Track editing state
 const [selectedIndex, setSelectedIndex] = useState(null);    // Store edited task


 const [isPlaying, setIsPlaying] = useState(false);     ////for setting animation






 // use formik //    it used while adding more than one datas


////for adding more than one data

const addInitialValue = {
    name: '',
      role: '',
      address: '',
}

const editInitialValue = {
    edit_name: '',
      edit_role: '',
      edit_address: '',
}

const addValidationSchema = Yup.object().shape({                  /// for validation(we can validate and write that it is neccesory) - create a object of the above value
    name: Yup.string().required("Name is Required"),                //// yup imported to Yup is a third party package used for validation
    role: Yup.string().required("Role is Required"),
    address: Yup.string().required("Address is Required")
})
const editValidationSchema = Yup.object().shape({
    edit_name: Yup.string().required("Name is Required"),
    edit_role: Yup.string().required("Role is Required"),
    edit_address: Yup.string().required("Address is Required")
})

const formik = useFormik({        
    initialValues: editModal ? editInitialValue : addInitialValue,                ////condition statement
        /// if editModal open value goes to editinitialvalue otherwise goto addinitial value
    validationSchema:  editModal ? editValidationSchema : addValidationSchema,   
    onSubmit: (values) => {
    if (editModal) {
        updatedData(values)
    } else {
        onPressButton(values)
    }
    
    },
  });



///  function  ///


 //// fetch ////


 const getAllTodoList = useCallback ( async () => {                   ////callback function is used to optmize the website by function
    try {
    //   const result = await fetch(`${BASE_URL}/todo`);
    const result = await axiosApi.get("/todo");

    //   const convertData = await result.json();     ///when using Axios dont need to convert to json it willl convert default
      console.log("result === ", result);
      setTodoList(result.data.data);              ///data is inside the data
    } catch (error) {
      console.log(error);
      setTodoList([]);
    }
  },[todoList]);

  useEffect(() => {
    getAllTodoList();
  },[]);

  const onPressButton = useCallback (async (values) => {
    // if (task.trim() === "") return; ////add button not work in blank space
   
    
    setIsPlaying(true)       //// for starting lotti renderring

    
      const payload = {
      name: values.name,
      role: values.role,
      address: values.address,
        
      }

      const res = await addData(payload)

      //   console.log("DATA===",payload)

    //   const response = await fetch(`${BASE_URL}/add-todo`, {
    //     const response = await axios.get(`${BASE_URL}/add-todo`, {
    //     method: "POST",
    //     body: JSON.stringify(payload),
    //     headers: header,
    //   });

    // const response = await axiosApi.post(`/add-todo`,payload)      /// add data directly  // not need call method 
    // //   const result = await response.json();
    //   console.log("result===",response);
    //   const result = response.data.data
    //   setTodoList((pastData) => [result, ...pastData]);
    //   setTask(""); /////reset after add
    formik.resetForm()   /// function for form reset
    setIsPlaying(false)          ////for stoping lotti rendering

  },[todoList,formik]);




  const deleteData = useCallback (async () => {
   
    setIsModalOpen(true) 
    setIsPlaying(true)

        const payload = {
          id: storedId,
        };


     const res= await setDeleteData(payload)

        if (res){
            setIsModalOpen(true) 
            setIsPlaying(false)
            closeModal()
        }else {
            setIsModalOpen(true) 
        }
      
    
    //   if(newData==storedId){
    //     closeModal();
    //   }
    
  });

  // modal  //

  //  Delete modal  ///

  const openModal = useCallback ((id) => {
    setStoredId(id);
    setIsModalOpen(true);
  },[storedId,isModalOpen]);

  const closeModal = useCallback (() => {
    setIsModalOpen(false);
    setEditModal(false);
    setSelectedIndex("")

    ///for remove data in place holder when we closed and then opened

    formik.setFieldValue("edit_name", "")
    formik.setFieldValue("edit_role", "")
    formik.setFieldValue("edit_address", "")
  },[isModalOpen,editModal,selectedIndex,formik]);

  // Edit modal   ////

  const isEditModalOpen = useCallback((item) => {
    // setIsData(item.text);
    setSelectedIndex(item.id);
    formik.setFieldValue("edit_name",item.name)
    formik.setFieldValue("edit_role",item.role)
    formik.setFieldValue("edit_address",item.address)

    setEditModal(true);
    // todoList("")
  },[selectedIndex,editModal,formik]);

  const updatedData = useCallback (async (values) => {

    setEditModal(true)
    setIsPlaying(true)

      if (isData != "") {
        //// for not edit when data is blank

        const payload = {
          id: selectedIndex,
          name: values.edit_name,
          role: values.edit_role,
          address: values.edit_address
        };

        const res = await setEDitData(payload)

        if(res){
            setEditModal(true)
            setIsPlaying(false)
            closeModal()
        }else{
            setEditModal(true)
        }



        //   console.log("payload ===",payload.text)

        // const response = await fetch(`${BASE_URL}/update-todo`, {
        //   method: "POST",
        //   body: JSON.stringify(payload),
        //   headers: header,
        // });

        // const response = await axiosApi.post(`/update-todo`,payload) 
        // console.log("res upd ===", response);
        // const newData = todoList.map((item) => {
        //   if (item.id == selectedIndex) {
        //     return payload;
        //   } else {
        //     return item;
        //   }
        // });
        // setTodoList(newData);



        // setIsPlaying(false)
        // closeModal();
      }
  },[todoList,selectedIndex,isData,formik]);
  // console.log(updatedData)


//// useMemo /// for pop up

  const isVisible = useMemo(()=>{                   ///used for reporting about only one given data 
    if(task === "salman"){
        return true
    }
    return false
  },[task])       ////addd the usestate variable in dependancy array




  return {
    onPressButton,
    task,
    setTask,
    todoList,
    openModal,
    isEditModalOpen,
    isModalOpen,
    closeModal,
    editModal,
    isData,
    setIsData,
    updatedData,
    isVisible,
    formik,
    isPlaying,
    deleteData
  }
}

export default useLandingScreenHook