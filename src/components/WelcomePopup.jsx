import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function WelcomePopup({ userName }) {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate('/dulceria');
  };

  return (
    <div className="welcome-popup">
      <p>¡Bienvenido/a, {userName}!</p>
      <button onClick={handleAccept}>Aceptar</button>
    </div>
  );
}

WelcomePopup.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default WelcomePopup;
