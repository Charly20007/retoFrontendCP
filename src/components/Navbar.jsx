import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 shadow-lg">
            <ul className="flex justify-center space-x-8">
                <li>
                    <Link to="/" className="text-white text-lg font-semibold hover:text-gray-200 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-800">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/dulceria" className="text-white text-lg font-semibold hover:text-gray-200 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-800">
                        Dulcería
                    </Link>
                </li>
                <li>
                    <Link to="/login" className="text-white text-lg font-semibold hover:text-gray-200 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-800">
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
