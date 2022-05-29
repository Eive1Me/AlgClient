import "../Auth.css"
import React from 'react';
import axios from 'axios';

export class Favourites extends React.Component {
    constructor(props) {
        super(props);
    }
    state={
        algList: []
    }
    role = "none";

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        let newState = this.state
        let algList = []
        let getRequest = `http://localhost:9090/algorithms?expand`
        axios.get(getRequest)
            .then(res => {
                algList = res.data
                let list = algList.slice(0,3)
                console.log(list)
                newState.algList = list
                this.setState(newState)
            })
    }

    render() {
        return <div className="favourites-container">
            <span className="favourites-span">Избранное</span>
            <ul>
                {this.state.algList.map(alg => <li className="home-alglist-item" key={"home" + alg.id}>
                    <span className="order-item-field alg-name">{alg.name}</span>
                </li>)}
            </ul>
        </div>
    }
}