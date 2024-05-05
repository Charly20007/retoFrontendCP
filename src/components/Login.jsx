import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import WelcomePopup from './WelcomePopup';


function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email } = user;
        setUserData({ displayName, email });
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

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
    <div>
      <h2>Iniciar Sesión</h2>
      <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
      <button onClick={handleGuestLogin}>Continuar como Invitado</button>
      {userData && (
        <WelcomePopup userName={userData.displayName} />
      )}
    </div>
  );
}


export default Login;
