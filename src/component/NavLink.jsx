import React from 'react';

const NavLink = ({ name, path }) => (
  <a
    href={path}
    className="block py-1 lg:py-0 hover:underline"
  >
    {name}
  </a>
);

export default NavLink;
