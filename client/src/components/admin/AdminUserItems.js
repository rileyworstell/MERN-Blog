import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getProfiles } from '../../actions/profile';

const AdminUserItems = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    return ( loading ? (<Spinner />) : (
        <div>
        { console.log(profiles) }
        { profiles.length > 0 && profiles.map((profileData) => (
            <div>
                <div>{profileData.user.name}</div>
                { profileData.user.adminLevel && (
                    <div key={profileData.user._id}>{profileData.user.adminLevel}</div>
                )}
            </div>
        ))}
            
        </div>
    )
    )
}

AdminUserItems.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps, { getProfiles })(AdminUserItems);
