import Swal from 'sweetalert2';
import {toast} from 'react-toastify'

export const sweetAlert = ({title, text, icon}) => {
    Swal.fire({title, text, icon});
}

export const toastSuccess = (text) => {
    toast.success(text, {
        position: toast.POSITION.TOP_RIGHT,
    });
}

export const toastFailer = (text) => {
    toast.error(text, {
        position: toast.POSITION.TOP_RIGHT,
    });
}