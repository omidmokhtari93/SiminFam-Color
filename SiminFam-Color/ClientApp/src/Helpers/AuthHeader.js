export const token = {
    get: () => {
        var user = localStorage.getItem('SiminUser');
        if (user) {
            return 'Basic ' + user
        } else {
            return null
        }
    }
}