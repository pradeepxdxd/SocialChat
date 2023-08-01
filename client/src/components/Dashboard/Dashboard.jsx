import React, { useEffect } from "react";
import { getToken, tokenDecode } from "../../utils/common";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlices";

export default function Dashboard() {
    // const { data, isLoading } = useGetTodosQuery(undefined, {
    //     refetchOnMountOrArgChange: true,
    // });
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getUser());
    // }, [dispatch]);

    // if (isLoading) {
    //     return <Loading />;
    // }

    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Dashboard";
        const token = getToken();
        const decodeToken = tokenDecode(token);
        dispatch(setUser({ name: decodeToken.name, token: token }));
    }, [dispatch]);

    return (
        <>
            Dashboard
            {/* {data.todos.length === 0 ? (
                <div>
                    <blockquote className="quote text-center mt-5">
                        <p>There is no any todo yet!</p>
                    </blockquote>
                </div>
            ) : (
                <div className="text-center mt-5">
                    <h3>Todos</h3>
                    {data.todos?.map((todo) => (
                        <AllTodos key={todo._id} todo={todo} />
                    ))}
                </div>
            )} */}
            <br />
        </>
    );
}
