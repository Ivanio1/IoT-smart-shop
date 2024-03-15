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
                setQrMessage(decodedText);
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

                let req = new XMLHttpRequest();
                req.open("GET", `http://localhost:8080/products?code=1456`, true);
                req.onload = () => handleResponse(req.responseText);
                req.onerror = () => alert("Сервер временно недоступен");
                req.setRequestHeader('Content-Type', 'application/json');
                req.send();

                setEnabled(false)
            };

            const handleResponse = (text) => {
                alert(text)
                let response = JSON.parse(text);
                    if (response.status === 200) {
                        onAdd(response.answer)
                    } else {
                        alert("Возникла ошибка сканирования! Попробуйте еще раз.");
                    }
                }
            ;

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
                <button className="start-button" onClick={() => setEnabled(!isEnabled)}>
                    {isEnabled ? " Закрыть сканирование " : "Сканировать qr-код"}
                </button>
            </div>
        </div>
    );


}

export default QRCode;