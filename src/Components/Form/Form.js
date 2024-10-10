//////component reuse
import { memo } from "react";
import "./Form.css"
import { IoIosAddCircleOutline } from "react-icons/io";

const Form = (prop) => {
    const {PressButton,task,setTask} = prop;



  return (
    <div>
            <div className='Container-1' >

        <input 
        type='text'
        placeholder='What we needs to be done?' onChange={(e)=>setTask(e.target.value)}  //value is given to the input what we type visible in value
        value={task}></input>  
        <button className='button' onClick={()=> PressButton()}><IoIosAddCircleOutline color='white' size={25}/><p>Add</p></button>
            </div>
     </div>

  )
}

export default memo(Form)