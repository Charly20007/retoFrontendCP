import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dulceria() {
    const navigate = useNavigate(); // Obtiene la función de navegación

    const [productos, setProductos] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchProductos();
    }, []);

    useEffect(() => {
        calcularTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seleccionados]);

    const fetchProductos = async () => {
        try {
            const response = await fetch('https://cp-staging.onrender.com/v1/candystore');
            if (response.ok) {
                const data = await response.json();
                setProductos(data.items); // Actualizamos para usar el arreglo de items
            } else {
                console.error('Error al obtener los productos:', response.status);
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleSeleccion = (producto) => {
        const index = seleccionados.findIndex((p) => p.name === producto.name);
        if (index !== -1) {
            const nuevosSeleccionados = [...seleccionados];
            nuevosSeleccionados.splice(index, 1);
            setSeleccionados(nuevosSeleccionados);
        } else {
            setSeleccionados([...seleccionados, producto]);
        }
    };

    const calcularTotal = () => {
        const totalPagar = seleccionados.reduce((total, producto) => total + parseFloat(producto.price), 0); // Convertimos el precio a número
        setTotal(totalPagar);
    };

    const handleContinuar = () => {
        navigate('/pago', { state: { total: total } });    
    };

    return (
        <div className="p-5">
            <h2 className="bg-blue-500 text-white text-2xl font-bold text-center mb-4 py-2 rounded">
                Dulcería
            </h2>            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.isArray(productos) && productos.map((producto, index) => (
                    <div 
                        key={index} 
                        className="card bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-blue-50 transition duration-300 ease-in-out p-4"
                    >
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={seleccionados.some((p) => p.name === producto.name)}
                                onChange={() => handleSeleccion(producto)}
                                className="form-checkbox h-5 w-5"
                            />
                            <span className="text-lg font-semibold">{producto.name}</span>
                        </label>
                        <p className="text-gray-600">{producto.description}</p>
                        <p className="text-gray-800 font-bold">${producto.price}</p>
                    </div>
                ))}
            </div>
            <div className="text-right mt-4">
                <p className="text-lg font-bold">Total a pagar: ${total.toFixed(2)}</p>
                <button 
                    onClick={handleContinuar} 
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}

export default Dulceria;

