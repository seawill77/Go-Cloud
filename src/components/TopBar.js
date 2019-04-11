import React, { Component } from "react";
import logo from "../assets/images/logo.svg";
import { Icon } from "antd";

class TopBar extends Component {
    render() {
        return (
            <header className="App-header">
                <div className="App-header-left">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="App-title">Around</div>
                </div>

                {this.props.isLoggedIn ? (
                    <a
                        className="logout"
                        href="#0"
                        onClick={this.props.handleLogout}
                    >
                        <Icon type="logout" theme="outlined" /> Logout
                    </a>
                ) : null}
            </header>
        );
    }
}

export default TopBar;
