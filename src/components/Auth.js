import "../Auth.css"
import React from 'react';
import axios from 'axios';

export class Auth extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.func = this.props.func
    }

    state = {
        user : {}
    }

    checkData(){
        let usList = null;
        //load data from server
        axios.get(`http://localhost:9090/users`)
            .then(res => {
                usList = res.data
                console.log(usList)
                let newState = this.state
                usList.map( us => {
                    console.log(us)
                    // (us.login === this.state.user.login) ? newState.user =  us : newState.user.role = "none"
                    if (us.login === this.state.user.login)
                        if (us.password === this.state.user.password){
                            newState.user.id = us.id
                            newState.user.role =  us.role
                        }
                        else {
                            newState.user.id = 0
                            newState.user.role = "none"
                        }
                })
                this.setState(newState)
                this.setRole(this.state.user.role)
                console.log(newState.user)
                this.props.func(this.state.user)
            })

    }

    doStuff(usList){

    }

    updateData(e) {
        let newState = this.state
        switch(e.target.id) {
            case "login-input": newState.user.login = e.target.value
                break
            case "password-input": newState.user.password = e.target.value
        }
        this.setState(newState)
    }

    render() {
        return <div className="edit-form">
            <span className="favourites-span">Вход</span> <br/>
            <label htmlFor="login">Почта:</label>
            <input name="login" className="edit-form-input" id="login-input" onChange={e => this.updateData(e) }/>
            <label htmlFor="password">Пароль:</label>
            <input name="password" className="edit-form-input" id="password-input" onChange={e => this.updateData(e)}/>
            <button className="submit-btn" onClick={(e) => this.checkData(e)}>Войти</button>
        </div>
    }

    setRole(data) {
        this.tempProps = {...this.props}
        this.tempProps.role = data
    }
}