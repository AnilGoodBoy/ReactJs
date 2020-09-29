import React from 'react';
import Header from "./src/components/shared/Header.jsx";
import Footer from "./src/components/shared/Footer.jsx";

import { Router, Route, Link, browserHistory, IndexRoute }
   from 'react-router';

class AppRouter extends React.Component {
   render() {
      return (
         <div>
            {/* <Header /> */}
            {/* <Link to="home">Home!</Link>
            <Link to="claim">Claim Summery !</Link>
            <Link to="updateClaim">Update Claim !</Link> */}

            {this.props.children}
            <Footer/>
         </div>
      )
   }
}

export default AppRouter;





