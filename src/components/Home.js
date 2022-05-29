import '../App.css';
import '../Home.css';
import React from 'react';
import {Auth} from "./Auth";
import {Favourites} from "./Favourites";
import {  BrowserRouter as Router,  Route, Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import axios from "axios";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    state={
        curTime : new Date().toLocaleString(),
        algList: [],
        fact : [],
        role : ""
    }

    role = "";
    usId = "";
    func;

    tempProps;


    componentDidMount() {
        this.func = this.props.func
        // let newState = this.state
        // newState.role = "none"
        // this.setState(newState)
    }

    //
    // loadData() {
    //     let date = this.getToday()
    //     date = date.replaceAll(".", "-")
    //     date = date.replace(",", "")
    //     date = date.split(" ")[0]
    //
    //     let algList = []
    //     let newState = this.state
    //     let getRequest = `http://localhost:9090/algorithms?expand`
    //     axios.get(getRequest)
    //             .then(res => {
    //                 algList = res.data
    //                 console.log(algList)
    //                 let list = algList.slice(0,3)
    //                 console.log(list)
    //                 newState.algList = list
    //                 this.setState(newState)
    //             })
    // }
    pull_data = (data) => {
        console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
        this.setRole(data)
    }

    render(){
        return (
            <div className="App home-container">  {/*this.props.func(this.state.role)*/}
                <div className="eue"> <span className="app-desc">Некоторые алгоритмы обучения делают определенные предположения
                    о структуре данных или желаемых результатов. Если вы сможете найти тот алгоритм,
                    который соответствует вашим потребностям, с ним вы сможете получить более точные результаты,
                    более точные прогнозы и сократить время обучения.</span>
                </div>
                {(this.props.role === "none") ? <Auth func = {this.props.func}/> : <Favourites usId = {this.props.usId}/>}
            </div>
        );
    }

    setRole(data) {
        let newState = this.state
        newState.role = data
        this.tempProps = {...this.props}
        this.tempProps.role = data
        this.setState(newState)
        this.forceUpdate()
    }
}

export default Home;