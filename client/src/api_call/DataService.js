//.......API call to Protected DATA......//

const DataService = {
    fetchData: ()=> {
        return fetch("http://localhost:5000/user/fetchData", {credentials: 'include'})
            .then(res => res.json())
            .then(jsonData => jsonData)
    }
}

export default  DataService