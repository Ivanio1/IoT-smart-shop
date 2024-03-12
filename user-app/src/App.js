import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import QRCode from "./components/QRCode";

function App() {
    return (
        <div className="App">
            <Header/>
            <QRCode/>
            <Footer/>
        </div>
    );
}

export default App;
