import React, { Component } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom'
import AdminImg from '../../Images/ADMIN.jpg'


class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: false,
            left: false,
            bottom: false,
            right: false,
            goToLogin: false,
        };
    }

    toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        this.setState({ ...this.state, [anchor]: open });
    };

    render() {


        const list = (anchor) => (
            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, display: "flex", flexDirection: "column", alignItems: "center" }}
                role="presentation"
                onClick={this.toggleDrawer(anchor, false)}
                onKeyDown={this.toggleDrawer(anchor, false)}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div id='adminImg' style={{ height: '100px', color: "#49386b", margin: "50px 0 100px 0", }}>
                        <img src={AdminImg} alt="" height='150px' style={{ borderRadius: "10vw", backgroundColor: "red" }} />
                    </div>

                    <br />
                    <Link to="/addItem"><Button>Add New Item</Button></Link>
                    <br />
                    <Link to="/viewAllItems"><Button>View All Items </Button></Link>
                    <br />
                    <Link to='/claims'><Button>View All Claims</Button></Link>
                    <Button style={{ margin: "20vh 0 0 0", backgroundColor: 'red', color: "white" }} onClick={() => {
                        this.setState({ goToLogin: true });
                        console.log("logg");
                        window.location.reload()
                        localStorage.clear();
                    }}>Logout</Button>
                </div>

            </Box>
        );
        const { goToLogin } = this.state

        return (
            <div style={{ backgroundColor: "ButtonShadow" }}>
                {/* {h = `<h2>MENU</h2>`} */}
                {['MEnu'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={this.toggleDrawer(anchor, true)}>{anchor}</Button>
                        <SwipeableDrawer
                            anchor={anchor}
                            open={this.state[anchor]}
                            onClose={this.toggleDrawer(anchor, false)}
                            onOpen={this.toggleDrawer(anchor, true)}
                        >
                            {list(anchor)}
                        </SwipeableDrawer>
                    </React.Fragment>
                ))}
                {goToLogin && <Navigate to='/' />}
            </div>
        );
    }
}

export default SideBar;