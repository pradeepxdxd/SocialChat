import React from "react";
import { useGetUserTodosQuery } from "../../redux/apis/todo";
import Todos from "./Todos";
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function MyTodo() {
    const { data, isFetching } = useGetUserTodosQuery(undefined, { refetchOnMountOrArgChange : true });

    if (isFetching) {
        return <Loading/>
    }

    return (
        <>
            <div className="text-center mt-5">
                <h3>My Todos</h3>
            </div>
            {
                data?.todos.length === 0 &&
                <div>
                    <blockquote className="quote text-center mt-5">
                        <p>There is no any todo yet, please add your todo</p>
                        <cite><Link to='/addTodo'>add your todo</Link></cite>
                    </blockquote>
                </div>
            }
            {data.todos?.map((todo) => (
                <Todos key={todo._id} todo={todo} />
            ))}
            <br />
        </>
    );
}
