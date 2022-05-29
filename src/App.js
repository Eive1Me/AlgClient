import './App.css';
import React from 'react';
import Home from "./components/Home";
import {AlgList} from "./components/AlgList";
import {BrowserRouter as Router, Route, Link, Switch, NavLink} from "react-router-dom";
import {NewAlg} from "./components/NewAlg";
import {Settings} from "./components/Settings";
import {Statistics} from "./components/Statistics";
import {DictList} from "./components/DictList";
import axios from "axios";

class App extends React.Component {
    render() {
        const { history } = this.props

        return (
            <div className="container">
                <main>
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/orders' component={AlgList} />
                        <Route path='/new_order' component={NewAlg} />

                        <Route path='/settings/edit_dict'>
                            <DictList/>
                        </Route>
                        <Route path='/settings'>
                            <Settings/>
                        </Route>

                        <Route path='/statistics' component={Statistics} />
                        <Route path='/' exact component={Home} />
                    </Switch>
                </main>
                <footer>
                    <ul className="App-nav-list">
                        <li className="App-nav-item">
                            <NavLink activeClassName="selected" to="/home">Главная</NavLink></li>
                        <li className="App-nav-item">
                            <NavLink activeClassName="selected" to="/orders">Заказы</NavLink></li>
                        <li className="App-nav-item">
                            <NavLink activeClassName="selected" to="/new_order">Новый заказ</NavLink></li>
                        <li className="App-nav-item">
                            <NavLink activeClassName="selected" to="/statistics">Статистика</NavLink></li>
                        <li className="App-nav-item">
                            <NavLink activeClassName="selected" to="/settings">Настройки</NavLink></li>
                    </ul>
                </footer>
            </div>
        );
    };
}

export default App;
