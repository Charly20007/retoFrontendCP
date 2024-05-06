import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import WelcomePopup from './WelcomePopup';


function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        setUserData({ displayName, email });
        showWelcomePopup(displayName);
      })
      .catch((error) => {
        console.error('Error en inicio de sesión con Google:', error);
      });
  };

  const handleGuestLogin = () => {
    navigate('/dulceria');
  };

  const showWelcomePopup = (userName) => {
    const confirmation = window.confirm(`¡Bienvenido/a, ${userName}! ¿Deseas continuar a la pantalla de Dulcería?`);
    if (confirmation) {
      navigate('/dulceria');
    }
  };

  return (
     <>
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Iniciar Sesión</h2>
        <div className="bg-gray-200 flex items-center justify-center py-3 mb-4 rounded-md">
          <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt=""/>
          <button onClick={handleGoogleLogin} className="text-gray-800 font-medium">Iniciar sesión con Google</button>
        </div>
        <div className="bg-gray-200 flex items-center justify-center py-3 mb-4 rounded-md">
          <button onClick={handleGuestLogin} className="text-gray-800 font-medium">Continuar como Invitado</button>
        </div>
        {userData && <WelcomePopup userName={userData.displayName} />}
      </div>
    </div>
     </>
  );
}


export default Login;
