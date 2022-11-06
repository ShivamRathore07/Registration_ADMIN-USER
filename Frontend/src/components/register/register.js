import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        username: "",
        subjects: "",
        spokenlanguages: "",
        location: "",
        availability: "",
        role: "",
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({...user, [name]: value})
    }

    const register = () => {
        const { username, subjects ,spokenlanguages, location, availability, role, email, password} = user
        if((role==="USER" && username && email && password && subjects &&  spokenlanguages && location && availability && role) || (role==="ADMIN" && username && email && password ) ){
            axios.post("https://registeruseradmin1272.herokuapp.com/user/register", user)
            .then( res => {
                alert(res.data.message)
                history.push("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="register">
            {console.log("User", user)}

            <h1>Register</h1>
            <select value={user.role} name="role" onChange={handleChange}>
                <option selected disabled value="">Choose Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
            </select>
            <input type="text" name="username" value={user.username} placeholder="Your Name" onChange={ handleChange }/>
            {user.role==="USER" && <> <input type="text" name="subjects" value={user.subjects} placeholder="Subjects" onChange={handleChange}/>
            <input type="text" name="spokenlanguages" value={user.spokenlanguages} placeholder="Spoken Language" onChange={handleChange}/>
            <input type="text" name="location" value={user.location} placeholder="Location" onChange={handleChange}/>
            <select value={user.availability} name="availability" onChange={handleChange}>
                <option selected disabled value="">Chooose</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thusday">Thusday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            </>}
            <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }/>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }/>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register