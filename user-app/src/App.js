import './App.css';
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QRCode from "./components/QRCode";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            items: []
        }
        this.addToOrder = this.addToOrder.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)

    }

    render() {
        return (
            <div className="App">
                <Header orders={this.state.orders} onDelete={this.deleteOrder}/>
                <QRCode onAdd={this.addToOrder}/>
                <Footer/>
            </div>
        );
    }

    deleteOrder(id) {
        this.setState({orders: this.state.orders.filter(el => el.id !== id)})
    }

    addToOrder(item) {
        let isInArray = false
        this.state.orders.forEach(el => {
            if(el.id === item.id)
                isInArray = true
        })
        if(!isInArray){
            this.setState({orders: [...this.state.orders, item]})
        }else{
            alert("Такой товар уже есть в корзине.")
        }
    }
}

export default App;
