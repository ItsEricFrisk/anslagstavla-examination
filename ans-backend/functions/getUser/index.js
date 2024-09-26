const { db } = require("../../services/db");
const { sendError, sendResponse } = require("../../responses/responses");

// Get posts from specific user
async function getUser(user) {
  try {
    const { Items } = await db.query({
      TableName: "anslagstavla",
      KeyConditionExpression: "#username = :user",
      ExpressionAttributeNames: {
        "#username": "user",
      },
      ExpressionAttributeValues: {
        ":user": user,
      },
    });
    return Items;
  } catch (error) {
    console.error(error);
    return sendError(404, "Can't find user");
  }
}

exports.handler = async (event) => {
  let user = event.pathParameters.username;

  if (!user) {
    return sendError(404, "Error getting user from path");
  }

  try {
    const posts = await getUser(user);

    return sendResponse(posts);
  } catch (error) {
    console.error(error);
    return sendError(500, "Error fetching posts", error);
  }
};
