import React from "react";
import "./Todos.css";
import RemoveTodo from "./RemoveTodo/RemoveTodo";
import EditTodo from "./EditTodo/EditTodo";

export default function Todos({ todo }) {
  return (
    <>
      <blockquote className="quote text-center mt-5">
        <p>{todo.message}</p>
        <div style={{ float: "left", cursor: "pointer" }}>
          <EditTodo key={todo._id} todo={todo} />
          <RemoveTodo key={todo._id} todo={todo} />
        </div>
        <cite> Title : {todo.title}</cite>
      </blockquote>
    </>
  );
}
