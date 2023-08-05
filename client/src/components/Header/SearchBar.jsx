import React from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { searchByName } from '../../redux/thunk/user'

export default function SearchBar() {
    const {data, error, loading} = useSelector(state => state.user);

    const dispatch = useDispatch();
    const handleSearch = e => {
        let name = e.target.value

        if (name.length > 0) {
            dispatch(searchByName(name));
        }
    }

    return (
        <>
            <Form inline="true" className="ml-auto" >
                <FormControl onChange={handleSearch} type="text" placeholder="Search for friends" className="mr-sm-2" style={{ marginLeft: '15px' }} />
            </Form>
        </>
    )
}
