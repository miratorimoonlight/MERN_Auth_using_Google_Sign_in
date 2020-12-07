import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import DataService from '../api_call/DataService';


export default function Protected2() {
    const {user} = useContext(AuthContext);
    const [data, setData] = useState("");

    //.......API call to fetch protected data.....//
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
            <h2>This is PAGE 2</h2>
            <p>Here is your data: <b>{data}</b></p>
        </div>
    )
}
