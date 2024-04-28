import React, {useState, useEffect} from 'react';
import {DEFAULT_URL} from "../index";

const ProductsTable = ({onAdd}) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${DEFAULT_URL}/products/getall`);
            const data1 = await response.json();
            setProducts(data1.answer);
        };

        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        const selectedProductData = products.find(product => product.id === productId);
        setSelectedProduct(selectedProductData);
        if (isOpen1) {
            setIsOpen(false)
        }
        setIsOpen1(!isOpen1)

    };

    const addToCart = async (freshness) => {
        const productWithFreshness = {...selectedProduct, freshness}
        onAdd(productWithFreshness)
    };


    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});
        const sortedProducts = [...products].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setProducts(sortedProducts);
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
                        <th onClick={() => requestSort('id')}>ID</th>
                        <th onClick={() => requestSort('title')}>Название товара</th>
                        <th onClick={() => requestSort('currentPrice')}>Текущая цена</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id} onClick={() => handleProductClick(product.id)}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.currentPrice}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedProduct && isOpen1 && (
                <div className="product-table">
                    <h3>{selectedProduct.name}</h3>
                    <p><strong>Начальная цена:</strong> {selectedProduct.initialPrice} ₽</p>
                    <p><strong>Тип:</strong> {selectedProduct.productType}</p>
                    <p><strong>Свежесть:</strong> {getFreshness(selectedProduct.expirationPoints)}</p>
                    <button className="start-button2" onClick={() => addToCart()}>Добавить в корзину</button>
                    <br/>
                </div>
            )}
            <br/> <br/>
        </div>

    );
};

export default ProductsTable;
