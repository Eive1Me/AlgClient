import '../App.css';
import React from 'react';
import Home from "./Home";
import {AlgList} from "./AlgList";
import {BrowserRouter as Router, Route, Link, Switch, NavLink} from "react-router-dom";
import {NewAlg} from "./NewAlg";
import {DateTime} from "./DateTime";

class App extends React.Component {
    role = ""
    login = ""
    userId = ""
    fav = []

    pull_data = (data) => {
        this.setRole(data)
    }

    setRole(data) {
        // this.
        // this.login = data.login;
        console.log(data)
        this.role = data;
        this.forceUpdate()
    }

    logOut(){
        if (this.role !== "none"){
            this.role = "none";
        }
        this.forceUpdate()
    }

    render() {
        const { history } = this.props

        return (
            <div className="container">
                <header>
                <ul className="App-nav-list">
                    {(this.role !== "none") ?
                    <li className="App-nav-item"> <div className="app-log"> <span>login</span>
                        <button className="logout-btn" onClick={() => this.logOut()}>{(this.role !== "none") ? "Выйти" : ""}</button></div></li> : ""}
                    <li className="App-nav-item">
                        <NavLink activeClassName="selected" to="/home">Главная</NavLink></li>
                    <li className="App-nav-item">
                        <NavLink activeClassName="selected" to="/algorithms">Алгоритмы</NavLink></li>
                    {(this.role === "admin") ?
                    <li className="App-nav-item">
                        <NavLink activeClassName="selected" to="/new_algorithm">Новый алгоритм</NavLink></li>: ""}
                    <li className="App-nav-item"><div className="date-container">
                        <DateTime/>
                    </div></li>
                </ul>
            </header>
                <main>
                <Switch>
                        <Route path='/home' render={(props) => <Home {...props} func={this.pull_data} role = {this.role} />} />
                        <Route path='/algorithms' render={(props) => <AlgList {...props} role={this.role} />} /> {/*component={AlgList}*/}
                        <Route path='/new_algorithm' render={(props) => <NewAlg {...props} role={this.role} />} />
                        <Route path='/' exact component={Home} />
                </Switch>
                </main>

            </div>
        );
    };
}
export default App;