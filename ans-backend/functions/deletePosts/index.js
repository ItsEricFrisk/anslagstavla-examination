const { db } = require("../../services/db");
const { sendError, sendResponse } = require("../../responses/responses");

// Delete post with the given postId and user
async function deletePost(postId, user) {
  try {
    await db.delete({
      TableName: "anslagstavla",
      Key: {
        user: user,
        postId: postId,
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
}

// Retrieve the post from the database using postId and user
async function getPost(postId, user) {
  const { Item } = await db.get({
    TableName: "anslagstavla",
    Key: {
      user: user,
      postId: postId,
    },
  });

  return Item;
}

exports.handler = async (event) => {
  let user = event.pathParameters.user;
  let postId = event.pathParameters.postId;

  // Fetch the post using the provided postId and user
  let post = await getPost(postId, user);

  // Return error if post can't be found
  if (!post) {
    return sendError(404, "Can't find the post");
  }

  try {
    // Delete post
    await deletePost(postId, user);
    return sendResponse("Post deleted");
  } catch (error) {
    console.error(error);
    return sendError(500, "Error deleting post");
  }
};
