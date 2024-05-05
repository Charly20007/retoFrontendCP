import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [premieres, setPremieres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://cp-staging.onrender.com/v1/premieres')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPremieres(data.premieres || []);  // Aseguramos que siempre sea un array
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
            <div style={{ flex: 1 }}>
                {premieres.map((premiere, index) => (
                    <img
                        key={index}
                        src={premiere.image}
                        alt={premiere.description}
                        style={{ width: '100%', cursor: 'pointer' }}
                        onClick={() => navigate('/login')}
                    />
                ))}
            </div>
            <div style={{ flex: 1 }}>
                {premieres.map((premiere, index) => (
                    <p key={index}>{premiere.description}</p>
                ))}
            </div>
        </div>
    );
}

export default Home;
