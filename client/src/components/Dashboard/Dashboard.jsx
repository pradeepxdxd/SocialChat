import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/slices/authSlices";

import { useGetTodosQuery } from '../../redux/apis/todo'
import AllTodos from "./AllTodos";
import Loading from '../Loading/Loading'

export default function Dashboard() {
    const { data, isLoading } = useGetTodosQuery(undefined, { refetchOnMountOrArgChange: true });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {
                (data.todos.length === 0 || data.todos === undefined) ? <div>
                    <blockquote className="quote text-center mt-5">
                        <p>There is no any todo yet!</p>
                    </blockquote>
                </div>
                    :
                    <div className="text-center mt-5">
                        <h3>Todos</h3>
                    </div>
            }
            {
                data.todos?.map(todo =>
                    <AllTodos key={todo._id} todo={todo} />
                )
            }
            <br />
        </>
    );
}
