import { Input } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
export default function LoginScreen() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const HandleLogin = async () => {
        const { data } = await axios.post('/user/login', { email, password })
        localStorage.setItem('token', data.token)
        console.log(localStorage.getItem('token'))
        if (localStorage.getItem('token'))
            window.location.href = "/dashboard"
    }
    return (
        <div className="Gcontainer">
            <h3>Login</h3>
            <Input value={email} onChange={e => setemail(e.target.value)} type="email" placeholder="email" style={{ "minWidth": "30vw", "marginTop": "2rem" }} />
            <Input value={password} onChange={e => setpassword(e.target.value)} style={{ "minWidth": "30vw", "marginTop": "2rem" }} placeholder="password" type="password" />
            <button onClick={HandleLogin} style={{ "width": "30vw", "marginTop": "2rem" }}>Login</button>
        </div>
    )
}
