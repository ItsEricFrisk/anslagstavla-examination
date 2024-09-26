import "./Posts.scss";
import { useStore } from "../../zustand/store";

export default function Posts({ openModal }) {
  // Get functions from zustand
  const setUser = useStore((state) => state.setUser);
  const setPostId = useStore((state) => state.setPostId);
  const posts = useStore((state) => state.posts);

  // Handle modal and send user + postId to Zustand
  const handleClick = (post) => {
    setUser(post.user);
    setPostId(post.postId);
    openModal();
  };

  return (
    <div className="postContainer">
      {posts.map((post) => (
        <div
          className="post"
          key={post.postId}
          onClick={() => handleClick(post)}
        >
          <h3 className="post__date">{post.createdAt || post.updatedAt}</h3>
          <p className="post__message">{post.message}</p>
          <h4 className="post__user">
            <span>-</span> {post.user}
          </h4>
        </div>
      ))}
    </div>
  );
}
