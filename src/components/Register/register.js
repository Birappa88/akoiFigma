import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Eye from "../../assets/eye.png"

const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password1: "",
        password2: "",
    })

    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordType2, setPasswordType2] = useState("password");

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = async () => {
        try {
            const { email, password1, password2 } = user

            if (email && password1 && password2) {
                const response = await axios.post("http://localhost:3001/register", user)
                alert(response.data.message)
                navigate("/login")
            }
            else {
                alert("inavlid input")
            }
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const togglePassword1 = () => {
        if (passwordType1 === "password") {
            setPasswordType1("text")
            return;
        }
        setPasswordType1("password")
    }

    const togglePassword2 = () => {
        if (passwordType2 === "password") {
            setPasswordType2("text")
            return;
        }
        setPasswordType2("password")
    }


    return (
        <div className="register">
            <h1 >Register</h1>
            <div className="email">
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email Address"></input>
            </div>
            <div className="password">
                <input type={passwordType1} name="password1" value={user.password1} onChange={handleChange} placeholder="Password"></input>

                <button className="eye" onClick={togglePassword1}>
                    <img src={Eye} alt="eye" ></img>
                </button>
            </div>
            <div className="password">
                <input type={passwordType2} name="password2" value={user.password2} onChange={handleChange} placeholder="Confirm Password"></input>
                <button className="eye" onClick={togglePassword2}>
                    <img src={Eye} alt="eye"></img>
                </button>
            </div>
            <div className="button" onClick={register}>
                <div className="registerb">
                    Register
                </div>
            </div>

        </div>
    )
}

export default Register