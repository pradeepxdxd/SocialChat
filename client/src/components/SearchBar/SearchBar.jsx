import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './css/SearchBar.css'
import SearchUserModel from './SearchUserModel';

export default function SearchBar() {
    const [show, setShow] = useState(false);

    const handleSearch = () => setShow(true)
    
    return (
        <>
            <FontAwesomeIcon onClick={handleSearch} icon={faSearch} className="mr-2 search-icon" />

            {
                show && <SearchUserModel show={show} setShow={setShow} />
            }
        </>
    )
}
