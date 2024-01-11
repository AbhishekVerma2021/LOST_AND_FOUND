import React from "react";
import './Card.css'
import Img from '../../../Images/watch.jpg'
import { Button } from '@mui/material';
import { Link } from "react-router-dom";


class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    const { subCatagory, catagory, place } = this.props

    return (<>

      <div className="cardBody">
        <div className="cardImage">
          <img src={Img} alt="no image" id="product-image" />
        </div>
        <div className="cardFrame">
          <div className="cardDetails">
            <div className="cardTitle">
              {subCatagory}
            </div>
            <div className="claimButtonArea">
              <Link to={`/claimSection/${place}/${catagory}/${subCatagory}`}>
                <Button variant="contained" size="small" id='claim-button'>
                  Claim
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>)
  }
}

export default Card;