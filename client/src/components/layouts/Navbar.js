import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


export const Navbar = ({ auth: { isAuthenticated, loading }, logout, user }) => {
  const authLinks = (
    <ul>
    { !loading && user && user.adminLevel === 'admin' && (
      <li><Link to="/admin">Admin</Link></li>
    )}
    <li><Link to="/profiles">Bloggers</Link></li>
    <li><Link to="/posts">Posts</Link></li>
    <li><Link to="/create-post">Create Post</Link></li>
    <li><Link to="/dashboard">
    <i className="fas fa-user"></i>{' '}
    <span className="hide-sm">Dashboard</span></Link></li>
      <li><a onClick={logout} href="#!">
      <i className="fas fa-sign-out-alt"></i>{' '}
      <span className="hide-sm">Logout</span></a></li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Bloggers</Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> Blog</Link>
        </h1>
        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
      </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
