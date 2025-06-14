import { Link } from 'react-router-dom';

// Updated Navbar with dark theme improvements
export default function Navbar() {
  return (
    <nav className="bg-blur fixed w-full top-0 z-50  shadow-md">
      <div className="container mx-auto px-11 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            MyBlog
          </span>
        </Link>
        <div className="flex space-x-6">
          <Link 
            to="/" 
            className="text-black hover:text-slate-500 transition-colors px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          
        </div>
      </div>
    </nav>
  );
}