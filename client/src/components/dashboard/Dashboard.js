import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import DashboardActions from './DashboardActions';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';

const Dashboard = ({ deleteAccount, getCurrentProfile, auth: { user }, profile: { profile, loading }, imgTag='blah' }) => {

    useEffect(() => {
        getCurrentProfile();

    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> : <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
        <i className="fas fa-user"></i> Welcome { user && user.name }
    </p>
    {profile !== null ? 
    (<Fragment>
        <DashboardActions />
        <div className="my-2">
            
            <div>{ profile && profile.website }</div>
            <div>{ profile && profile.location }</div>
            <div>{ profile && profile.bio }</div><br />
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus"> Delete My Account</i>
            </button>

        
        </div>
    </Fragment>) : 
    (<Fragment>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
        </Link>
    </Fragment>)}
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);


