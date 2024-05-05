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
        <>
        <div className="p-10">
            <div className="flex">
                {premieres.map((premiere, index) => (   
                    // eslint-disable-next-line react/jsx-key
                    <div className="bg-white w-1/3 shadow rounded-lg overflow-hidden m-3">
                        <img
                            key={index}
                            src={premiere.image}
                            alt={premiere.description}
                            className="object-cover h-80 w-full cursor-pointer"
                            onClick={() => navigate('/login')}
                        />
                        <div className="p-6">
                            <span className="block text-slate-400 font-semibold text-sm">{premiere.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        </>
    );
}

export default Home;
