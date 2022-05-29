import "../Auth.css"
import React from 'react';
import axios from 'axios';

export class Favourites extends React.Component {
    constructor(props) {
        super(props);
    }
    state={
        algList: [],
        favList: [],
        user: {}
    }
    role = "none";
    usId = "";

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        let newState = this.state
        let algList = []
        let favList = []
        let favIds = []
        let getRequest = `http://localhost:9090/algorithms?expand`
        axios.get(getRequest)
            .then(res => {
                axios.get(`http://localhost:9090/favourites?expand`).then( fav => {
                    favList = fav.data
                    algList = res.data
                    // console.log(favList)
                    // console.log(algList)
                    favList.map( f => {
                        //console.log(f.name)
                        algList.map(alg => {
                            console.log(f.us === this.props.usId)
                            if (f.us === this.props.usId)
                                if (alg.id === f.name)
                                    favIds.push(alg)
                        })
                    })
                    let list = favIds
                    newState.favList = list
                    this.setState(newState)
                    console.log(this.state.favList)
                })
        })

    }

    render() {
        return <div className="favourites-container">
            <span className="favourites-span">Избранное</span>
            <ul>
                {this.state.favList.map(alg => <li className="home-alglist-item" key={"home" + alg.id}>
                    <span className="order-item-field alg-name">{alg.name}</span>
                </li>)}
            </ul>
        </div>
    }
}