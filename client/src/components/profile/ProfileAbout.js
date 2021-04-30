import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: { bio, website, location, user: { name }} }) => {
    return (
        <div className="profile-about bg-light p-2">
        { bio && (
            <Fragment>
            <h2 className="text-primary">{name.trim().split(' ')[0]}s Bio</h2>
          <p>
            {bio}
          </p>
          <p>
            {website}
          </p>
          <div className="line"></div>
            </Fragment>
        )}
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout;
