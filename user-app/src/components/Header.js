import React, {useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import Order from "./Order";
import Swal from "sweetalert2";
import {DEFAULT_URL} from "../index";

window.Swal = Swal;

export default function Header({orders, onDelete, fullDelete}) {
    let [cartOpen, setCartOpen] = useState(false)
    let [payment, setPayment] = useState(true)

    function showOrders(orders) {
        return (<div><h2>Ваша корзина</h2>{orders.map(el => (
                <Order key={el.id} item={el} onDelete={onDelete}/>
            ))}                        <h2>Общая сумма заказа
                - {orders.reduce((acc, el) => acc + el.currentPrice, 0)}₽</h2>

                <div>
                    <a className='a'>Оплата:</a>
                    <button className="button" onClick={() => {
                        sendReqApple('applePay')
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


                        sendReqSbp('sbp')
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

    function sendReqApple(Str) {
        const token = sessionStorage.getItem("token");
        let req = new XMLHttpRequest();
        req.open("POST", `${DEFAULT_URL}/pay?type=${Str}`);
        req.onload = () => handleResponse(req.responseText);
        req.onerror = () => alert("Сервер временно недоступен");
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Authorization', token);
        req.send(JSON.stringify(orders));

    }

    function sendReqSbp(Str) {
        const token = sessionStorage.getItem("token");
        let req = new XMLHttpRequest();
        req.open("POST", `${DEFAULT_URL}/pay?type=${Str}`);
        req.onload = () => handleResponse2(req.responseText);
        req.onerror = () => alert("Сервер временно недоступен");
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Authorization', token);
        req.send(JSON.stringify(orders));
    }

    const handleResponse = (text) => {
            let response = JSON.parse(text);
            if (response.status === 200) {
                Swal.fire({
                    title: "Оплата по ApplePay проведена!",
                    text: "Спасибо большое за покупку, ждем вас снова!",
                    icon: "success",
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false
                }).then(function () {
                    fullDelete()
                    setCartOpen(cartOpen = !cartOpen)
                    window.location.reload();
                })
            } else {
                alert(`Возникла ошибка покупки - ${response.status}! Попробуйте еще раз.`);
                window.location.reload();
            }
        }
    ;

    const handleResponse2 = (text) => {
            let response = JSON.parse(text);
            if (response.status === 200) {
                Swal.fire({
                    title: "Оплата по Sbp проведена!",
                    text: "Спасибо большое за покупку, ждем вас снова!",
                    icon: "success",
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false
                })
                    .then(function () {
                        fullDelete()
                        setCartOpen(cartOpen = !cartOpen)
                        window.location.reload();
                    })
            } else {
                alert(`Возникла ошибка покупки - ${response.status}! Попробуйте еще раз.`);
                window.location.reload();
            }
        }
    ;
    return (
        <header className="head">
            <div>
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