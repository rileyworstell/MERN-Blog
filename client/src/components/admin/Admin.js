import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layouts/Spinner';
import { connect } from 'react-redux';

const Admin = ({ isAuthenticated, loading, user }) => {
    return ( !loading && user && user.adminLevel === 'admin' ? (
        <div>
            You are an Admin
        </div>
    ) : (<h1>Hey, stop that. You are not an admin :P </h1>)
)
}

Admin.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.array
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Admin);
