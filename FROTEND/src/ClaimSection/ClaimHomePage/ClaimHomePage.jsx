import React from "react";
import './ClaimHomePage.css'
import ClaimForm from "../ClaimForm/ClaimForm";
import ClaimedItemCard from "../ClaimedItemCard/ClaimedItemCard";
import { useParams } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
// class ClaimHomePage extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {

//         }
//     }

const ClaimHomePage = () => {
    const { catagory, subCatagory, place } = useParams()
    return (<>
        <NavBar />

        <div className="claimPage">
            <ClaimedItemCard />
            <ClaimForm place={place} catagory={catagory} subCatagory={subCatagory} />
        </div>

    </>)

}

// }

export default ClaimHomePage;