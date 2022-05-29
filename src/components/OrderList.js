import React from 'react';
import axios from 'axios';
import '../OrderList.css';
import * as fallbackData from "../data/fallback_data";
import {orderList} from "../data/fallback_data";

export class OrderList extends React.Component {
    state = {
        filter: "",
        orderList: [],
        activeOrder: null,
    }

    componentDidMount() {
        let orderList = []

        axios.get(`http://localhost:8080/order?expand`)
                .then(res => {
                    orderList = res.data
                    console.log(orderList)
                    let newState = this.state
                    newState.orderList = orderList
                    this.setState(newState)
                })
    }

    loadData() {
        let orderList = []
        //load data from server
        axios.get(`http://localhost:8080/order?expand`)
            .then(res => {
                orderList = res.data
                let newState = this.state
                newState.orderList = orderList
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
        axios.delete("http://localhost:8080/order/" + id)
            .then(res => {
                let data = res.data;
                console.log(data)
                if (res.status === 200) {
                    console.log("Status was 200, deleting...")
                    let orderList = this.state.orderList
                    let newList = orderList.filter( e => e.id !== id)
                    let newState = this.state
                    newState.orderList = newList
                    this.setState(newState)
                }
            })

    }

    editOrder(orderId) {
        let newState = this.state
        newState.activeOrder = this.state.orderList.find(e => e.id === orderId)
        console.log("active order")
        console.log(newState.activeOrder)

        this.setState(newState)
    }

    updateData(e) {
        let newState = this.state
        switch(e.target.id) {
            case "edit-deadline-input": newState.activeOrder.deadline = this.formatDate(e.target.value)
                break
            case "edit-payment-input": newState.activeOrder.payment = e.target.value
                break
            case "edit-prepayment-input": newState.activeOrder.prepayment = e.target.value
                break
            case "status": newState.activeOrder.status = e.target.value
        }
        console.log(newState.activeOrder.deadline)
        this.setState(newState)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.post()
        let newState = this.state
        newState.activeOrder = null
        this.setState(newState)
    }

    post() {
        let order = {
            clientId: this.state.activeOrder.clientId,
            itemId: this.state.activeOrder.itemId,
            workId: this.state.activeOrder.workId,
            accessoryId: this.state.activeOrder.accessoryId,
            prepayment: this.state.activeOrder.prepayment,
            payment: this.state.activeOrder.payment,
            deadline: this.state.activeOrder.deadline,
            orderDate: this.state.activeOrder.orderDate,
            status: this.state.activeOrder.status
        }
        console.log("order")
        console.log(order)
        // order.deadline = this.formatDate(order.deadline)
        if (order.accessoryId === 0)
            order.accessoryId = null



        axios.put('http://localhost:8080/order/' + this.state.activeOrder.id, {
            clientId: order.clientId,
            itemId: order.itemId,
            workId: order.workId,
            accessoryId: order.accessoryId,
            prepayment: order.prepayment,
            payment: order.payment,
            deadline: order.deadline,
            orderDate: order.orderDate,
            status: order.status
        })
            .then(res => {
                console.log(res.data)
                this.cancel()
            })
    }

    cancel(e) {
        let newState = this.state
        newState.activeOrder = null
        this.setState(newState)
    }

    render() {
            return (
                <div>
                    {(this.state.activeOrder !== null) ?
                        <div className="edit-container">
                            <div className="nochange-container">
                                <div className="block-1">
                                    <div className="edit-id">№{this.state.activeOrder.id}</div>
                                    <div className="edit-client-name">Клиент: {this.state.activeOrder.client.name}</div>
                                    <div className="edit-client-phone-number">Телефон: {this.state.activeOrder.client.phoneNumber}</div>
                                </div>
                                <div className="edit-order-date">Дата создания заказа: {this.state.activeOrder.orderDate}</div>
                                <div className="edit-item">Одежда: {this.state.activeOrder.item.name}</div>
                                <div className="edit-work">Вид работы: {this.state.activeOrder.work.name}</div>
                                {this.state.activeOrder.accessory !== null ? <div className="edit-accessory">Фурнитура: {this.state.activeOrder.accessory.name}</div>
                                :""}

                            </div>
                            <form className="edit-form" onSubmit={(e) => this.handleSubmit(e)}>
                                <input name="payment" className="edit-form-input" id="edit-payment-input" type="number" defaultValue={this.state.activeOrder.payment} onChange={(e) => this.updateData(e)}/>
                                <label htmlFor="payment">Цена</label>
                                <input name="prepayment" className="edit-form-input" id="edit-prepayment-input" type="number" defaultValue={this.state.activeOrder.prepayment} onChange={(e) => this.updateData(e)}/>
                                <label htmlFor="payment">Предоплата</label>
                                <input name="deadline" className="edit-form-input" id="edit-deadline-input" type="date" defaultValue={this.formatDateY(this.state.activeOrder.deadline)} onChange={(e) => this.updateData(e)}/>
                                <label htmlFor="deadline" htmlFor="">Срок</label>
                                <select id="status" name="status" className="edit-form-input" onChange={(e) => this.updateData(e)}>
                                    <option selected={this.state.activeOrder.status === "В процессе"}>В процессе</option>
                                    <option selected={this.state.activeOrder.status === "Завершен"}>Завершен</option>
                                </select>
                                <label htmlFor="status">Статус</label>
                                <input type="submit" value="Сохранить"/>
                                <button onClick={(e) => this.cancel(e)}>Отмена</button>
                            </form>
                        </div>
                        : ""
                    }
                    <ul>
                        {this.state.orderList.map(order => <li className={"OrderList-orderlist-item " + (this.state.activeEdit === order.id ? "editActive" : "")}>
                            <div className="content-container">
                                <span className="order-item-field order-id Orderlist-item">{order.id}</span>
                                <span className="order-item-field order-name Orderlist-item">{order.client.name}</span>
                                <span className="order-item-field order-item Orderlist-item">{order.item.name}</span>
                                <span className="order-item-field order-deadline Orderlist-item">Срок: {order.deadline}</span>
                                <span className="order-item-field order-status Orderlist-item">{order.status}</span>
                            </div>
                            <div className="orderlist-item-btn-container">
                                <button className="edit-btn" onClick={()=> this.editOrder(order.id)}>Редактировать</button>
                                <button className="del-btn" onClick={()=> this.deleteOrder(order.id)}>Удалить</button>
                            </div>
                        </li>)}
                    </ul>
                </div>
            )
    }
}
