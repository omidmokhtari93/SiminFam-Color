export const token = {
    get: () => {
        var user = localStorage.getItem('SiminUser');
        if (user) {
            return 'Basic ' + user
        } else {
            return null
        }
    },
    set: (value) => {
        localStorage.setItem("SiminUser", window.btoa(value.Username + ':' + value.Password))
    },
    remove: () => {
        
    }
}