import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import Header from "../shared/Header.jsx";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { receiveClaimList } from "../../actions/claimActions.jsx";

class EditClaim extends Component {

    constructor(props) {

        super(props);
        this.state = {
            claim: [],
            fields: {},
            errors: {},
            issuccess: false,
            empid: props.location.state
        }

        this.submitClaim = this.submitClaim.bind(this);
        this.cancelClaim = this.cancelClaim.bind(this);
    }
    
    componentDidMount() {
        console.log(this.props.location.state);
        let empid = "123456";
        if (this.props.location.state !== undefined)
            empid = this.props.location.state.empid;
        console.log({ empid });
        
        const claim = this.props.stateclaimlist.find(element => element.id == empid);
        this.setState({ claim });

    }

    handleValidation() {
        let fields = this.refs;
        let errors = {};
        let formIsValid = true;
        let pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

        if (!fields["claimno"].value) {
            formIsValid = false;
            errors["claimno"] = "* Cannot be empty";
        }
        else if (typeof fields["claimno"].value !== "undefined") {
            if (!fields["claimno"].value.match(/^[a-zA-Z0-9]+$/)) {
                formIsValid = false;
                errors["claimno"] = "* Allow only letters or numbers";
            }
            else if (fields["claimno"].value.length > 9) {
                formIsValid = false;
                errors["claimno"] = "* Must contain maximum nine characters";
            }
        }
        if (!fields["claimtype"].value) {
            formIsValid = false;
            errors["claimtype"] = "* Cannot be empty";
        }
        if (!fields["claimprgm"].value) {
            formIsValid = false;
            errors["claimprgm"] = "* Cannot be empty";
        }
        else if (fields["claimprgm"].value.length > 20) {
            formIsValid = false;
            errors["claimprgm"] = "* Must contain maximum 20 characters";
        }

        if (!fields["stDt"].value) {
            formIsValid = false;
            errors["stDt"] = "* Cannot be empty";
        }
        else if (!pattern.test(fields["stDt"].value)) {
            formIsValid = false;
            errors["stDt"] = "* Invalid format";
        }

        if (!fields["endDt"].value) {
            formIsValid = false;
            errors["endDt"] = "* Cannot be empty";
        }
        else if (!pattern.test(fields["endDt"].value)) {
            formIsValid = false;
            errors["endDt"] = "* Invalid format";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }



    submitClaim(e) {
        e.preventDefault();
        document.getElementsByClassName('errors').textcontent = "";
        if (this.handleValidation()) {
            const { empid } = this.state.empid;
            let fields = this.refs;
            let params = {
                id: empid,
                name: fields["empName"].value,
                claimnumber: fields["claimno"].value,
                claimtype: fields["claimtype"].value,
                claimprogram: fields["claimprgm"].value
            };
            axios.put(`http://localhost:7000/claims/${empid}`, {
                name: fields["empName"].value,
                claimnumber: fields["claimno"].value,
                claimtype: fields["claimtype"].value,
                claimprogram: fields["claimprgm"].value
            })
                .then(response => {
                    this.setState({ friends: response.data });
                })
                .catch(error => {
                    console.log(error);
                });
            //update redux claimlist state object
            let objIndex = this.props.stateclaimlist.findIndex((obj => obj.id == empid));
            this.props.stateclaimlist[objIndex] = params;

            console.log("after updated json:", this.props.stateclaimlist);
            // this.props.dispatch({
            //     type: 'ADD_CLAIM',
            //     payload: this.props.stateclaimlist
            // });
            this.props.dispatch(receiveClaimList(this.props.stateclaimlist));

            this.setState({ stname: 'updated' })
            this.setState({ issuccess: true })
            browserHistory.push('/Summary');
        } else {
            console.log('form has errors');
        }

    }

    cancelClaim(e) {
        browserHistory.push('/Summary');
    }

    render() {
        // if (this.state.issuccess == true) {
        //     return <Redirect to="/" />;
        // }
        console.log();
        let claimType = ["Submitted", "Received", "Pending", "More Info Required", "Pending", "Rejected", "Paid"];
        let flg = "";
        let selectedval = this.state.claim.claimtype;
        let claimTypelist = claimType.map(function (option, index) {
            if (selectedval === option)
                flg = "selected";
            return (<option key={index} defaultValue={flg} value={option}>{option}</option>);
        });
        return (
            <div>
                <Header />
                <div className="wrapper row3">

                    <div className="hoc container clear clients edit-content" >
                        <h6 className="edit-head upt-head">Claim Update</h6>
                        <div className="upt-head edit-box">
                            <Form method="post" onSubmit={this.submitClaim}>
                                <div className="row">
                                    <div className="col-4">
                                        <label >Employee Id:</label>
                                    </div>
                                    <Form.Control ref="empId" type="text" id="EmployeeId" readOnly defaultValue={this.state.claim.id} />
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label >Employee Name:</label>
                                    </div>
                                    <Form.Control ref="empName" type="text" readOnly defaultValue={this.state.claim.name} />
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label >Claim Number:</label>
                                    </div>
                                    <Form.Control ref="claimno" id="ClaimNumber" placeholder="XXX-XXX-XXX" type="text"
                                        defaultValue={this.state.claim.claimnumber} />
                                    <div className="row"><span className="errors">{this.state.errors["claimno"]}</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <label >Claim Type:</label>
                                    </div>
                                    <Form.Control as="select" ref="claimtype" id="ClaimType" name="ClaimType">
                                        {claimTypelist}
                                    </Form.Control>
                                    <div className="row"><span className="errors">{this.state.errors["claimtype"]}</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label>Claim Program:</label>
                                    </div>
                                    <Form.Control ref="claimprgm" type="text" id="ClaimProgram" defaultValue={this.state.claim.claimprogram} />
                                    <div className="row"><span className="errors">{this.state.errors["claimprgm"]}</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label >Claim Start Date:</label>
                                    </div>
                                    <Form.Control ref="stDt" type="text" id="ClaimStartDate" className="datepicker" placeholder="MM/dd/YYYY"
                                        defaultValue="07/08/2020" />
                                    <div className="row"><span className="errors">{this.state.errors["stDt"]}</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label>Claim End Date:</label>
                                    </div>
                                    <Form.Control ref="endDt" type="text" id="ClaimEndDate" className="datepicker" placeholder="MM/dd/YYYY" defaultValue="10/08/2020" />
                                    <div className="row"><span className="errors">{this.state.errors["endDt"]}</span></div>
                                </div>
                                <br />
                                <div className="row"></div>
                                <div className="cntls">
                                    <div className="row">
                                        <div className="col-6">
                                            <Button variant="info" type="submit">Update</Button>
                                        </div>

                                        <div className="col-5">
                                            <Button variant="info" onSubmit={this.cancelClaim}>Cancel</Button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

// export default EditClaim;
//Get data from redux store
//Get data from redux store
const mapStateToProps = state => {
    return { name: state.loggedUser, stateclaimlist: state.claimlist }
}
export default connect(mapStateToProps)(EditClaim);