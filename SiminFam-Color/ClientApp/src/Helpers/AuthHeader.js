export const AuthHeader = () => {
    var user = JSON.parse(localStorage.getItem('SiminUser'));
    if (user && user.authData) {
        return { Authorization: 'Basic ' + user.authData }
    } else {
        return {}
    }
}