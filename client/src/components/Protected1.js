import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import DataService from '../api_call/DataService';

export default function Protected1() {
    const {user} = useContext(AuthContext);
    const [data, setData] = useState("");

    //............Fetch Protected DATA.........//
    useEffect(() => {
        DataService.fetchData().then(jsonData => {
            if(jsonData.success) {
                setData(jsonData.data)
            }
            else {
                window.location.reload()
            }
        })
    })

    return (
        <div className="text-center">
            <h2>Hello, {user.email}</h2>
            <p>Here is your data: {data}</p>
        </div>
    )
}
