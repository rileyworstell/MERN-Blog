import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getProfiles } from '../../actions/profile';
import { setApproved, setAdmin } from '../../actions/users';

const AdminUserItems = ({ getProfiles, setApproved, setAdmin, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    const [formData, setFormData] = useState({
        adminLevel: ''
      });
      const { adminLevel } = formData;
  
      const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
      const approveUser = (userId) => {
          // send update request to update adminLevel to approved
        setApproved(userId);
        getProfiles();
      };

      const adminUser = (userId) => {
          // send update request to update adminLevel to admin
          setAdmin(userId);
          getProfiles();
      }

    return ( loading ? (<Spinner />) : (
        <div>
        { profiles.length > 0 && profiles.map((profileData) => (
            <div className="admin-form">
                <div className="pd-left-sm">{profileData.user.name}:</div>
                { profileData.user.adminLevel && (
                    <Fragment>
                    <div className="pd-left-sm" key={profileData.user._id}>{profileData.user.adminLevel}</div>
                    <div><input onClick={e => approveUser(e.target.name)} type="submit" className="btn btn-dark my-1" name={profileData.user._id} value="Approve" /></div>
                    <div><input onClick={e => adminUser(e.target.name)} type="submit" className="btn btn-dark my-1" name={profileData.user._id} value="Admin" /></div>
                    <div><input type="submit" className="btn btn-dark my-1" name={profileData.user._id} value="Delete" /></div>
                    </Fragment>
                )}
            </div>
        ))}     
        </div>
        )
    )
}

AdminUserItems.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    setAdmin: PropTypes.func.isRequired,
    setApproved: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps, { getProfiles, setApproved, setAdmin })(AdminUserItems);
