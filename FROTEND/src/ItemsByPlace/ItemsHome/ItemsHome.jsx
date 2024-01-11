import React from 'react';
import './ItemsHome.css'
import CardGrid from './CardDisplaySection/CardGrid';
import Img from '../../Images/GLA_University_logo.png'
import { Link, useParams } from 'react-router-dom'
import AddNewItem from '../../AdminSection/AddNewItem/AddNewItem';
import NavBar from '../../NavBar/NavBar';


const ItemsHome = () => {
  const { at } = useParams();
  return (<>
    <NavBar />

    <div className="itemsHomePage">
      <div className="placePicAndDescription">
        <div className="plceImage">
          <img src={Img} alt="No image of place" className='placeImage' />
        </div>
        <div className="selectedPlaceDetails">
          <h3 className="selectedPlaceName">
            {at}
          </h3>
          <div className="placeDescription">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eos nostrum amet delectus velit necessitatibus iste natus similique culpa quas, at sed, corrupti a omnis molestias! Ratione dolor a provident minima nisi beatae architecto voluptatem nulla dicta.
          </div>
        </div>
      </div>
      <div className="itemsDIsplaySection">

        <CardGrid place={at} />
      </div>
      <div className="itemsHomeFooter">
        <div className="footerContent">
          <div className="footerItem">
            @2023 Xceptions
          </div>
          <div className="footerItem">
            {/* <Link>Terms</Link> */}
            Terms
          </div>
          <div className="footerItem">
            {/* <Link>Terms</Link> */}
            Privacy Policy
          </div>
          <div className="footerItem">
            {/* <Link>Terms</Link> */}
            Contact Us
          </div>
        </div>
      </div>
    </div>
  </>)
}


export default ItemsHome