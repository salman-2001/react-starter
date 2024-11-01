import React, { createContext, useCallback, useContext, useState } from 'react'
import { axiosApi } from './Components/service/apiConfig';

////      state management  -   store creating   - context Api      ////it is mainly used big project for giving data 

///creating store /// for getting data
export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {

    const [todoList, setTodoList] = useState([]);


/// add data 

    const addData = (async (payload)=>{
        try{
            const response = await axiosApi.post(`/add-todo`,payload)

            const result = response.data.data
            setTodoList((pastData) => [result, ...pastData]);

        }catch(error){
            console.log(error)

        }
    })



    ////delete modal

    const setDeleteData =  (async (payload) => {
       try{
        
        const response = await axiosApi.post(`/delete-todo`,payload)
        if(response.status == 200){
            const updatedData = todoList.filter((item) => item.id !== payload.id);
            setTodoList(updatedData);
            return true
        }else{
            return false
        }       
       }catch(error){
           return false
       }
      });


///Edit Modal

const setEDitData = (async (payload)=>{
    try{

        const response = await axiosApi.post(`/update-todo`,payload) 
        console.log("res upd ===", response);

        if(response.status == 200){

            const newData = todoList.map((item) => {
                if (item.id == payload.id) {
                  return payload;
                } else {
                  return item;
                }
              });
              setTodoList(newData);


            return true
        }else{
            return false
        }



    }catch(error){
        return false
    }
})



  return (
    <GlobalContext.Provider
    value={{
        todoList,
        setTodoList,
        setDeleteData,
        setEDitData,
        addData
    }}
    >
        {children}
    </GlobalContext.Provider>
  )
}

///  creating  hook
export const  useGlobalContext = () =>{
    const context = useContext(GlobalContext)
    return context
}




// export default GlobalProvider       ///not need this created global context