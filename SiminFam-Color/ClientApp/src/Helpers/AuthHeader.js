export const AuthHeader = () => {
    var user = localStorage.getItem('SiminUser');
    if (user) {
        return { Authorization: 'Basic ' + user }
    } else {
        return {}
    }
}