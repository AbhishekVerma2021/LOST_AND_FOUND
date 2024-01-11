import React from "react";
import './ClaimedItemCard.css'
import Img from '../../Images/watch.jpg'
import { useParams } from "react-router-dom";
import { Button, Typography, CardMedia, CardActions, CardContent, Card } from '@mui/material'

// class ClaimedItemCard extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {

//         }
//     }

// render() {
// const { catagory,subCatagory } = this.props
const ClaimedItemCard = () => {

    const { catagory, subCatagory, place } = useParams();

    return (<>

        <Card sx={{ maxWidth: 345, width: 345 }}>
            <CardMedia
                sx={{ height: '300px' }}
                image={Img}
                title="green iguana"

            />
            <CardContent>
                <Typography gutterBottom variant="h6" className="itemFoundHeading" component="div">
                    Item Found
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                    {catagory}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {subCatagory}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                    <span>Lost At:</span> {place}
                </Typography>
            </CardContent>

        </Card>

    </>)
}
// }
// }

export default ClaimedItemCard;