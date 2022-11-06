import React, { useEffect, useState } from "react"
import "./homepage.css"
import axios from "axios"

const Homepage = ({setLoginUser,user}) => {
    const [data, setData] = useState([])
    console.log("data",data)
    console.log("user",user)
    useEffect(()=>{
        if(user && user.role==="ADMIN"){
            axios.get("https://registeruseradmin1272.herokuapp.com/user/")
            .then(res => {  
                setData(res.data.users)     
            })
        }
    },[user.role])
    return (
        <>
        <div className="homepage">
            <h1>{`Hello ${user.role} Homepage`}</h1>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        <div>
           {user.role==="ADMIN" && <table id="customers">
                <tr>
                    <th>Username</th>
                    <th>Subject</th>
                    <th>Spoken Language</th>
                    <th>Availability</th>
                    <th>Location</th>
                    <th>email</th>
                </tr>
                {data.map((elem)=>(
                <tr>
                    <td>{elem.username}</td>
                    <td>{elem.subjects.map((elem)=>(elem))}</td>
                    <td>{elem.spokenlanguages.map((elem)=>(elem))}</td>
                    <td>{elem.availability}</td>
                    <td>{elem.location}</td>
                    <td>{elem.email}</td>
                </tr>
                ))}
                </table>}
                </div>
        </div>
    </>)
}
// parthbist@gmail.com
// rathorewifi

export default Homepage