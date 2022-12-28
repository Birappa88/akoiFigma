import React, { useState } from "react";
import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Eye from "../../assets/eye.png"

const Login = ({ setUser }) => {
    const navigate = useNavigate()

    const [user, setLoginUser] = useState({
        email: "",
        password: ""
    })
    const [passwordType, setPasswordType] = useState("password");


    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginUser({
            ...user,
            [name]: value
        })
    }

    const login = async () => {
        try {
            const result = await axios.post("http://localhost:3001/login", user)
            alert(result.data.message)
            navigate("/")
            setUser(result)

        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const forgot = () => {
        alert("Go to Register")
        navigate("/")
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <div className="login">
            <h1 >Sign In</h1>
            <div className="email">
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email Address"></input>
            </div>
            <div className="password">
                <input type={passwordType} name="password" value={user.password} onChange={handleChange} placeholder="Password"></input>
                <button className="eye" onClick={togglePassword}>
                    <img src={Eye} alt="eye"></img>
                </button>
            </div>
            <div className="forgot" onClick={forgot}>
                Forgot Password ?
            </div>
            <div className="button" onClick={login}>
                <div className="loginb">
                    Login
                </div>
            </div>
        </div>
    )

}

export default Login