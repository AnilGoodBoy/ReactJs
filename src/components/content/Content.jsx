import React from 'react';
import { Route, HashRouter } from "react-router-dom";
import Summary from "./Summary.jsx";
import EditClaim from "./EditClaim.jsx";


class Content extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <div className="content">
                        <Route exact path="/" component={Summary} />
                        <Route path="/EditClaim" component={EditClaim} />
                    </div>
                </div>
            </HashRouter>          
        );
    }
}

export default Content;