import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                {/* Brand & Description */}
                <div className="text-center md:text-left">
                    <Link to="/" className="text-2xl font-black uppercase tracking-tighter text-white">
                        Cinemax<span className="text-blue-600">.</span>
                    </Link>
                    <p className="mt-2 text-sm max-w-xs mx-auto md:mx-0">
                        La mejor experiencia cinematográfica con los estrenos más recientes y la dulcería más deliciosa.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex space-x-12">
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Navegación</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/dulceria" className="hover:text-white transition-colors">Dulcería</Link></li>
                            <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Soporte</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Ayuda</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                        </ul>
                    </div>
                </div>

                {/* Social & Legal */}
                <div className="text-center md:text-right">
                    <div className="flex justify-center md:justify-end space-x-4 mb-4">
                        {/* Simple placeholder social icons */}
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all cursor-pointer">
                            <span className="text-white text-xs">f</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-blue-400 hover:border-blue-300 transition-all cursor-pointer">
                            <span className="text-white text-xs">t</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-pink-600 hover:border-pink-500 transition-all cursor-pointer">
                            <span className="text-white text-xs">i</span>
                        </div>
                    </div>
                    <p className="text-xs">
                        &copy; {new Date().getFullYear()} Cinemax Inc. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
