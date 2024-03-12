import React, {useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import Order from "./Order";

export default function Header({orders, onDelete}) {
    let [cartOpen, setCartOpen] = useState(false)

    function showOrders(orders) {
        return (<div><h2>Ваша корзина</h2>{orders.map(el => (
            <Order key={el.id} item={el} onDelete={onDelete}/>
        ))}                        <h2>Общая сумма заказа - ${orders.reduce((acc, el) => acc + el.price, 0)}</h2>
        </div>)
    }

    function showNothing() {
        return (<div className='empty'>
            Товаров нет!
        </div>);
    }

    return (
        <header className="head">
            <div>
                <br/>
                <span className="logo">Умный магазин</span>

                <FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)}
                                className={`shop-cart-button ${cartOpen && 'active'}`}/>
                {cartOpen && (
                    <div className='shop-cart'>

                        {
                            orders.length > 0 ? showOrders(orders) : showNothing()
                        }

                    </div>
                )}
            </div>
        </header>)
}