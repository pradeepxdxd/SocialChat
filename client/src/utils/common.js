import jwtDecode from 'jwt-decode';

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