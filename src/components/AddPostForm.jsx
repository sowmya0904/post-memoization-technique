import React, { useState, useCallback } from 'react';

const AddPostForm = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (title && body) {
      addPost({ title, body });
      setTitle('');
      setBody('');
    }
  }, [title, body, addPost]);

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="form-control my-1"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        className="form-control my-1"
      />
      <button type="submit" className="btn btn-primary">
        Add Post
      </button>
    </form>
  );
};

export default AddPostForm;
