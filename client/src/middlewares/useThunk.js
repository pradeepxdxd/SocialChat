import { useCallback, useState } from "react"
import { useDispatch } from "react-redux";

export const useThunk = thunk => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const runThunk = useCallback((args) => {
        dispatch(thunk(args))
            .unwrap()
            .catch(err => {
                setIsError(true);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
                setIsSuccess(true);
            })
    }, [dispatch, thunk]);

    return [runThunk, isLoading, isSuccess, isError, error];
}