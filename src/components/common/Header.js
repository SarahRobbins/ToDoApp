import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/toDos" activeClassName="active">View ToDos</Link>
    </nav>
  );
};

export default Header;
