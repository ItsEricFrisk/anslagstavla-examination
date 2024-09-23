const { db } = require("../../services/db");
const { sendError, sendResponse } = require("../../responses/responses");
const { v4: uuidv4 } = require("uuid");

// Takes input from the arguments and creates a new post
async function createPost(body, messageId, currentDate) {
  try {
    await db.put({
      TableName: "ans-messages",
      Item: {
        messageId: messageId,
        message: body.message,
        user: body.user,
        createdAt: currentDate,
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
    // Aws uses another time zone so this is needed
    date.setHours(date.getHours() + 2);
    const currentDate =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();

    return currentDate;
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
  const currentDate = createDate();
  // Create id
  const messageId = uuidv4();

  try {
    // Runs the function to create the post
    await createPost(body, messageId, currentDate);
    // Return success
    return sendResponse("Post added");
  } catch (error) {
    // Return error
    return sendError(500, { error });
  }
};
