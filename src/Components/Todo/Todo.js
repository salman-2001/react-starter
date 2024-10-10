///// component reuse

import "./Todo.css";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { memo } from "react";

const Todo = (prop) => {
  const { data, openModal ,isEditModalOpen} = prop; ///data destrructuring



 

  return (
    <div>
      <div className="Container-2">
        <h1>Todo List</h1>
        <ul>
          {data.map((item) => {
            ////code reuse
            return (
              <li key={item.id.toString()}>
                <p>{item.text}</p>
                <div className="modal">
                  <FaRegEdit color="red" size={25} onClick={()=> isEditModalOpen(item)}/>
                  <MdDeleteOutline
                    color="red"
                    size={30}
                    onClick={() => openModal(item.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

    


    </div>
  );
};

export default memo(Todo);
