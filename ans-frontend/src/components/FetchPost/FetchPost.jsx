import { useState, useEffect } from "react";
import { useStore } from "../../zustand/store";
import "./FetchPost.scss";

export default function FetchPost() {
  // Functions from Zustand
  const setPosts = useStore((state) => state.setPosts);
  const needsFetch = useStore((state) => state.needsFetch);
  const setNeedsFetch = useStore((state) => state.setNeedsFetch);

  // Store filter and username in local state
  const [filter, setFilter] = useState("new");
  const [username, setUsername] = useState("");

  // Run one time
  useEffect(() => {
    fetchPosts();
  }, [needsFetch]);

  // Fetch posts
  async function fetchPosts() {
    try {
      // Fetch all posts
      let url = "https://judf3dlo16.execute-api.eu-north-1.amazonaws.com/posts";

      // If specific user is requested
      if (username) {
        url = `https://judf3dlo16.execute-api.eu-north-1.amazonaws.com/user/${username}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong fetching posts");
      }

      let data = await response.json();
      let posts = data.message;

      // Sort posts based on filter
      if (filter === "old") {
        posts.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
      } else if (filter === "new") {
        posts.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
      }

      // Update zustand with the new posts
      setPosts(posts);
      setNeedsFetch(false);
    } catch (error) {
      console.error(error);
    }
  }

  // Handle username input
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  // Handle "ENTER" on input
  const handleUsernameKeyEnter = async (event) => {
    if (event.key === "Enter") {
      setNeedsFetch(true);
      await fetchPosts();
      setUsername("");
    }
  };

  // Handle filter select
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setNeedsFetch(true);
  };

  // Handle button to fetch posts
  const handleClick = async () => {
    setNeedsFetch(true);
    await fetchPosts();
    setUsername("");
  };

  return (
    <div className="filterContainer">
      <div className="sortWrapper">
        <select
          name="filter"
          className="sortWrapper__select"
          onChange={handleFilterChange}
        >
          <option value="new">Newest first</option>
          <option value="old">Oldest first</option>
        </select>
      </div>
      <div className="userContainer">
        <input
          type="text"
          className="userContainer__userInput"
          placeholder="Search user"
          onChange={handleUsername}
          onKeyDown={handleUsernameKeyEnter}
        />
        <button className="userContainer__filterBtn" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
          </svg>
        </button>
      </div>
    </div>
  );
}
