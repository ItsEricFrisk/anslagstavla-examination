import { useState } from "react";
import "./EditPost.scss";
import { useStore } from "../../../zustand/store";

export default function EditPost({ closeModal }) {
  // Get functions from zustand
  const user = useStore((state) => state.user);
  const postId = useStore((state) => state.postId);
  const setNeedsFetch = useStore((state) => state.setNeedsFetch);

  // Store the updated message in local state
  const [updatedMessage, setUpdatedMessage] = useState("");

  // Update post
  async function updatePost() {
    try {
      // Send PUT request to update the post
      const respose = await fetch(
        `https://judf3dlo16.execute-api.eu-north-1.amazonaws.com/posts/${user}/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // Message
          body: JSON.stringify({ message: updatedMessage }),
        }
      );
      // Check if request was unsuccessful
      if (!respose.ok) {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Delete post
  async function deletePost() {
    try {
      // Send DELETE request to delete the post
      const response = await fetch(
        `https://judf3dlo16.execute-api.eu-north-1.amazonaws.com/posts/${user}/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Check if request was unsuccessful
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Handle delete and close modal
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost();
      setNeedsFetch(true);
      closeModal();
    } else {
      return;
    }
  };

  // Handle update and close modal
  const handleUpdate = async () => {
    if (updatedMessage === "") {
      return alert("Add a new message in order to save");
    }
    await updatePost();
    setNeedsFetch(true);
    closeModal();
  };

  return (
    <div className="updateContainer">
      <textarea
        className="updateContainer__message"
        onChange={(e) => setUpdatedMessage(e.target.value)}
        placeholder="New message"
        maxLength={"200"}
        autoFocus
        required
      />
      <h4 className="updateContainer__user">
        <span>-</span> {user}
      </h4>
      <div className="btnContainer">
        <button className="btnContainer__deleteBtn" onClick={handleDelete}>
          Delete
        </button>
        <button className="btnContainer__updateBtn" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}
