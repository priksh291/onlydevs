import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex text-white justify-around relative">
      <div className="font-bold text-5xl cursor-pointer">OnlyDevs</div>
      {/* <div>
        <ul className="flex gap-5 text-xl">
          <li className="hover:underline cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline cursor-pointer">
            <Link to='/search'>
            Search
            </Link>
          </li>
          <li className="hover:underline cursor-pointer">
            <Link to= '/Aboutus'>About Us</Link>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Navbar;
