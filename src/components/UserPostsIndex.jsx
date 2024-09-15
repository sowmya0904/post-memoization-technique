import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserPostsList from './UserPostsList';
import AddPostForm from './AddPostForm';
import { deletePost, updatePost } from '../store/postsSlice';

const UserPostsIndex = ({ signedIn, onAddPost }) => {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.posts.posts);
  const [editingPostId, setEditingPostId] = React.useState(null);

  const handleDeletePost = (id) => {
    dispatch(deletePost({ id }));  // Pass the id directly
  };

  const handleEditPost = (id) => {
    setEditingPostId(id);
  };

  const handleUpdatePost = (id, updatedPost) => {
    dispatch(updatePost({ id, ...updatedPost }));
    setEditingPostId(null);
  };

  return (
    <div className="my-1 p-2 box">
      <div className="m-1 py-1">
        <h2 className="heading-md">Your Posts</h2>
        <p className="m-1 p-1">{signedIn ? 'Signed in' : 'Signed out'}</p>
        <AddPostForm addPost={onAddPost} /> {/* Pass the onAddPost to AddPostForm */}
        {userPosts && (
          <div className="px-1">
            <UserPostsList
              userPosts={userPosts}
              deletePost={handleDeletePost}
              editPost={handleEditPost}
              editingPostId={editingPostId}
              updatePost={handleUpdatePost}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPostsIndex;
