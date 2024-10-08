function sendResponse(message) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  };
}

function sendError(code, message) {
  return {
    statusCode: code,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  };
}

module.exports = { sendError, sendResponse };
