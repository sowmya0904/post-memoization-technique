import React from 'react';
import { useSelector } from 'react-redux';
import { makeSelectPostById } from '../store/postsSlice';

const UserPost = ({ postId }) => {
  const selectPost = makeSelectPostById();
  const post = useSelector((state) => selectPost(state, postId));

  if (!post) {
    return null;
  }

  return (
    <div className="my-1 flex-row-left">
      <h4 id={post.title} className="px-2 font-sm font-bold">
        {post.title}
      </h4>
      <p>{post.body}</p>
    </div>
  );
};

export default UserPost;
