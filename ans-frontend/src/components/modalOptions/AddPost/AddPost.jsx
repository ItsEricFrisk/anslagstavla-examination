import { useState } from "react";
import { useStore } from "../../../zustand/store";
import "./AddPost.scss";

export default function AddPost({ closeModal }) {
  // Store the updated message and user in local state
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [username, setUsername] = useState("");

  // Function from Zustand
  const setNeedsFetch = useStore((state) => state.setNeedsFetch);

  // Post a new post
  async function addNewPost() {
    try {
      // Send POST request to add a new post
      const response = await fetch(
        "https://judf3dlo16.execute-api.eu-north-1.amazonaws.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: updatedMessage, user: username }),
        }
      );
      // Check if request was unsuccessful
      if (!response.ok) {
        throw new Error("Failed to add post");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //   Add post and close modal
  const handleAddPost = async () => {
    if (updatedMessage === "" || username === "") {
      return alert("Both fields must be filled in in order to create a post");
    }
    await addNewPost();
    setNeedsFetch(true);
    closeModal();
  };

  return (
    <div className="addContainer">
      <textarea
        className="addContainer__message"
        // Update local state (message)
        onChange={(e) => setUpdatedMessage(e.target.value)}
        maxLength={"200"}
        autoFocus
        required
        placeholder="Message"
      />
      <input
        type="text"
        className="addContainer__user"
        placeholder="Username"
        // Update local state (user)
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <button className="addContainer__addBtn" onClick={handleAddPost}>
        Add post
      </button>
    </div>
  );
}
