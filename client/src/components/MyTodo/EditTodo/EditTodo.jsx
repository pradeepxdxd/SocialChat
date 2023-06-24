import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import EditModal from './EditModal';

export default function EditTodo({ todo }) {
    const [show, setShow] = useState(false);
    const handleEdit = () => {
        setShow(true);
    }

    return (
        <>
            <FontAwesomeIcon onClick={handleEdit} className='text-right' icon={faEdit} style={{ color: '#A3F2FF' }} />
            {show ? <EditModal todo={todo} setShow={setShow} show={show} /> : null}
        </>
    )
}
