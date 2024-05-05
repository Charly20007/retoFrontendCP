import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function Pago() {
    const location = useLocation();

    const total = location.state.total;

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
            const responsePago = await axios.post('URL_DE_PAGO_DE_PAYU', {
                apiKey: 'TU_API_KEY_DE_PAYU',
                apiLogin: 'TU_LOGIN_DE_PAYU',
                creditCardNumber: formData.cardNumber,
                creditCardExpirationDate: formData.expirationDate,
                creditCardSecurityCode: formData.cvv,
                payerEmail: formData.email,
                payerFullName: formData.name,
                payerDNI: formData.documentNumber,
                payerDocumentType: formData.documentType,
                value: total
            });

            const operationDate = responsePago.data.transactionResponse.operationDate;
            const transactionId = responsePago.data.transactionResponse.transactionId;

            const responseComplete = await axios.post('https://cp-staging.onrender.com/v1/complete', {
                name: formData.name,
                mail: formData.email,
                dni: formData.documentNumber,
                operation_date: operationDate,
                transactionId: transactionId
            });

            console.log('Respuesta del servicio complete:', responseComplete.data);

            // Aquí puedes mostrar el pop-up de "compra correcta" o una pantalla de mensaje de compra exitosa
        } catch (error) {
            console.error('Error al procesar el pago con PayU:', error);
        }
    };

    return (
        <div>
            <h2>Pago</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cardNumber">Número de tarjeta:</label>
                    <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="expirationDate">Fecha de expiración:</label>
                    <input type="text" id="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="documentType">Tipo de documento:</label>
                    <input type="text" id="documentType" name="documentType" value={formData.documentType} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="documentNumber">Número de documento:</label>
                    <input type="text" id="documentNumber" name="documentNumber" value={formData.documentNumber} onChange={handleChange} />
                </div>
                <button type="submit">Pagar ${total}</button>
            </form>
        </div>
    );
}

Pago.propTypes = {
    location: PropTypes.object.isRequired // Asegúrate de tener esta prop en tu PropTypes
};

export default Pago;

