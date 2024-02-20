export const getUserIdFromToken = () => {
    if(!localStorage.getItem('access_token')) return null;
    const tokenParts = JSON.parse(atob(localStorage.getItem('access_token').split('.')[1]));
    return tokenParts.user_id;
}