import React from "react";
import ReactDOM from "react-dom";
import Content from "./Content.jsx";
import Header from "../shared/Header.jsx";
import Footer from "../shared/Footer.jsx";

class MainPage extends React.Component {
    render() {
        return (
            <div>
                {/* <HashRouter> */}
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}