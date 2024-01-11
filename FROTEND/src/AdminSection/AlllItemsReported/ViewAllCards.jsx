import React from 'react';
import './ViewAllCards.css'
import AddedCard from './Card/AddedCard'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate } from 'react-router-dom';
import { InputAdornment, TextField, MenuItem } from "@mui/material";
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
class ViewAllCards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            catagoryInputText: '',
            goToLogin: false,
        }
    }


    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            axios.get('http://localhost:8000/verifyToken', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res) => {
                    axios.get('http://localhost:8000/item').then(res => {
                        console.log("asdas=>", res.data); this.setState({ data: res.data })
                    }).catch((er) => console.log(er))

                })
                .catch((err) => {
                    console.log(err)
                    this.setState({ goToLogin: true })
                })
        }
        else {
            this.setState({ goToLogin: true })
        }

    }

    render() {
        const { catagoryInputText, goToLogin } = this.state
        return (<>
            <NavBar />
            <h1 style={{
                textAlign: "center"
            }}>LOST ITEMS</h1>
            <div className="catagoryOnViewAll">
                < FormControl variant='filled' fullWidth className="dropdownSelector">
                    <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
                    <Select className="select" size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select-filled"
                        value={catagoryInputText}
                        label="Select Catagory"
                        onChange={(e) => { this.setState({ catagoryInputText: e.target.value }) }}
                    >
                        <MenuItem value={'Electronics'}>Electronics</MenuItem>
                        <MenuItem value={'Keys'}>Keys</MenuItem>
                        <MenuItem value={'ID and other Cards'}>ID and other Cards</MenuItem>
                        <MenuItem value={'Clothing'}>Clothing</MenuItem>
                        <MenuItem value={'Wallet'}>Wallet</MenuItem>
                        <MenuItem value={'Jewelry'}>Jewelry</MenuItem>
                        <MenuItem value={'All Items'}>Others</MenuItem>

                    </Select>
                </FormControl>
            </div >
            {console.log(this.state.data)}
            < div className="allCardsViewPageBody" >
                {(catagoryInputText.length === 0 || catagoryInputText === 'All Items') ? (this.state.data.map((data) => {
                    return <AddedCard data={data} />
                })) :
                    (
                        this.state.data.filter((item) => item.catagory === catagoryInputText).map((cardDetails) => {
                            return (< AddedCard data={cardDetails} />)
                        })
                    )
                }


            </div>
            {goToLogin && <Navigate to='/' />}
        </>)
    }
}

export default ViewAllCards