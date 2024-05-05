import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function WelcomePopup({ userName }) {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate('/dulceria');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-2xl text-gray-800 font-semibold mb-4">¡Bienvenido/a, {userName}!</p>
        <button onClick={handleAccept} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Aceptar</button>
      </div>
    </div>
  );
}

WelcomePopup.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default WelcomePopup;
