// utils/sortPosts.js
const sortPosts = (posts) => {
  return [...posts].sort((a, b) => b.id - a.id);
};

export default sortPosts;
