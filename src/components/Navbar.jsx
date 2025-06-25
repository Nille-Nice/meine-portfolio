import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const links = [
    { id: 1, name: 'home', to: 'home' },
    { id: 2, name: 'about', to: 'about' },
    { id: 3, name: 'tech stack', to: 'tech-stack' },
    { id: 4, name: 'soft skills', to: 'soft-skills' },
    { id: 5, name: 'contact', to: 'contact' },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav-bar z-[100]">
      <div>
        <img src="/images/n-logo.png" alt="Nils Narten Logo" className="h-12 w-auto ml-2 opacity-75 " />
      </div>

      <ul className="hidden md:flex font-mono">
        {links.map(({ id, name, to }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
          >
            <Link to={to} smooth duration={500}>{name}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500 font-mono">
          {links.map(({ id, name, to }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} to={to} smooth duration={500}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 