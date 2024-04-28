import React, {useState, useEffect} from 'react';
import {DEFAULT_URL} from "../index";

const ProductsTable = ({onAdd}) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedFreshness, setSelectedFreshness] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${DEFAULT_URL}/products/getall`);
            const data1 = await response.json();
            //Симуляция данных
            // const data = [
            //     {id: 1, name: 'Хлеб бородинский', ingridients: 'Мука, вода, соль, дрожжи'},
            //     {id: 2, name: 'Молоко', ingridients: 'Молоко'},
            // ];

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


    const handleSelectFreshness = async () => {
        // const response = await fetch(`${DEFAULT_URL}/products/${selectedProduct.id}/freshness`);
        // const data = await response.json();

        // Симуляция данных
        const freshnessData = ['Свежий', 'Очень свежий', 'Сверхсвежий'];

        setSelectedFreshness(freshnessData);
        setIsOpen(!isOpen)
    };
    function addToCart(){

    }


    return (
        <div className="product-table">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th> Название товара</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id} onClick={() => handleProductClick(product.id)}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedProduct && isOpen1 && (
                <div className="product-table">
                    <h3>{selectedProduct.name}</h3>
                    <p><strong>Состав:</strong> {selectedProduct.ingridients}</p>
                    <button className="start-button" onClick={handleSelectFreshness}>Выбрать свежесть</button>
                    <br/>
                </div>

            )}

            {selectedFreshness && isOpen && (
                <div className="product-table">
                    <h4>Список возможных свежестей:</h4>
                    <ul>
                        {selectedFreshness.map((freshness, index) => (
                            <li key={index}>{freshness}     &emsp;

                            </li>

                        ))}
                    </ul>
                </div>
            )}

            <br/> <br/>
        </div>

    );
};

export default ProductsTable;
