import React, { Component } from "react";
// import {
//     Route,
//     Link,
//     Link,
//     HashRouter,
//     browserHistory
// } from "react-router-dom";

import { Router, Route, Link, browserHistory, IndexRoute }
    from 'react-router';
import { connect } from "react-redux";

class Header extends Component {
    constructor(props) {

        super(props);

        this.signout = this.signout.bind(this);
       
    }
    signout(e) {
        // e.preventDefault();
        //  this.props.history.push('/Login');
    }
    render() {
        
        // let location = useLocation();
        // console.log(location.pathname);
        //console.log(this.props.history);
        let menuheader;       
        return (            
            <div className="wrapper row1">
                <div className="wrapper row0">
                    <div id="topbar" className="hoc clear">
                        <div className="fl_right">
                            <ul className="nospace">
                                <li><b>Help : </b><i className="fa fa-phone"></i> +00 (123) 456 7890</li>
                                <li><i className="fa fa-envelope-o"></i> info@domain.com</li>
                                <li><i className="fa fa-user" ></i> Hi! {this.props.data}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <header id="header" className="hoc clear">

                        <nav id="mainav" className="fl_right">
                            <ul className="nospace">
                                <li><Link to="/">Sign Out</Link></li>
                                
                            </ul>
                        </nav>

                        <nav id="mainav" className="fl_left">
                            <ul className="clear">
                                <li className="active"><Link exact to="/"><i className="fa fa-lg fa-home"></i></Link></li>
                                <li className="active"><Link exact to="/Summary">Home</Link></li>                                
                                <li><a className="drop" href="#">Claims</a>
                                    <ul>
                                        <li><Link to="/Summary">Summary</Link></li>
                                        <li><Link to="/EditClaim">EditClaim</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/Summary">Summary</Link></li>
                                <li><Link to="/EditClaim">EditClaim</Link></li>
                                {/* <li className="li-others"><a className="drop drop-others" href="#">Others</a> </li>
                                <li><a href="#">BLOG</a></li>
                                <li><a href="#">RESOURCES</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact</a></li> */}
                            </ul>
                        </nav>
                    </header>
            </div>
        );
    }
}


// const mapStateToProps = state => {
//     return { loggedUserName: state }
// }

// export default connect(mapStateToProps)(Header);

export default Header;