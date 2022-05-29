import React from 'react';
import axios from "axios";
import '../NewOrder.css';
import * as fallbackData from '../data/fallback_data';

export class NewAlg extends React.Component {
    state = {
        clothing_type_list: [],
        work_type_list: [],
        client_list: [],
        accessory_type_list: [],

        newAlg: {
            algorithm: {}
        }
    }

    loadData(requestItem) {
        let getRequest = `http://localhost:9090/${requestItem === "algorithm" ? requestItem : "algorithms/" + requestItem/* + "_type"*/}`
        console.log(getRequest)
        let data = []
        //load data from server
        axios.get(getRequest)
            .then(res => {
                return res.data
            })

    }

    //from yyyy-mm-dd
    //to dd-mm-yyyy
    formatDate(dateStr) {
        let date = dateStr.split("-")
        // let day = 1 + date[2]

        return date[2] + "-" + date[1] + "-" + date[0]
    }

    //the way around
    formatDateY(dateStr) {
        let date = dateStr.split("-")
        return date[2] + "-" + date[1] + "-" + date[0]
    }

    updateData(e) {
        let newState = this.state
        switch(e.target.id) {
            case "phone-number-input": newState.newAlg.client.phoneNumber = e.target.value
                break
            case "client-name-input": newState.newAlg.client.name = e.target.value
                break
            case "clothing-type-input": newState.newAlg.itemName = e.target.value
                break
            case "work-type-input": newState.newAlg.workName = e.target.value
                break
            case "accessory-type-input": newState.newAlg.accessoryName = e.target.value
                break
            case "deadline": newState.newAlg.deadline = this.formatDate(e.target.value)
                break
            case "payment": newState.newAlg.payment = e.target.value
                break
            case "prepayment": newState.newAlg.prepayment = e.target.value
                break
        }
        this.setState(newState)
    }

    formatDateAdd(str) {
        let day = Number(str.split("-")[0]) + 1
        return str.replace(str.split("-")[0], day)
    }

    handleSubmit(e) {
        console.log("before")
        e.preventDefault()
        console.log("after")
        this.post()
    }

    post() {
        let order = {
            // clientId: ?,
            // itemId: ?,
            // workId: ?,
            // accessoryId: ?,
            prepayment: this.state.newOrder.prepayment,
            payment: this.state.newOrder.payment,
            status: "В процессе"
        }

        let client = this.state.client_list.find(e => e.name === this.state.newOrder.client.name
                                                        && e.phoneNumber === this.state.newOrder.client.phoneNumber)
        if (client !== undefined) {
            order.clientId = client.id
            console.log("client found")
        }

        let work = this.state.work_type_list.find(e => e.name === this.state.newOrder.workName)
        if (work !== undefined)
            order.workId = work.id

        let item = this.state.clothing_type_list.find( e => e.name === this.state.newOrder.itemName)
        if (item !== undefined)
            order.itemId = item.id

        let accessory = this.state.accessory_type_list.find( e => e.name === this.state.newOrder.accessoryName)
        if (accessory !== undefined)
            order.accessoryId = accessory.id

        this.postAlg(order)
    }

    postAlg(alg) {
        console.log(alg)
        axios.post('http://localhost:9090/order', {
            clientId: alg.clientId,
            itemId: alg.itemId,
            workId: alg.workId,
            accessoryId: alg.accessoryId,
            prepayment: alg.prepayment,
            payment: alg.payment,
            deadline: alg.deadline,
            orderDate: alg.orderDate,
            status: alg.status
        })
            .then(res => {
                console.log(res.data)
            })
    }

    loadAccessories(order) {
        if (this.state.newOrder.accessoryName.length > 0) {
            axios.get("http://localhost:8080/dict/accessory_type?name=" + this.state.newOrder.accessoryName)
                .then(res => {
                    if (res.status === 200) {
                        order.accessoryId = res.data.id

                        order = this.loadClient(order)
                    }
                    else {
                        axios.post("http://localhost:8080/dict/accessory_type", {
                            name: this.state.newOrder.accessoryName
                        })
                            .then(res => {
                                console.log(res.data)
                                order.accessoryId = res.data.id

                                order = this.loadClient(order)
                            })
                    }
                })
        }
        else
            order.accessoryId = null

        return order
    }

    loadClient(order) {
        let client = {}
        client = this.state.client_list.find(e => e.name === this.state.newOrder.client.name
            && e.phoneNumber === this.state.newOrder.client.phoneNumber)
        if (client !== undefined) {
            order.clientId = client.id

            this.postAlg(order)
        }
        else {
            axios.post("http://localhost:8080/client", {
                name: this.state.newOrder.client.name,
                phoneNumber: this.state.newOrder.client.phoneNumber
            })
                .then( res => {
                    console.log(res)
                    order.clientId = res.data.id

                    let newState = this.state
                    newState.client_list.push(res.data)
                    this.setState(newState)

                    this.postAlg(order)
                })
        }
    }

    componentDidMount() {
        let newState = this.state
        axios.get("http://localhost:8080/dict/work_type").then(res => {
            newState.work_type_list = res.data
            axios.get("http://localhost:8080/client").then(res => {
                newState.client_list = res.data
                axios.get("http://localhost:8080/dict/accessory_type").then(res => {
                    newState.accessory_type_list = res.data
                    axios.get("http://localhost:8080/dict/clothing_type").then(res => {
                        newState.clothing_type_list = res.data
                        this.setState(newState)
                    })
                })
            })
        })
    }

    render() {
        return (
            <div>
                <h2 className="page-title">Новый алгоритм</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label>Название алгоритма</label>
                    <input required id="client-name-input" list="client" name="client" onChange={(e) => this.updateData(e)}/>
                    <datalist id="client">
                        {this.state.client_list.map(client => <option value={client.name} className="NewOrder-option">{client.phoneNumber}</option>)}
                    </datalist>
                    <label>Номер телефона клиента</label>
                    <input required id="phone-number-input" list="phoneNumber" name="phoneNumber" onChange={(e) => this.updateData(e)}/>
                    <datalist id="phoneNumber">
                        {this.state.client_list.map(client => <option value={client.phoneNumber} className="NewOrder-option">{client.name}</option>)}
                    </datalist>
                    <label>Одежда</label>
                    <input required id="clothing-type-input" list="clothing-type" name="clothing-type" onChange={(e) => this.updateData(e)}/>
                    <datalist id="clothing-type">
                        {this.state.clothing_type_list.map(work => <option value={work.name} className="NewOrder-option"/>)}
                    </datalist>
                    <label>Работа</label>
                    <input required id="work-type-input" list="work-type" name="work-type" onChange={(e) => this.updateData(e)}/>
                    <datalist id="work-type">
                        {this.state.work_type_list.map(work => <option value={work.name} className="NewOrder-option"/>)}
                    </datalist>
                    <label>Доп. фурнитура</label>
                    <input id="accessory-type-input" list="accessory-type" name="accessory-type-list" onChange={(e) => this.updateData(e)}/>
                    <datalist id="accessory-type">
                        {this.state.accessory_type_list.map(clothing => <option value={clothing.name} className="NewOrder-option"/>)}
                    </datalist>
                    <label>Сумма <input id="payment" type="number" required={true} onChange={(e) => this.updateData(e)}/></label>
                    <label>Предоплата <input id="prepayment" type="number"  onChange={(e) => this.updateData(e)}/></label>
                    <label>Дедлайн <input id="deadline" required type="date" onChange={(e) => this.updateData(e)}/></label>
                    <input type="submit" value="Создать заказ"/>
                </form>
            </div>
        );
    };
}