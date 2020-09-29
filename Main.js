import React from "react";
import ReactDOM from "react-dom";
import Content from "./src/components/content/Content.jsx";
import Header from "./src/components/shared/Header.jsx";
import Footer from "./src/components/shared/Footer.jsx";
import LoginPage from "./src/components/login/LoginPage.jsx";
import Summary from "./src/components/content/Summary.jsx";
import EditClaim from "./src/components/content/EditClaim.jsx";

// ReactDOM.render(<Header />, document.getElementById("header-content"));
//ReactDOM.render(<Content />, document.getElementById("body-content"));
// ReactDOM.render(<Footer />, document.getElementById("footer-content"));

// ReactDOM.render(<LoginPage />, document.getElementById("body-content"));
// ReactDOM.render(<Footer />, document.getElementById("footer-content"));

// import the router lib here
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import AppRouter from './AppRouter.jsx';
import { createStore } from 'redux';
import reducer from './src/reducer/claimReducer';
import { Provider } from 'react-redux';

//define store with two param one is reducer, and anonther one is 
const initialState = {
       claimlist: [],
       loggedUser: ''
   }
   
const store = createStore(reducer, { claimlist: [], loggedUser: "" });
// Router configuration to map the route 

ReactDOM.render((
       <Provider store={store}>
              <Router history={browserHistory}>
                     <Route path="/" component={AppRouter}>
                            <IndexRoute component={LoginPage} />
                            {/* <Route path="home" component={Home} /> */}
                            <Route path="/Summary" component={Summary} />
                            <Route path="/EditClaim" component={EditClaim} />
                     </Route>
              </Router>
       </Provider>
), document.getElementById('body-content'));