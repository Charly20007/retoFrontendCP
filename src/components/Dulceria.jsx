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
            // Si el producto ya está seleccionado, lo eliminamos de la lista de seleccionados
            const nuevosSeleccionados = [...seleccionados];
            nuevosSeleccionados.splice(index, 1);
            setSeleccionados(nuevosSeleccionados);
        } else {
            // Si el producto no está seleccionado, lo agregamos a la lista de seleccionados
            setSeleccionados([...seleccionados, producto]);
        }
    };

    const calcularTotal = () => {
        // Calculamos el total sumando los precios de los productos seleccionados
        const totalPagar = seleccionados.reduce((total, producto) => total + parseFloat(producto.price), 0); // Convertimos el precio a número
        setTotal(totalPagar);
    };

    const handleContinuar = () => {
        // Aquí podrías navegar a la pantalla de Pago
        navigate('/pago', { state: { total: total } });    
    };

    return (
        <div>
            <h2>Dulcería</h2>
            <ul>
                {Array.isArray(productos) && productos.map((producto, index) => (
                    <li key={index}>
                        <input type="checkbox" checked={seleccionados.some((p) => p.name === producto.name)} onChange={() => handleSeleccion(producto)} />
                        <span>{producto.name}</span>
                        <span>{producto.description}</span>
                        <span>{producto.price}</span>
                    </li>
                ))}
            </ul>
            <p>Total a pagar: {total}</p>
            <button onClick={handleContinuar}>Continuar</button>
        </div>
    );
}

export default Dulceria;

