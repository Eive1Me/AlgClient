import "../AlgList.css"
import React from 'react';
import axios from 'axios';
import useCollapse from 'react-collapsed';

export class AlgList extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        filter: "",
        algList: [],
        activeAlg: null,
    }
    role = "";

    componentDidMount() {
        let algList = []
        axios.get(`http://localhost:9090/algorithms`)
            .then(res => {
                algList = res.data
                console.log(algList)
                let newState = this.state
                newState.algList = algList
                this.setState(newState)
                console.log(this.props.role)
            })
    }

    loadData() {
        let algList = []
        //load data from server
        axios.get(`http://localhost:9090/algorithms`)
            .then(res => {
                algList = res.data
                let newState = this.state
                newState.algList = algList
                this.setState(newState)
            })
    }

    loadList = (e) => {
        if(e.target.checked) {
            let newState = this.state
            newState.filter = e.target.value
            this.setState(newState)

            this.loadData()
        }
    }

    //from yyyy-mm-dd
    //to dd-mm-yyyy
    formatDate(dateStr) {
        let date = dateStr.split("-")
        let day = 1 + date[2]

        return day + "-" + date[1] + "-" + date[0]
    }

    //the way around
    formatDateY(dateStr) {
        let date = dateStr.split("-")
        return date[2] + "-" + date[1] + "-" + date[0]
    }

    deleteOrder(id) {
        axios.delete("http://localhost:9090/algorithms/" + id)
            .then(res => {
                let data = res.data;
                console.log(data)
                if (res.status === 200) {
                    console.log("Status was 200, deleting...")
                    let algList = this.state.algList
                    let newList = algList.filter( e => e.id !== id)
                    let newState = this.state
                    newState.algList = newList
                    this.setState(newState)
                }
            })

    }

    editOrder(orderId) {
        let newState = this.state
        newState.activeAlg = this.state.algList.find(e => e.id === orderId)
        console.log("active alg")
        console.log(newState.activeAlg)

        this.setState(newState)
    }

    updateData(e) {
        let newState = this.state
        switch(e.target.id) {
            case "edit-deadline-input": newState.activeAlg.name = e.target.value
                break
            case "edit-payment-input": newState.activeAlg.notes = e.target.value
                break
            case "edit-prepayment-input": newState.activeAlg.how_uses = e.target.value
                break
            case "status": newState.activeAlg.how_works = e.target.value
        }
        console.log(newState.activeAlg.id)
        this.setState(newState)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.post()
        let newState = this.state
        newState.activeAlg = null
        this.setState(newState)
    }

    post() {
        let alg = {
            name: this.state.activeAlg.name,
            accuracy: this.state.activeAlg.accuracy,
            learning_time: this.state.activeAlg.learning_time,
            linear: this.state.activeAlg.linear,
            params: this.state.activeAlg.params,
            notes: this.state.activeAlg.notes,
            how_works: this.state.activeAlg.how_works,
            how_uses: this.state.activeAlg.how_uses
        }
        console.log("order")
        console.log(alg)

        axios.put('http://localhost:9090/algorithms/' + this.state.activeAlg.id, {
            name: alg.name,
            accuracy: alg.accuracy,
            learning_time: alg.learning_time,
            linear: alg.linear,
            params: alg.params,
            notes: alg.notes,
            how_works: alg.how_works,
            how_uses: alg.how_uses
        })
            .then(res => {
                console.log(res.data)
                this.cancel()
            })
    }

    cancel(e) {
        let newState = this.state
        newState.activeAlg = null
        this.setState(newState)
    }

    render() {
        return (
            <div className="back">
                {(this.props.role === "admin") ?
                    <div> {(this.state.activeAlg !== null) ?
                        <div className="edit-container">
                            <div className="nochange-container">
                                <div className="edit-id">Алгоритм: {this.state.activeAlg.name}</div> <br/>
                                <div className="edit-client-name">№{this.state.activeAlg.id}</div> <br/>
                                <div className="edit-work">Точность: {this.state.activeAlg.accuracy}</div> <br/>
                                {this.state.activeAlg.linear !== null ? <div className="edit-accessory">Скорость обучения: {this.state.activeAlg.learning_time}</div>
                                    :""}

                            </div>
                            <form className="edit-form" onSubmit={(e) => this.handleSubmit(e)}>
                                <label htmlFor="payment">Принцип работы:</label>
                                <input name="payment" className="edit-form-input" id="edit-payment-input" defaultValue={this.state.activeAlg.how_works} onChange={(e) => this.updateData(e)}/>
                                <label htmlFor="payment">Способы использования:</label>
                                <input name="prepayment" className="edit-form-input" id="edit-prepayment-input" defaultValue={this.state.activeAlg.how_uses} onChange={(e) => this.updateData(e)}/>
                                <label htmlFor="deadline">Примечания:</label>
                                <input name="deadline" className="edit-form-input" id="edit-deadline-input" defaultValue={this.state.activeAlg.notes} onChange={(e) => this.updateData(e)}/>
                                <label htmlFor="status">Линейность:</label>
                                <select defaultValue={this.state.activeAlg.linear} id="status" name="status" className="edit-form-input" onChange={(e) => this.updateData(e)}>
                                    <option value="true" >Линейный</option>
                                    <option value="false" >Нелинейный</option>
                                </select>
                                <div>
                                <input type="submit" value="Сохранить"/>
                                <button className="cancel-btn" onClick={(e) => this.cancel(e)}>Отмена</button>
                                </div>
                            </form>
                        </div>
                        : ""}
                    </div>
                 : "" }
                <ul className="un-list">

                    {this.state.algList.map(alg => <li key={"list" + alg.id} className={"OrderList-orderlist-item " + (this.state.activeAlg === alg.id ? "editActive" : "")}>
                        <Collapsible name = {alg.name}><div className="content-container">
                            <br/>
                            <span className="order-item-field order-item Orderlist-item">Точность: {alg.accuracy}</span> <br/>
                            <span className="order-item-field order-item Orderlist-item">Время обучения: {alg.learning_time}</span> <br/>
                            <span className="order-item-field order-item Orderlist-item">Линейный ли алгоритм: {alg.linear === true ? "Линейный" : "Нелинейный"}</span> <br/>
                            <span className="order-item-field order-item Orderlist-item">Количество параметров: {alg.params}</span> <br/>
                            <span className="order-item-field order-item Orderlist-item">Принцип работы: {alg.how_works}</span> <br/>
                            <span className="order-item-field order-deadline Orderlist-item">Принцип использования: {alg.how_uses}</span> <br/>
                            {/*<span className="order-item-field order-status Orderlist-item">{alg.notes}</span>*/}
                        </div>
                        {(this.props.role === "admin") ?
                            <div className="orderlist-item-btn-container">
                                <button className="edit-btn" onClick={()=> this.editOrder(alg.id)}>Редактировать</button>
                                <button className="del-btn" onClick={()=> this.deleteOrder(alg.id)}>Удалить</button>
                            </div>
                        : ""}
                        </Collapsible>
                    </li>)}
                </ul>
            </div>
        )
    }
}

function Collapsible(props) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? props.name : props.name}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}