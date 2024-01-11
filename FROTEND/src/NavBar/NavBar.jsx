import React from 'react';
import './NavBar.css'
// import CardUploadForm from '../AdminSection/SideBar/SidBar'
import { Link } from 'react-router-dom'
class NavBar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (<>

            <div className="navBarBody">
                <div className="navBarContent">
                    <div id="logo" className='navBarItems'>
                        {/* <CardUploadForm /> */}
                    </div>
                    <div id="navBar-heading" className='navBarItems'>
                        LOST AND FOUND
                    </div>
                    <div id="about-us" className='navBarItems'>
                        <Link to='/home'><button className="aboutUsButton">Home</button></Link>
                    </div>
                </div>
            </div>

        </>)
    }
}

export default NavBar;