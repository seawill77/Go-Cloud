import React, { Component } from "react";
import { Register } from "./register.js";
import { Login } from "./Login.js";
import { Home } from "./Home.js";
import { Switch, Route, Redirect } from "react-router-dom";

export default class Main extends Component {
    getHome = () => {
        return this.props.isLoggedIn ? <Home /> : <Redirect to="/login" />;
    };

    getLogin = () => {
        return this.props.isLoggedIn ? (
            <Redirect to="/home" />
        ) : (
            <Login handleLogin={this.props.handleLogin} />
        );
    };
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getLogin} />
                    <Route path="/login" render={this.getLogin} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" render={this.getHome} />
                    {/* all other routes */}
                    <Route render={this.getLogin} />
                </Switch>
            </div>
        );
    }
}
