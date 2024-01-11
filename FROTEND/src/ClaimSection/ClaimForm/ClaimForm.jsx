import React from "react";
import './ClaimForm.css'
import { TextField, Button } from "@mui/material";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'

class ClaimForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      phoneNumberInputText: '',
      brandInputText: '',
      colorInputText: '',
      descriptionInputText: '',
      emailInputText: '',
      nameInputText: '',
      placeOfLostInputText: props.place,
      catagoryInputText: props.catagory,
      subCatagoryInputText: props.subCatagory
      // emptyFieldError: true

    }
  }
  handlePhoneNumberInputChange = (e) => {
    this.setState({ phoneNumberInputText: e.target.value })
  }
  handleBrandInputChange = (e) => {
    this.setState({ brandInputText: e.target.value })
  }
  handleColorInputChange = (e) => {
    this.setState({ colorInputText: e.target.value })
  }
  handlePlaceOfLostInputChange = (e) => {
    this.setState({ placeOfLostInputText: e.target.value })
  }
  handleDescriptionInputChange = (e) => {
    this.setState({ descriptionInputText: e.target.value })
  }
  handleEmailInputChange = (e) => {
    this.setState({ emailInputText: e.target.value })
  }
  handleNameInputChange = (e) => {
    this.setState({ nameInputText: e.target.value })
  }

  handleClaimSubmit = () => {
    const { nameInputText, emailInputText, brandInputText, placeOfLostInputText, descriptionInputText, phoneNumberInputText, colorInputText, catagoryInputText, subCatagoryInputText } = this.state;

    const claimedUserData = {
      name: nameInputText,
      email: emailInputText,
      phoneNo: phoneNumberInputText,
      color: colorInputText,
      placeLost: placeOfLostInputText,
      brand: brandInputText,
      itemDescription: descriptionInputText,
      catagory: catagoryInputText,
      subCatagory: subCatagoryInputText,
      check: false
    }
    console.log(claimedUserData)

    axios.post('http://localhost:8000/claim', claimedUserData)
      .then(async (res) => {
        // alert("CLAIM SAVED SUCCESSFULLY!!")

        console.log(res);
        // this.setState({check:true})
        toast.success('Claim Submitted Succesfully!!!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          toastId: "tostSuccess"
        })
        setTimeout(() => { this.setState({ check: true }) }, 3000)
      })
      .catch((error) => {
        console.log(error)
        toast.error('Some Error Occured!!!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          toastId: "tostError"
        })
      })

  }
  render() {

    const { nameInputText, emailInputText, brandInputText, check, descriptionInputText, phoneNumberInputText, colorInputText } = this.state;
    console.log('ahslkdjfhlaskdjhlaskdjfhaaa')
    let emptyFieldError = (nameInputText.length === 0 || emailInputText.length === 0 || brandInputText.length === 0 || descriptionInputText.length === 0 || phoneNumberInputText.length === 0 || colorInputText.length === 0)

    return (<>


      <div className="formBody">
        <h1 className="claimFormHeading">
          File Claim
        </h1>
        <h3 className="formTitle">
          Is it yours? Fill out the form to claim your item!
        </h3>
        <div className="InputFieldArea">
          <div className="phoneNoInput">
            <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Phone No." type="number"
              size="small"
              onChange={(e) => {
                this.handlePhoneNumberInputChange(e)
              }} />
          </div>
          <div className="brandInput">
            <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Brand of item" type="text"
              size="small"
              onChange={(e) => {
                this.handleBrandInputChange(e)
              }} />
          </div>
          <div className="colorInput">
            <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Color/design of item" type="text"
              size="small"
              onChange={(e) => {
                this.handleColorInputChange(e)
              }} />
          </div>
          {/* <div className="lostPlace">
            <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Place where it was lost" type="text"
              size="small"
              onChange={(e) => {
                this.handlePlaceOfLostInputChange(e)
              }} />
          </div> */}
          <div className="description">
            <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Description of item" type="text"
              size="small"
              onChange={(e) => {
                this.handleDescriptionInputChange(e)
              }} />
          </div>
          <div className="emailInput">
            <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Email" type="email"
              size="small"
              onChange={(e) => {
                this.handleEmailInputChange(e)
              }} />
          </div>
          <div className="nameInput">
            <TextField sx={{ width: '100%' }} className="formElement" variant="standard" label="Your Name" type="text"
              size="small"
              onChange={(e) => {
                this.handleNameInputChange(e)
              }} />
          </div>
          <div className="policyStatement">
            * By submitting these details you are allowing us to collect your email and name in order to contact you concerning your claim. By submitting a claim, you agree to allow us to use your name and email to update you on the status of your claim.
          </div>

          <div className="actionButtons">
            <Button variant="contained" size="medium" id='cancel-button'
              onClick={() => alert('Claimed')}>
              Cancel
            </Button>
            <Button variant="contained" size="medium" id='submit-claim-button' disabled={emptyFieldError}

              sx={{ backgroundColor: emptyFieldError ? '#87a9f3' : '#0243d1' }}
              onClick={() => {
                this.handleClaimSubmit()
              }}>
              Submit Claim
            </Button>
          </div>

        </div>
      </div >
      {check && <Navigate to='/home' />}
      <ToastContainer />
    </>)
  }


}

export default ClaimForm;