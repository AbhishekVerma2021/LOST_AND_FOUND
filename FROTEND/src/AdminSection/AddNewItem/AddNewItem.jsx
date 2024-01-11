import React from 'react'
import './AddNewItem.css'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { TextField, Button, MenuItem } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ItemImg from '../../Images/Wings.jpg';
import NavBar from '../NavBar/NavBar'
class AddNewItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            catagoryInputText: '',
            subCatagory: "",
            subCatagoryInputText: '',
            reportersPhoneNumberInputText: '',
            brandInputText: '',
            placeOfLostInputText: '',
            reportersNameInputText: '',



            electronics: ['Samart Watch', 'Charger', 'EarPhones'],
            keys: ['Car Key', 'Office Key', 'Room Key'],
            cards: ['College ID', 'Office ID'],
            clothing: ['Pants', 'Shirt'],
            wallet: ['Wallet', 'Cards Wallet'],
            jewelery: ['Earrings', 'Rings', 'Nose Rings', 'Wrist wore jewelery'],
            others: [],

            goToLogin: false,
        }
    }

    handleReportersPhoneNumberInputChange = (e) => {
        this.setState({ reportersPhoneNumberInputText: e.target.value })
    }

    handleBrandInputChange = (e) => {
        this.setState({ brandInputText: e.target.value })
    }

    handlePlaceOfLostInputChange = (e) => {
        this.setState({ placeOfLostInputText: e.target.value })
    }

    handleReportersNameInputChange = (e) => {
        this.setState({ reportersNameInputText: e.target.value })
    }

    handleDropdownChange = (e) => {
        this.setState({ catagoryInputText: e.target.value })
    }

    handleAddItemSubmit = () => {
        const { catagoryInputText, reportersPhoneNumberInputText, reportersNameInputText, brandInputText, placeOfLostInputText, subCatagoryInputText } = this.state;
        const newItemData = {
            catagory: catagoryInputText,
            subCatagory: subCatagoryInputText,
            reportersPhoneNumber: reportersPhoneNumberInputText,
            brand: brandInputText,
            placeOfLost: placeOfLostInputText,
            reportingPersonName: reportersNameInputText,
        }
        axios.post('http://localhost:8000/item', newItemData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            alert("ITEM SAVED SUCCESSFULLY!!"); console.log(res)
        })
            .catch((er) => {
                console.log(er)
            })
    }

    componentDidMount() {
        axios.get('http://localhost:8000/verifyToken', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                    this.setState({ goToLogin: true })
                }
            })
    }

    date = new Date();
    render() {
        const { goToLogin, reportersNameInputText, brandInputText, placeOfLostInputText, reportersPhoneNumberInputText, catagoryInputText, subCatagoryInputText, subCatagory, electronics, keys, jewelery, wallet, cards, clothing } = this.state;
        let emptyFieldError = (reportersNameInputText.length === 0 || brandInputText.length === 0 || placeOfLostInputText.length === 0 || reportersPhoneNumberInputText.length === 0);
        return <>
            <NavBar />
            <div className="AddNewItemsBody">
                <div className="newItemCardBody">
                    <Card sx={{ maxWidth: 345, width: 345 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={ItemImg}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {catagoryInputText === '' ? 'Catagory' : catagoryInputText}
                            </Typography>
                            <Typography variant="h7" color="text.secondary">
                                <span className="cardKeys">Item type: </span> {subCatagoryInputText}
                            </Typography>
                            <br />
                            <Typography variant="h7" color="text.secondary">
                                <span className="cardKeys">Reprting Person Name: </span>{reportersNameInputText}
                            </Typography>
                            <br />
                            <Typography variant="h7" color="text.secondary">
                                <span className="cardKeys">Reporting persons Phone No.: </span>{reportersPhoneNumberInputText}
                            </Typography>
                            <br />
                            <Typography variant="h7" color="text.secondary">
                                <span className="cardKeys">Brand Name: </span>{brandInputText}
                            </Typography>
                            <br /><Typography variant="h7" color="text.secondary">
                                <span className="cardKeys">Item was lost at: </span>{placeOfLostInputText}
                            </Typography>
                            <br />
                            <Typography variant="h7" color="text.secondary">
                                <span className="cardKeys">Found on: </span>{this.date.getDate()}/{parseInt(this.date.getMonth() + 1) / 10 === 0 ? `0${this.date.getMonth() + 1}` : `${this.date.getMonth() + 1}`}/{this.date.getFullYear()}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="addNewItemFormBody">
                    <div className="addItemFormBody">
                        <h1 className="claimFormHeading">
                            Add New Item
                        </h1>
                        <br />
                        <div className="InputFieldArea">
                            <div className="phoneNoInput">
                                <FormControl variant='filled' fullWidth className="dropdownSelector">
                                    <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
                                    <Select className="select" size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-filled"
                                        value={catagoryInputText}
                                        label="Catagory"
                                        onChange={(e) => { this.setState({ catagoryInputText: e.target.value }) }}
                                    >
                                        <MenuItem value={'Electronics'}>Electronics</MenuItem>
                                        <MenuItem value={'Keys'}>Keys</MenuItem>
                                        <MenuItem value={'ID and other Cards'}>ID and other Cards</MenuItem>
                                        <MenuItem value={'Clothing'}>Clothing</MenuItem>
                                        <MenuItem value={'Wallet'}>Wallet</MenuItem>
                                        <MenuItem value={'Jewelry'}>Jewelry</MenuItem>
                                        <MenuItem value={'Others'}>Others</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>
                            <div className="phoneNoInput">
                                {catagoryInputText === '' && <FormControl variant='filled' fullWidth className="dropdownSelector">
                                    <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
                                    <Select className="select" size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-filled"
                                        value={subCatagoryInputText}
                                        label="Subcatagory"
                                        onChange={(e) => { this.setState({ subCatagoryInputText: e.target.value }) }}
                                    >

                                    </Select>
                                </FormControl>}
                                {catagoryInputText === 'Electronics' && <FormControl variant='filled' fullWidth className="dropdownSelector">
                                    <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
                                    <Select className="select" size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-filled"
                                        value={subCatagoryInputText}
                                        label="Subcatagory"
                                        onChange={(e) => { this.setState({ subCatagoryInputText: e.target.value }) }}
                                    >
                                        {electronics.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>}
                                {catagoryInputText === 'Keys' && <FormControl variant='filled' fullWidth className="dropdownSelector">
                                    <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
                                    <Select className="select" size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-filled"
                                        value={subCatagoryInputText}
                                        label="Subcatagory"
                                        onChange={(e) => { this.setState({ subCatagoryInputText: e.target.value }) }}
                                    >
                                        {keys.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>}
                                {catagoryInputText === 'Jewelry' && <FormControl variant='filled' fullWidth className="dropdownSelector">
                                    <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
                                    <Select className="select" size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-filled"
                                        value={subCatagoryInputText}
                                        label="Subcatagory"
                                        onChange={(e) => { this.setState({ subCatagoryInputText: e.target.value }) }}
                                    >
                                        {jewelery.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>}
                                {catagoryInputText === 'Wallet' && <FormControl variant='filled' fullWidth className="dropdownSelector">
                                    <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
                                    <Select className="select" size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-filled"
                                        value={subCatagoryInputText}
                                        label="Subcatagory"
                                        onChange={(e) => { this.setState({ subCatagoryInputText: e.target.value }) }}
                                    >
                                        {wallet.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>}
                                {catagoryInputText === 'Clothing' && <FormControl variant='filled' fullWidth className="dropdownSelector">
                                    <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
                                    <Select className="select" size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-filled"
                                        value={subCatagoryInputText}
                                        label="Subcatagory"
                                        onChange={(e) => { this.setState({ subCatagoryInputText: e.target.value }) }}
                                    >
                                        {clothing.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>}
                                {catagoryInputText === 'ID and other Cards' && <FormControl variant='filled' fullWidth className="dropdownSelector">
                                    <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
                                    <Select className="select" size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-filled"
                                        value={subCatagoryInputText}
                                        label="Subcatagory"
                                        onChange={(e) => { this.setState({ subCatagoryInputText: e.target.value }) }}
                                    >
                                        {cards.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>}
                            </div>
                            <div className="phoneNoInput">
                                <FormControl variant='filled' fullWidth className="dropdownSelector">
                                    <InputLabel id="demo-simple-select-label">Select where Item was found</InputLabel>
                                    <Select className="select" size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-filled"
                                        value={placeOfLostInputText}
                                        label="Catagory"
                                        onChange={(e) => { this.setState({ placeOfLostInputText: e.target.value }) }}
                                    >
                                        <MenuItem value={'AB1'}>Academic Block I</MenuItem>
                                        <MenuItem value={'AB10'}>Academic Block X</MenuItem>
                                        <MenuItem value={'Hostels'}>College Hostels</MenuItem>
                                        <MenuItem value={'Canteen'}>Main Canteen</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>
                            <div className="nameInput">
                                <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Reporter's Name" type="text"
                                    size="small"
                                    onChange={(e) => {
                                        this.handleReportersNameInputChange(e)
                                    }} />
                            </div>
                            <div className="phoneNoInput">
                                <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Reporter's Phone No." type="number"
                                    size="small"
                                    onChange={(e) => {
                                        this.handleReportersPhoneNumberInputChange(e)
                                    }} />
                            </div>
                            <div className="brandInput">
                                <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Brand of item" type="text"
                                    size="small"
                                    onChange={(e) => {
                                        this.handleBrandInputChange(e)
                                    }} />
                            </div>



                            <div className="policyStatement">
                                * By submitting these details you are allowing users to see the catagory and sub catagory of he item.
                            </div>

                            <div className="actionButtons">
                                <Button variant="contained" size="medium" id='cancel-button'
                                    onClick={() => alert('Claimed')}>
                                    Cancel
                                </Button>
                                <Button variant="contained" size="medium" id='submit-claim-button' disabled={emptyFieldError}

                                    sx={{ backgroundColor: emptyFieldError ? '#87a9f3' : '#0243d1' }}
                                    onClick={() => {
                                        this.handleAddItemSubmit()
                                    }}>
                                    Add Item
                                </Button>
                            </div>

                        </div>
                    </div >
                </div>

            </div>
            {goToLogin && <Navigate to='/' />}
        </>
    }
}




export default AddNewItem;