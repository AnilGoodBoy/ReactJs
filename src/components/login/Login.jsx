import React from 'react';
import {
    Route,
    NavLink,
    HashRouter,
    Switch
} from "react-router-dom";
import MainPage from "./MainPage.jsx";
import App from "./src/components/content/Content.jsx";
import LoginPage from "./LoginPage.jsx";

import Summary from "./Summary.jsx";
import EditClaim from "./EditClaim.jsx";

class Login extends React.Component {
    render() {
        return (
            <HashRouter>
                {/* <Switch> */}
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/MainPage" component={MainPage} />
                    <Route path="/Summary" component={Summary} />
                    <Route path="/EditClaim" component={EditClaim} />
                {/* </Switch> */}
            </HashRouter>
        );
    }
}

export default Login;
