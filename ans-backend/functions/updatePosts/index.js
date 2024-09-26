const { db } = require("../../services/db");
const { sendError, sendResponse } = require("../../responses/responses");

// Updating a post that already exists
async function updatePost(user, postId, message, currentDate, timestamp) {
  try {
    await db.put({
      TableName: "anslagstavla",
      Item: {
        user: user,
        postId: postId,
        message: message,
        updatedAt: currentDate,
        timestamp: timestamp,
      },
    });
  } catch (error) {
    console.error(error);
    return sendError(400, error);
  }
}

// Creates the updated date: M/D-Year HH:MM
function createDate() {
  try {
    let date = new Date();
    // Aws uses another time zone so this is needed for Swedish time
    const options = {
      timeZone: "Europe/Stockholm",
      weekday: "short",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };

    // Formatted as a string for the user
    const currentDate = date.toLocaleString("sv-SE", options);
    // Formatted as a number for sorting
    const timestamp = date.getTime();

    return { currentDate, timestamp };
  } catch (error) {
    console.error(error);
    return sendError(500, "Error creating dates or timestamp");
  }
}

exports.handler = async (event) => {
  // Get user and postId from path
  const postId = event.pathParameters.postId;
  const user = event.pathParameters.user;

  // Get message from body
  const body = JSON.parse(event.body);
  const message = body.message;

  // If something is wrong with the imput.
  if (!user || !postId || !message) {
    sendError(400, "Wrong input on either path or body");
  }

  // Create the updated date and time
  const { currentDate, timestamp } = createDate();

  try {
    // Try to update the post with all the needed information and its new message. If error, send to catch
    await updatePost(user, postId, message, currentDate, timestamp);
    return sendResponse("Successfully updated the post");
  } catch (error) {
    console.error(error);
    return sendError(500, error);
  }
};
