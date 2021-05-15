import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

const Post = ({ getPost, user, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);
    return ( loading || post === null ? <Spinner /> : <Fragment>
    <Link to='/posts' className="btn">Back To Posts</Link>
        <PostItem post={post} showActions={false} />
        {user && (user.adminLevel === 'admin' || user.adminLevel === 'Approved') && (
            <div>
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
        </div>
        </div>
        ) }
    </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post,
    user: state.auth.user,
});

export default connect(mapStateToProps, { getPost })(Post);
