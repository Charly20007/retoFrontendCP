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
     <>
       <div className="flex items-center justify-center w-full lg:p-12">
         <div className="flex items-center xl:p-10">
           <div className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
             <h2 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Iniciar Sesión</h2>
             <div className="bg-gray-300 flex items-center justify-center w-full py-4 mb-3  text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
               <img className="h-5 mr-2"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    alt=""/>
               <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
             </div>
             <div className="bg-gray-300 py-4 flex items-center justify-center w-full  text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
               <button onClick={handleGuestLogin}>Continuar como Invitado</button>
             </div>
             {userData &&  (
                 <WelcomePopup userName={userData.displayName} />
             )}
           </div>

         </div>
       </div>
     </>
  );
}


export default Login;
