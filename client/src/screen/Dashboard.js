import { Input, Button } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
export default function Dashboard() {
    const [product, setproduct] = useState([])
    useEffect(() => {
        axios.get('/api/product/')
            .then(res => setproduct(res.data))
    }, [])
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    function createData(index, name, price) {
        return { index, name, price };
    }
    const rows = [
        product.map((Product, index) => (
            createData(index, Product.name, Product.price)
        ))
    ];
    const classes = useStyles();
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
    const [display, setdisplay] = useState(true)
    const [displaybtn, setdisplaybtn] = useState('none')
    const [uploadbtn, setuploadbtn] = useState('block')
    const HandleUploadState = (e) => {
        e.preventDefault()
        setdisplay(false)
        setdisplaybtn('block')
        setuploadbtn('none')
    }
    const HandleDisplayState = (e) => {
        e.preventDefault()
        setdisplay(true)
        setuploadbtn('block')
        setdisplaybtn('none')
    }
    return (
        <>
            <Button type="submit" style={{
                "backgroundColor": "teal", "marginTop": "1rem", "fontWeight":
                    "bolder", "color": "white", "width": "50%", "marginLeft": "25%", "display": `${uploadbtn}`
            }} onClick={HandleUploadState}>Upload</Button>
            <Button type="submit" style={{
                "backgroundColor": "teal", "marginTop": "1rem", "fontWeight":
                    "bolder", "color": "white", "width": "50%", "marginLeft": "25%", "display": `${displaybtn}`
            }} onClick={HandleDisplayState}>Display Product</Button>
            {
                display ?
                    <div>
                        <TableContainer component={Paper} style={{ "width": "60vw", "margin": "5rem auto" }}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SNo.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows[0].map((row) => (
                                        <TableRow key={row.index}>
                                            <TableCell>{row.index + 1}</TableCell>
                                            <TableCell component="th" >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    :
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
            }
        </>
    )
}
