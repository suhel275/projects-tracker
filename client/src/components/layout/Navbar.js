import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProjectContext from '../../context/project/projectContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const projectContext = useContext(ProjectContext);

  const { isAuthenticated, logout, employee, loadEmployee } = authContext;
  const { clearProjects } = projectContext;

  useEffect(() => {
    loadEmployee();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearProjects();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {employee && employee.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav>
      <div className='nav-wrapper navbar'>
        <h5 className='left'>
          <i className={icon} /> {title}
        </h5>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Project Tracker',
  icon: 'fas fa-file-contract',
};

export default Navbar;
