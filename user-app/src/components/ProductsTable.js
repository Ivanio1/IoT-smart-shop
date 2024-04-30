import React, {useState, useEffect} from 'react';
import {DEFAULT_URL} from "../index";

const ProductsTable = ({onAdd}) => {
    const [products, setProducts] = useState([]);
    const [samples, setSamples] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSample, setSelectedSample] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});

    useEffect(() => {
        const fetchSamples = async () => {
            const response = await fetch(`${DEFAULT_URL}/products/getall`);
            const data1 = await response.json();
            setSamples(data1.answer);
        };

        fetchSamples();
    }, []);

    const handleProductClick = async (sampleId) => {
        const selectedSampleData = samples.find(sample => sample.id === sampleId);
        setSelectedSample(selectedSampleData);
        const response = await fetch(`${DEFAULT_URL}/products/get-by-title?title=${selectedSampleData.title}`);
        const data = await response.json();
        setProducts(data.answer);

        if (isOpen1) {
            setIsOpen(false)
        }
        setIsOpen1(!isOpen1)

    };

    const addToCart = (product) => {

        onAdd(product)
    };


    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});
        const sortedSamples = [...samples].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setSamples(sortedSamples);
    };

    const getFreshness = (expirationPoints) => {
        if (expirationPoints >= 70) {
            return "Свежая"
        } else if (expirationPoints >= 40) {
            return "Средняя"
        } else {
            return "Срок годности подходит к концу"
        }

    }

    return (
        <div className="product-table">
            <div className="product-table1">

                <table className="products">
                    <thead>
                    <tr>
                        <th onClick={() => requestSort('title')}>Название типа товара</th>
                        <th onClick={() => requestSort('initialPrice')}>Начальная цена</th>
                    </tr>
                    </thead>
                    <tbody>
                    {samples.map(sample => (
                        <tr key={sample.id} onClick={() => handleProductClick(sample.id)}>
                            <td>{sample.title}</td>
                            <td>{sample.initialPrice} ₽</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedSample && isOpen1 && (
                <div className="product-table">
                    {/*<p><strong>Тип:</strong> {selectedSample.productType}</p>*/}
                    {/*<p><strong>Свежесть:</strong> {getFreshness(selectedSample.expirationPoints)}</p>*/}
                    {/*<button className="start-button2" onClick={() => addToCart()}>Добавить в корзину</button>*/}

                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product.id}>
                                <h3>{product.name}</h3>
                                <p><strong>Текущая цена:</strong> {product.currentPrice} ₽</p>
                                {product.expirationPoints >= 70 ? (
                                    <button className="start-button2" onClick={() => addToCart(product)}>Свежий</button>

                                ) : product.expirationPoints >= 40 ? (
                                    <button className="start-button2"
                                            onClick={() => addToCart(product)}>Средний</button>
                                ) : (
                                    <button className="start-button2" onClick={() => addToCart(product)}>Не
                                        свежий</button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Продуктов такого типа нет</p>
                    )}
                </div>
            )}
            <br/> <br/>
        </div>

    );
};

export default ProductsTable;
