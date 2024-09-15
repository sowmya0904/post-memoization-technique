import React from 'react';
import UserPost from './UserPost';
import EditPostForm from './EditPostForm';

const UserPostsList = ({ userPosts, deletePost, editPost, editingPostId, updatePost }) => {
  return (
    <div className="px-1">
      {userPosts.map(post => (
        <div key={post.id} className="my-1 box flex-row">
          {editingPostId === post.id ? (
            <EditPostForm post={post} updatePost={updatePost} />
          ) : (
            <UserPost postId={post.id} />
          )}
          <button className="btn btn-danger" onClick={() => deletePost(post.id)}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={() => editPost(post.id)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserPostsList;
