import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Header from "../shared/Header.jsx";
//import Summary from "./Summary.jsx";
import EditClaim from "./EditClaim.jsx";
//import LoginPage from "../login/LoginPage.jsx";
import { Router, Route, Link, browserHistory, IndexRoute }
    from 'react-router';
import { connect } from "react-redux";

class Summary extends Component {

    constructor() {

        super();
        this.state = {
            claimlist: [],
            stname: ''
        }
    }
    componentDidMount() {
        console.log('didmount');
        this.handleUpdateSummary();


        console.log("state object :", this.state.claimlist);
    }
    componentDidUpdate(prevProps, prevState) {
        //console.log('updatemount'); 
        // this.handleUpdateSummary();
    }
    handleUpdateSummary() {

        // axios.get(`http://localhost:7000/claims`)
        //     .then(res => {
        //         const claimlist = res.data;
        //         console.log("claimlist from jsonserver :", claimlist);
        //         this.setState({ claimlist });
        //     })

    }

    render() {

        // this.props.dispatch({
        //     type: 'ADD_CLAIM',
        //     payload: this.state.claimlist
        // });
        console.log("updated claimlist : ", this.props.claimlist);
        console.log("updated loggeduser : ", this.props.loggedUser);
        //get claim list json from redux server     
        let summary = this.props.claimlist.map(function (person, index) {
            return (<tr key={index}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.claimnumber}</td>
                <td>{person.claimtype}</td>
                <td>{person.claimprogram}</td>
                <td><Link to={{ pathname: '/EditClaim', state: { empid: person.id } }} >Update</Link></td>
            </tr>);
        });

        return (
            <div>
                <Header data={this.props.loggedUser}/>

                <div className="wrapper row3">
                    <div className="hoc container clear clients summary-container" >
                        <h6 className="heading">Claim Summary</h6>
                        <Table className="table table-striped bordered hover responsive">
                            <thead>
                                <tr>
                                    <th>Employee Id</th>
                                    <th>Employee Name</th>
                                    <th>Claim Number</th>
                                    <th>Claim Type</th>
                                    <th>Claim Program</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>{summary}</tbody>
                        </Table >
                    </div>
                </div>
            </div>
        );
    }
}

//Get data from redux store
const mapStateToProps = state => {
    return {  loggedUser: state.loggedUser,claimlist: state.claimlist }
}

export default connect(mapStateToProps)(Summary);