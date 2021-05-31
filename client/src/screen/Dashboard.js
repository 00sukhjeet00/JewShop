import { Input, Button } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
export default function Dashboard() {
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [image, setimage] = useState('')
    const HandleUpload = async () => {
        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('price', price)
        formdata.append('image', image)
        const token = localStorage.getItem('token')
        axios.post('/api/product/upload', formdata, { headers: { token } })
            .then(res => { console.log(res) })
    }
    return (
        <form className="upload">
            <h3>Upload Product's</h3>
            <div>
                <label>Product Name</label>
                <Input value={name} onChange={e => setname(e.target.value)} />
            </div>
            <div>
                <label>Product Price</label>
                <Input value={price} onChange={e => setprice(e.target.value)} />
            </div>
            <div>
                <label>Product Images</label>
                <Input type="file" onChange={e => setimage(e.target.files[0])} />
            </div>
            <Button type="submit" style={{
                "backgroundColor": "teal", "marginTop": "1rem", "fontWeight":
                    "bolder", "color": "white", "width": "50%"
            }} onClick={HandleUpload}>Upload</Button>
        </form>
    )
}
