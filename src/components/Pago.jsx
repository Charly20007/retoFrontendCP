import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Pago() {
    const location = useLocation();

    const total = location.state.total;
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        email: '',
        name: '',
        documentType: '',
        documentNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseComplete = await axios.post('https://cp-staging.onrender.com/v1/complete', {
                name: formData.name,
                mail: formData.email,
                dni: formData.documentNumber,
                operation_date: Date.now(),
                transactionId: 'ID_TRANSACCION' 
            });

            if (responseComplete.data.resul_code === "0") {
                alert('¡Compra exitosa!');
                navigate('/');
            } else {
                alert('Ha ocurrido un error al procesar la compra.');
            }
        } catch (error) {
            console.error('Error al procesar la compra:', error);
            alert('Ha ocurrido un error al procesar la compra.');
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Proceso de Pago</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">Número de tarjeta:</label>
                    <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="expirationDate" className="block text-gray-700 text-sm font-bold mb-2">Fecha de expiración:</label>
                    <input type="text" id="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">CVV:</label>
                    <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="documentType" className="block text-gray-700 text-sm font-bold mb-2">Tipo de documento:</label>
                    <input type="text" id="documentType" name="documentType" value={formData.documentType} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="documentNumber" className="block text-gray-700 text-sm font-bold mb-2">Número de documento:</label>
                    <input type="text" id="documentNumber" name="documentNumber" value={formData.documentNumber} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Pagar ${total.toFixed(2)}</button>
            </form>
        </div>
    );
}

Pago.propTypes = {
    location: PropTypes.object.isRequired
};

export default Pago;
