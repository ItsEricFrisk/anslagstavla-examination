const { db } = require("../../services/db");
const { sendError, sendResponse } = require("../../responses/responses");
const { nanoid } = require("nanoid");

// Takes input from the arguments and creates a new post
async function createPost(body, currentDate, timestamp, postId) {
  try {
    await db.put({
      TableName: "anslagstavla",
      Item: {
        postId: postId,
        user: body.user,
        message: body.message,
        createdAt: currentDate,
        timestamp: timestamp,
      },
    });
  } catch (error) {
    console.error("Error in createPost:", error);
    return sendError(400, error);
  }
}

// Creates the date: M/D-Year HH:MM
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
  }
}

exports.handler = async (event) => {
  let body = JSON.parse(event.body);
  const { message, user } = body;

  // If message or user has wrong input
  if (!message || !user) {
    return sendError(400, "Wrong input on either message or user");
  }

  // Create todays date and time
  const { currentDate, timestamp } = createDate();

  // Create id
  const postId = nanoid(8);

  try {
    // Runs the function to create the post
    await createPost(body, currentDate, timestamp, postId);
    // Return success
    return sendResponse("Post added");
  } catch (error) {
    // Return error
    return sendError(500, { error });
  }
};
