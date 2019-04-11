import React, { Component } from "react";
import TopBar from "./TopBar.js";
import Main from "./Main.js";
import { TOKEN_KEY } from "../constant.js";

class App extends Component {
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY))
    };

    handleLogin = data => {
        localStorage.setItem(TOKEN_KEY, data);
        this.setState({ isLoggedIn: true });
    };

    handleLogout = event => {
        event.preventDefault();
        localStorage.removeItem(TOKEN_KEY);
        this.setState({ isLoggedIn: false });
    };
    render() {
        return (
            <div className="App">
                <TopBar {...this.state} handleLogout={this.handleLogout} />
                <Main {...this.state} handleLogin={this.handleLogin} />
            </div>
        );
    }
}

export default App;
