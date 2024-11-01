//////component reuse
import { memo } from "react";
import "./Form.css";
import { IoIosAddCircleOutline } from "react-icons/io";


import Lottie from 'lottie-react';
import animationData from '../../assets/lotti/loading.json'

const Form = (prop) => {
  const { PressButton, formik, isPlaying } = prop;

  return (
    <div>
      <div className="Container-1">
        <div className="input1">
          <input
            className="input"
            type="text"
            placeholder="Name"
            // onChange={(e) => setTask(e.target.value)} //value is given to the input what we type visible in value
            onChange={formik.handleChange}
            // value={task}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            name="name" /// what is given name from api : name
          ></input>
          {formik.errors.name && formik.touched.name && (
            <p className="validation">{formik.errors.name}</p>
          )}
        </div>
        <div className="input1">
          <input
            className="input"
            type="text"
            placeholder="Role"
            // onChange={(e) => setTask(e.target.value)} //value is given to the input what we type visible in value
            onChange={formik.handleChange}
            // value={task}
            value={formik.values.role}
            onBlur={formik.handleBlur}
            name="role" /// what is given name from api : role
          ></input>
          {formik.errors.role && formik.touched.role && (
            <p className="validation">{formik.errors.role}</p>
          )}
        </div>
        <div className="input1">
          <input
            className="input"
            type="text"
            placeholder="Address"
            // onChange={(e) => setTask(e.target.value)} //value is given to the input what we type visible in value
            onChange={formik.handleChange}
            // value={task}
            value={formik.values.address}
            onBlur={formik.handleBlur}
            name="address" /// what is given name from api :address
          ></input>
          {formik.errors.address && formik.touched.address && (
            <p className="validation">{formik.errors.address}</p>
          )}
        </div>
        <button className="button" onClick={() => formik.handleSubmit()}>




          {isPlaying ? (
            <Lottie 
              animationData={animationData} 
              loop={true} 
              autoplay={true} 
              style={{ height: 40, width: 40, marginRight: 10 }} 
            />
          )

          :  <div className="button1"><IoIosAddCircleOutline color="white" size={25} /><p>add</p></div>
        }

         
      
        

          
        </button>
      </div>
    </div>
  );
};

export default memo(Form);
