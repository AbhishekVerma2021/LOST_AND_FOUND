import React from "react";
import './CardGrid.css'
import Card from '../Card/Card'
import CardData from '../../../DemoData'
import NavBar from "../../../NavBar/NavBar";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputAdornment, TextField, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


class CardGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      catagoryInputText: "",
    }
  }

  data = [

    {
      catagory: 'Electronics',

      subCatagory: 'Samart Watch'
    },
    {
      catagory: 'ID and other Cards',

      subCatagory: 'College ID'
    },
    {
      catagory: 'Electronics',

      subCatagory: 'Charger'
    }, {
      catagory: 'ID and other Cards',

      subCatagory: 'Office ID'
    }, {
      catagory: 'Electronics',

      subCatagory: 'EarPhones'
    }, {
      catagory: 'Clothing',

      subCatagory: 'Shirt'
    },
    {
      catagory: 'Clothing',

      subCatagory: 'Pants'
    }
    , {
      catagory: 'Keys',
      subCatagory: 'Room Key'
    },
    {
      catagory: 'Keys',

      subCatagory: 'Car Key'
    }
    , {
      catagory: 'Keys',

      subCatagory: 'Office Key'
    },
    {
      catagory: 'Wallet',

      subCatagory: 'Cards Wallet'
    }
    , {
      catagory: 'Wallet',

      subCatagory: 'Wallet'
    },
    {
      catagory: 'Jewelery',

      subCatagory: 'Earrings'
    },
    {
      catagory: 'Jewelery',

      subCatagory: 'Rings'
    },
    {
      catagory: 'Jewelery',

      subCatagory: 'Nose Rings'
    },
    {
      catagory: 'Jewelery',
      subCatagory: 'Wrist wore jewelery'
    },

  ]

  handleDropdownChange = (e) => {
    this.setState({ age: e.target.value })
  }

  handleSearchInputTextChange = (e) => {
    this.setState({ searchInputText: e.target.value })
  }

  render() {
    const { catagoryInputText } = this.state
    const { place } = this.props
    // console.log(CardData)
    return (<>
      <div className="catagorydropDown">
        <FormControl fullWidth className="dropdownSelector">
          <InputLabel id="demo-simple-select-label">Select Catagory</InputLabel>
          <Select className="select" size="medium"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={catagoryInputText}
            label="Age"
            onChange={(e) => { this.setState({ catagoryInputText: e.target.value }) }}
          >
            <MenuItem value={'Electronics'}>Electronics</MenuItem>
            <MenuItem value={'Keys'}>Keys</MenuItem>
            <MenuItem value={'ID and other Cards'}>ID and other Cards</MenuItem>
            <MenuItem value={'Clothing'}>Clothing</MenuItem>
            <MenuItem value={'Wallet'}>Wallet</MenuItem>
            <MenuItem value={'All Items'}>All Items</MenuItem>

          </Select>
        </FormControl>
      </div>


      <div className="cardHome">
        {
          (catagoryInputText.length === 0 || catagoryInputText === 'All Items') ? (this.data.map((cardDetails) => {
            // console.log(cardDetails.title);
            return (< Card place={place} catagory={cardDetails.catagory} subCatagory={cardDetails.subCatagory} />)
          })) : (
            this.data.filter((item) => item.catagory === catagoryInputText)).map((filterCardDetails => {

              return (< Card place={place} catagory={filterCardDetails.catagory} subCatagory={filterCardDetails.subCatagory} />)
            }))
        }
      </div>


    </>)
  }
}

export default CardGrid;