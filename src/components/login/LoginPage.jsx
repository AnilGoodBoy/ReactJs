import React from "react";
import ReactDOM from "react-dom";
import { Link, browserHistory } from "react-router";
//import { Redirect, Route, HashRouter } from "react-router-dom";

import Summary from "../content/Summary.jsx";
import EditClaim from "../content/EditClaim.jsx";
import LoginHeader from "../login/LoginHeader.jsx";
import axios from 'axios';
import { connect } from "react-redux";
import { receiveClaimList, setUserName } from "../../actions/claimActions.jsx";

const userIdRegex = RegExp(
    /^[uU]*1+[0-9]*$/
);

class LoginPage extends React.Component {

    constructor() {
        super();

        this.state = {
            loggedIn: false,
            userlist: [],
            errors: {},
            username: ""
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(`http://localhost:7001/users`)
            .then(res => {
                const userlist = res.data;
                this.setState({ userlist });
                // users=userlist;
            });

    }
    // componentDidUpdate(prevProps, prevState) {
    //     this.setState({ loggedIn: false })
    // }

    handleValidation() {
        let fields = this.refs;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"].value) {
            formIsValid = false;
            errors["username"] = 'Username can not be empty';
        }
        if (!fields["pwd"].value) {
            formIsValid = false;
            errors["pwd"] = 'Password can not be empty';
        }
        if (typeof fields["username"].value !== "undefined" && typeof fields["pwd"].value !== "undefined") {

        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let errors = {};
        document.getElementsByClassName('errors').textcontent = "";
        if (this.handleValidation()) {
            let isSuccess = false;
            let fields = this.refs;
            this.state.userlist.map(function (user, index) {
                if (user.name == fields["username"].value && user.password == fields["pwd"].value) {
                    console.log('logged in');
                    isSuccess = true;
                }
            });
            this.setState({ username: fields["username"].value });
            if (!isSuccess) {
                errors["invalid"] = 'Invalid username and password';
                this.props.dispatch({
                    type: 'SET_LOGGED_USER',
                    payload: fields["username"].value
                });
                console.log("logged username : ", this.props.loggedUserName);
                this.setState({ errors: errors });
            }
            else {
                //get claim list json for claimsummary from json-server and updated in redux store
                axios.get(`http://localhost:7000/claims`)
                    .then(res => {
                        const claimlist = res.data;
                        console.log("claimlist from jsonserver :", claimlist);
                        // this.props.dispatch({
                        //     type: 'RECEIVE_CLAIMS',
                        //     payload: {
                        //         claimlist
                        //     }
                        // });

                        this.props.dispatch(receiveClaimList(claimlist));
                    })
                console.log("logged user from state:", fields["username"].value)
                this.props.dispatch(setUserName(fields["username"].value));
                this.setState({ loggedIn: true })
                browserHistory.push('/Summary');
            }

        }

    };

    render() {

        return (
            <div>
                <LoginHeader data={this.props.loggedUserName} />
                <div className="wrapper row3 login-container">
                    <div className="hoc container clear clients login-container">
                        <div className="login">
                            <h1>Login</h1>
                            <form method="post" >
                                <div className="col-12">
                                    <div className="row"><span className="errors">{this.state.errors["invalid"]}</span></div>
                                    <div className="row"><input ref="username" type="text" name="login" id="username" defaultValue="" placeholder="Username or Email" /></div>
                                    <div className="row"><span className="errors">{this.state.errors["username"]}</span></div>
                                    <div className="row"><input ref="pwd" type="password" id="password" name="password" defaultValue="" placeholder="Password" /></div>
                                    <div className="row"><span className="errors">{this.state.errors["pwd"]}</span></div>
                                    <div className="remember_me row">
                                        <label>
                                            <input type="checkbox" name="remember_me" id="remember_me" />
                                            Remember me
                                    </label>
                                    </div>
                                    <div className="submit"><input type="submit" name="commit" value="Login" onClick={this.handleFormSubmit} /></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { loggedUserName: state }
}

export default connect(mapStateToProps)(LoginPage);
