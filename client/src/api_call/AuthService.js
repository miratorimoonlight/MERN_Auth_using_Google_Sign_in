
const AuthService = {
    googleLogin: (idToken) => {
        return fetch("http://localhost:5000/user/googleLogin", {
            method: 'POST',
            body: JSON.stringify({idToken}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(jsonData => jsonData)
    },

    isAuthenticated: () => {
        return fetch("http://localhost:5000/user/authenticated", {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(jsonData => jsonData)
    },

    logout: () => {
        return fetch("http://localhost:5000/user/logout", {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(jsonData => jsonData)
    }
}

export default  AuthService