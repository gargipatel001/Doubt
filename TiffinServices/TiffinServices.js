import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../assets/css/list.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import '../../assets/css/register.css';
import { auth } from "../../firebase";
import { setAlert } from "../../actions/alert";
import axios from 'axios';


const TiffinServices = ({ setAlert, isAuthenticated }) => {
    const [vendordata, setvendorData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/vendors');

            await setvendorData(result.data);
        };
        fetchData();
    }, []);
    return (
        <Container fluid>
            <Row className="no-gutter">
                <Col className="col-12">
                    <Col md="12" sm="0"> </Col>
                    <Row>
                        <Col md="8" sm="12">
                            <Row className="no-gutter">
                                <div className="col-auto">
                                    <Button className="btn btn-outline-secondary border-gray border-right-0 rounded-right" type="button">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                </div>
                                <div className="col">
                                    <input className="form-control search-box border-left-0 rounded-0" type="text" placeholder="Search" id="example-search-input4" />

                                </div>
                            </Row>
                        </Col>
                        <Col md="2" sm="0"> </Col>
                        {
                            vendordata.map((item, index) => (
                                <Col md="4" className="mt-4" key={index}>
                                    <Link to={{ pathname:'/individualprovider', vendorProps:{data:item}}}>
                                        <div className="list-card-banner list-align-items-end list-cardBannerStyle" >
                                            <article className="list-caption list-m-4 list-w-100">
                                                <div className="list-rating">
                                                    <span>4 <span className="list-star1">&#42;</span></span>
                                                </div>
                                                <h5 className="list-card-title list-primary-text-color">{item.bussinessName}</h5>
                                                <p className="list-card-text">{item.Address.streetName}&nbsp;{item.Address.city}&nbsp;{item.Address.province}&nbsp;{item.Address.postalCode}</p>
                                            </article>
                                        </div>
                                    </Link>
                                </Col>
                            ))

                        }



                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
TiffinServices.propTypes = {
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}
export default connect(mapStateToProps, { setAlert })(TiffinServices);