///// component reuse

import "./Todo.css";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { memo } from "react";
import { useGlobalContext } from "../../GlobalProvider";

const Todo = (prop) => {
  const { data, openModal, isEditModalOpen } = prop; ///data destrructuring

  const {todoList} = useGlobalContext()   /// statemanagement


  if (todoList.length == 0) {
    return null
  }

  return (
    <div>
      <div className="Container-2">
        <h1>Todo List</h1>
        <ul>
          {todoList.map((item) => {
            ////code reuse
            return (
              <li key={item.id.toString()}>
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.role}</p>
                  <p>{item.address}</p>
                </div>
                <div className="modal">
                  <FaRegEdit
                    color="red"
                    size={25}
                    onClick={() => isEditModalOpen(item)}
                  />
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
