import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types'

const IndividualProvider = (props) => {
    const [vendordata, setvendorData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await setvendorData(props.location.vendorProps);
        };
        fetchData();
    }, []);
    
    return (
        <div>
            <h1>Individual Provider</h1>
            {console.log("Vendor Data", vendordata)}
        </div>
    )
}

IndividualProvider.propTypes = {

}

export default IndividualProvider

