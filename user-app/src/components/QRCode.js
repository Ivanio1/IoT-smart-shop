import {Html5Qrcode} from "html5-qrcode";
import React, {useState, useEffect} from "react";
import Swal from 'sweetalert2';
import {DEFAULT_URL} from "../index";

window.Swal = Swal;

function QRCode({onAdd}) {

    const [isEnabled, setEnabled] = useState(false);
    const [qrMessage, setQrMessage] = useState("");

    useEffect(() => {
            const config = {fps: 10, qrbox: {width: 200, height: 200}};

            const html5QrCode = new Html5Qrcode("qrCodeContainer");

            const qrScanerStop = () => {
                if (html5QrCode && html5QrCode.isScanning) {
                    html5QrCode
                        .stop()
                        .then((ignore) => console.log("Scaner stop"))
                        .catch((err) => console.log("Scaner error"));
                }
            };

            const qrCodeSuccess = (decodedText) => {
                const token = sessionStorage.getItem("token");
                setQrMessage(decodedText);
                let req = new XMLHttpRequest();
                req.open("GET", `${DEFAULT_URL}/samples/title/consume?title=${qrMessage}`, true);
                req.onload = () => handleResponse(req);
                req.onerror = () => alert("Сервер временно недоступен");
                req.setRequestHeader('Content-Type', 'application/json');
                req.setRequestHeader('Authorization', token);
                req.send();
                setEnabled(false)


            };

            const handleResponse = async (text) => {
                if (text.status !== 404) {
                    let response = JSON.parse(text.responseText);

                    onAdd(response)

                    const token = sessionStorage.getItem("token");
                    const fetchOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    };
                    await fetch(`${DEFAULT_URL}/product/add-item-request?productId=${response.id}`,fetchOptions);


                    Swal.fire({
                        title: "Товар успешно добавлен в корзину!",
                        text: "Продолжайте свои покупки",
                        icon: "success",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false
                    }).then(
                        setEnabled(true)
                    )
                } else {
                    alert("Возникла ошибка сканирования! Попробуйте еще раз.");
                }
            };

            if (isEnabled) {
                html5QrCode.start({facingMode: "environment"}, config, qrCodeSuccess);
                setQrMessage("");
            } else {
                qrScanerStop();
            }

            return () => {
                qrScanerStop();
            };
        }, [isEnabled, onAdd]
    )
    ;

    return (
        <div className="scaner">
            <div><h1>Отсканируйте qr-код необходимого товара, чтобы добавить его в корзину!</h1></div>
            <div id="qrCodeContainer"/>
            <br/><br/>
            <div>
                <br/>
                <button className="start-button" onClick={() => setEnabled(!isEnabled)}>
                    {isEnabled ? " Закрыть сканирование " : "Сканировать qr-код"}
                </button>
            </div>
        </div>
    );


}

export default QRCode;