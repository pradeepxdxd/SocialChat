import jwtDecode from 'jwt-decode';
import Loading from '../components/Loaders/Loading';

export const tokenDecode = token => {
    return jwtDecode(token);
}

export const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    if (user) return true;
    else return false;
}

export const getToken = () => {
    return JSON.parse(localStorage.getItem('user')).token;
}

export const userInfo = () => {
    const token = getToken();
    return tokenDecode(token);
}

export const initialLoader = () => {
    setTimeout(() => {
        return <Loading />
    }, 1000);
}