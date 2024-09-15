import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LatestPost from './LatestPost';
import UserPostsIndex from './UserPostsIndex';
import { fetchPosts, fetchUsers, selectSortedPosts, selectUsers, addPost } from '../store/postsSlice';

const Blog = ({ signedIn }) => {
  const dispatch = useDispatch();
  
  const sortedPosts = useSelector(selectSortedPosts);
  const users = useSelector(selectUsers);

  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    if (sortedPosts.length === 0) {
      dispatch(fetchPosts());
    }
    if (users.length === 0) {
      dispatch(fetchUsers());
    }

    const id = setInterval(() => setLocalTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(id);
  }, [dispatch, sortedPosts.length, users.length]);

  const handleAddPost = useCallback((newPost) => {
    dispatch(addPost(newPost));
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="m-1 p-1 text-center heading-lg">Memoization in React</h1>
      <div className="m-1 p-2">
        <div className="my-1 p-2 box">
          <div className="latest-posts-top">
            <h3 className="heading-md my-1 p-1">Latest posts</h3>
            <div className="p-1">{localTime}</div>
          </div>
          <div className="my-1">
            <button className="btn btn-primary" onClick={() => dispatch(fetchPosts())}>
              Get Latest Post
            </button>
          </div>
          <hr className="hr my-2" />
          <LatestPost signedIn={signedIn} post={sortedPosts[0]} />
        </div>
        <UserPostsIndex signedIn={signedIn} onAddPost={handleAddPost} />
        {signedIn && (
          <div className="my-1 p-2 box">
            <h2 className="heading-md">Fetched Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
