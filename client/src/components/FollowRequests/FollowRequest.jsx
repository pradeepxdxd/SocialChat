import IconWithNumber from '../Template/IconWithNumber'
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './css/FollowRequest.css'
import { useState } from 'react';
import ShowFollowRequestedUsers from './ShowFollowRequestedUsers';

export default function FollowRequest({ counts }) {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(true)

    return (
        <>
            <div className='icon' onClick={handleClick}>
                <IconWithNumber icon={faBell} number={counts} />
            </div>

            {
                show && <ShowFollowRequestedUsers show={show} setShow={setShow} />
            }
        </>
    )
}
