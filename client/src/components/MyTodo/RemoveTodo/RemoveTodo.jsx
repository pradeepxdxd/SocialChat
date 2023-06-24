import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useRemoveTodoMutation } from "../../../redux/apis/todo";
import Loading from '../../Loading/Loading'

export default function RemoveTodo({ todo }) {
  const [removeTodo, { isLoading }] = useRemoveTodoMutation();

  const handleRemove = () => {
    removeTodo(todo._id);
  };

  if (isLoading) return <Loading/>

  return (
    <>
      <FontAwesomeIcon
        onClick={handleRemove}
        className="mx-3"
        icon={faRemove}
        style={{ color: "#FF6060" }}
      />
    </>
  );
}
