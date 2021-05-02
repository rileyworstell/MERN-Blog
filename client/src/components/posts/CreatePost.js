import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import PostForm from './PostForm';

const CreatePost = ({ isAuthenticated, loading, post: { posts }}) => {

    return ( loading ? <Spinner /> : (
        <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
        </p>
        { isAuthenticated && (
            <PostForm />
        )}
        </Fragment>
    )
    )
}

CreatePost.propTypes = {
    getPosts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    post: state.post
});

export default connect(mapStateToProps, {})(CreatePost);
