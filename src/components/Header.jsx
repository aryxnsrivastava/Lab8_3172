import {Link} from "react-router-dom";

function Header(){
  return(
    <nav className="bg-black text-white h-24 flex items-center">
      <div className="container mx-auto flex justify-between w-full px-8">
        <div className="flex w-full justify-between text-center">
          <Link className="w-1/5 text-xl font-bold py-6 text-center bg-black hover:bg-gray-700 transition duration-300" to="/">
            Home
          </Link>
          <Link className="w-1/5 text-xl font-bold py-6 text-center bg-black hover:bg-gray-700 transition duration-300" to="/about">
            About
          </Link>
          <Link className="w-1/5 text-xl font-bold py-6 text-center bg-black hover:bg-gray-700 transition duration-300" to="/projects">
            Experience
          </Link>
          <Link className="w-1/5 text-xl font-bold py-6 text-center bg-black hover:bg-gray-700 transition duration-300" to="/contact">
            Contact
          </Link>
          <Link className="w-1/5 text-xl font-bold py-6 text-center bg-black hover:bg-gray-700 transition duration-300" to="/messages">
            Messages
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Header;