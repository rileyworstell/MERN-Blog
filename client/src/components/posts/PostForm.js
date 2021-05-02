import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost}) => {
    const [formData, setFormData] = useState({
      text: '',
      title: '',
      category: ''
    });
    const { text, title, category } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Write a Blog Post!</h3>
        </div>
        <form onSubmit={e => {
            e.preventDefault();
            addPost(formData);
        }} className="form my-1">
        <div className="form-group">
          <input type="text" placeholder="Title" name="title" value={title} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Category" name="category" value={category} onChange={e => onChange(e)} />
        </div>
          <textarea
            name="text"
            value={text}
            onChange={e => onChange(e)}
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm);
