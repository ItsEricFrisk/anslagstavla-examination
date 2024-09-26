const { db } = require("../../services/db");
const { sendError, sendResponse } = require("../../responses/responses");

// Get posts from database
async function getPosts() {
  try {
    const { Items } = await db.scan({
      TableName: "anslagstavla",
    });
    return Items;
  } catch (error) {
    throw error;
  }
}

exports.handler = async (event) => {
  try {
    const posts = await getPosts();
    return sendResponse(posts);
  } catch (error) {
    console.error(error);
    return sendError(500, "Error fetching posts", error);
  }
};
