import { Input } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react'
export default function LoginScreen() {
    return (
        <div className="Gcontainer">
            <h3>Register</h3><br /><br />
            <Input placeholder="Email" style={{ "minWidth": "30vw" }} /><br />
            <Input placeholder="Name" style={{ "minWidth": "30vw" }} /><br />
            <Input placeholder="Address" style={{ "minWidth": "30vw" }} /><br />
            <Input style={{ "minWidth": "30vw" }} placeholder="Password" type="password" /><br />
            <button style={{ "width": "30vw" }}>Register</button><br /><br />
            <Link to="/login">Already Have account?</Link>
        </div>
    )
}
