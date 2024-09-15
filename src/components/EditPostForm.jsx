import React, { useState, useCallback } from 'react';

const EditPostForm = ({ post, updatePost }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    updatePost(post.id, { title, body });
  }, [post.id, title, body, updatePost]);

  return (
    <form onSubmit={handleSubmit} className="edit-post-form">
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
        Save
      </button>
    </form>
  );
};

export default EditPostForm;
