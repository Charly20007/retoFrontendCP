import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Cartelera', path: '/cartelera' },
        { name: 'Dulcería', path: '/dulceria' },
        { name: 'Promociones', path: '/promos' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Left: Logo */}
                <div className="flex items-center flex-shrink-0">
                    <Link to="/" className="text-xl font-black uppercase tracking-tighter text-white hover:text-blue-500 transition-colors">
                        Cinemax<span className="text-blue-600">.</span>
                    </Link>
                </div>

                {/* Center: Search Bar (Hidden on mobile) */}
                <div className="hidden md:flex flex-grow max-w-md mx-8">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Buscar películas, dulces..."
                            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right: Nav Links & Icons */}
                <div className="flex items-center space-x-6">
                    <ul className="hidden lg:flex items-center space-x-6">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <li key={link.path} className="relative flex items-center py-2">
                                    <Link
                                        to={link.path}
                                        className={`text-xs font-bold uppercase tracking-widest transition-all duration-200 ${isActive
                                                ? 'text-white'
                                                : 'text-zinc-500 hover:text-white'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-4 border-l border-zinc-800 pl-6">
                        {/* Search Icon (Mobile Only) */}
                        <button className="md:hidden text-zinc-400 hover:text-white transition-colors">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Cart */}
                        <Link to="/cart" className="relative group text-zinc-400 hover:text-white transition-colors">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-zinc-950 group-hover:bg-blue-500 transition-colors">
                                0
                            </span>
                        </Link>

                        {/* Profile/Login */}
                        <Link to="/login" className="text-zinc-400 hover:text-white transition-colors">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
