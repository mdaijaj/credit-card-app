import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const navigate = useNavigate()
    const [credential, setCredential] = useState({ email: "", password: "" });

    const onchangeHandle = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regInf = {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: credential.email, password: credential.password
            })
        }
        const res = await fetch('https://interview-api.onrender.com/v1/auth/login', regInf);
        console.log("res", res)
        const result = await res.json()
        console.log("result", result)
        if (res.status==200) {
            console.log("result", result)
            alert("login successfully!")
            localStorage.setItem("user", JSON.stringify(result))
            navigate('/')
        }
        else {
            alert("invalid credential")
        }
    }

    useEffect(() => {
        let users = localStorage.getItem('user')
    }, [])
    
    return (
        <>
         <div className="col-md-6 offset-md-3 mt-5">
            <div className="alert alert-info">
                Username: test<br />
                Password: test
            </div>
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="email" type="text" onChange={onchangeHandle} className={`form-control`} />
                            <div className="invalid-feedback">{"errors.username?.message"}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" onChange={onchangeHandle} className={`form-control`} />
                            <div className="invalid-feedback">{"errors.password?.message"}</div>
                        </div>
                        <button onClick={handleSubmit} className="btn btn-primary">
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;