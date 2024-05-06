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
                setPremieres(data.premieres || []); 
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
         <div className="flex justify-center p-4 md:p-10">
            <div className="flex flex-wrap justify-center">
                {premieres.map((premiere, index) => (   
                    <div key={index} className="bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 shadow rounded-lg overflow-hidden m-3">
                        <img
                            src={premiere.image}
                            alt={premiere.description}
                            className="object-cover h-56 sm:h-64 lg:h-72 xl:h-80 w-full cursor-pointer"
                            onClick={() => navigate('/login')}
                        />
                        <div className="p-4">
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
