import React from 'react'
import './Claims.css';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputAdornment, TextField, MenuItem } from "@mui/material";
import ClaimsCard from './ClaimedCards/ClaimedCard';
import NavBar from '../NavBar/NavBar'
import axios from 'axios';
import { Navigate } from 'react-router-dom'
class Claims extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            catagoryInputText: '',
            data: [],
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
                    axios.get('http://localhost:8000/claim').then((res) => { this.setState({ data: res.data }) }).catch((error) => console.log(error))


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
            <div className="catagoryOnViewAll">
                <h1 style={{
                    textAlign: "center"
                }}>ALL CLAIMS</h1>
                <FormControl variant='filled' fullWidth className="dropdownSelector">
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
                        <MenuItem value={'All Items'}>All Items</MenuItem>

                    </Select>
                </FormControl>
            </div>
            <div className="allCardsViewPageBody">
                {(catagoryInputText.length === 0 || catagoryInputText === 'All Items') ? (this.state.data.map((data) => {
                    return <ClaimsCard data={data} />
                })) :
                    (
                        this.state.data.filter((item) => item.catagory === catagoryInputText).map((cardDetails) => {
                            return (< ClaimsCard data={cardDetails} />)
                        })
                    )}


            </div>
            {goToLogin && <Navigate to='/' />}
        </>)

    }

}

export default Claims;