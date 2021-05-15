import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const ProfileItem = ({ profile: { user: { _id, name }, location, profileImage}}) => {
    return (
        <div className="profile bg-light">
            <div>
                <h2>{name}</h2>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`profile/${_id}`} className="btn btn-primary" >View Profile</Link>
            </div>
            { profileImage && (
                <div><img className="profile-image" src={profileImage} width="275" height="250" /></div>
            )}

        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;
