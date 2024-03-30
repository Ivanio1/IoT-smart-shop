import React, {useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import Order from "./Order";
import Swal from "sweetalert2";
import {DEFAULT_URL} from "../index";

window.Swal = Swal;

export default function Header({orders, onDelete, fullDelete}) {
    let [cartOpen, setCartOpen] = useState(false)
    let [payment, setPayment] = useState(false)

    function showOrders(orders) {
        return (<div><h2>Ваша корзина</h2>{orders.map(el => (
                <Order key={el.id} item={el} onDelete={onDelete}/>
            ))}                        <h2>Общая сумма заказа - ${orders.reduce((acc, el) => acc + el.price, 0)}</h2>

                <div>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className='a'>Оплата:</a>
                    <button className="button" onClick={() => {
                        sendReq('applePay')
                        if (payment == true) {
                            Swal.fire({
                                title: "Оплата по ApplePay проведена!",
                                text: "Спасибо большое за покупку, ждем вас снова!",
                                icon: "success",
                                timer: 2000,
                                showCancelButton: false,
                                showConfirmButton: false
                            })
                            fullDelete()
                            setCartOpen(cartOpen = !cartOpen)
                        }

                    }

                    }>ApplePay
                    </button>
                    <button className="button" onClick={async () => {

                        await Swal.fire({
                            title: "Ожидание оплаты!",
                            icon: "info",
                            html: "<img src='/sbp.png' style='width:150px; height: 150px' alt=''>",
                            timer: 7000,
                            showCancelButton: false,
                            showConfirmButton: false
                        })


                        sendReq('sbp')
                        if (payment == true) {
                            Swal.fire({
                                title: "Оплата по Sbp проведена!",
                                text: "Спасибо большое за покупку, ждем вас снова!",
                                icon: "success",
                                timer: 2000,
                                showCancelButton: false,
                                showConfirmButton: false
                            })
                            fullDelete()
                            setCartOpen(cartOpen = !cartOpen)
                        }
                    }
                    }>СБП
                    </button>
                </div>
            </div>

        )
    }

    function showNothing() {
        return (<div className='empty'>
            Товаров нет!
        </div>);
    }

    function sendReq(Str) {
        let req = new XMLHttpRequest();
        req.open("POST", `${DEFAULT_URL}/pay?type=${Str}`, true);
        req.onload = () => handleResponse(req.responseText);
        req.onerror = () => alert("Сервер временно недоступен");
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(orders));
    }

    const handleResponse = (text) => {
            let response = JSON.parse(text);
            setPayment(true)
            if (response.status === 200) {
            } else {
                setPayment(false)
                alert(`Возникла ошибка покупки - ${response.status}! Попробуйте еще раз.`);
            }
        }
    ;

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