import React, { useState } from 'react'
import './signup.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:5100/";

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",

    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
        setErrors({ ...errors, [name]: "" })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}
        if (!data.email) {
            errors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email address is invalid";
        }
        if (!data.password) {
            errors.password = "Password is required"
        } else if (data.password.length < 5) {
            errors.password = "Password must be at least 5 characters long";

        }

        setErrors(errors)


        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("user/login", data);
                // console.log(response.data.token);
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("name", response.data.name)

                navigate("/landing");
            } catch (error) {
                console.error("Error:", error);
                alert("user not found ")
            }

        }
    };

    return (
        <>
            <div className='formcenter'>
                <form onSubmit={handleSubmit} className='form'>
                    <h1 className='h'>Login</h1>
                    <LabeledInput type="email" name="email" placeholder="Email" onChange={handleChange} value={data.email} error={errors.email} />
                    <LabeledInput type="password" name="password" placeholder="Password" onChange={handleChange} value={data.password} error={errors.password} />
                    <Link to="/email" className='forgot'><p>Forgot Password ?</p></Link>
                    <div>
                        <button type='submit' className='formbuttton' >Submit</button>
                        <Link to="/signup"><button className='formbutttonn'>New user</button></Link>
                    </div>

                </form>
            </div>
        </>
    )
}

function LabeledInput({ type, placeholder, name, value, onChange, error, letter }) {
    return (
        <label>
            <h6 className='formname'>{placeholder}</h6>
            <input className="forminput" type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} lletter={letter} ></input>
            {error && <span className='error'>{error}</span>}
        </label>
    )
}