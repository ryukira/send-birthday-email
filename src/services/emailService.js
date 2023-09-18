const axios = require("axios");

const emailServiceUrl = "https://email-service.digitalenvision.com.au"; // Replace with your actual email service URL

async function sendEmail(email, message) {
  try {
    const response = await axios.post(`${emailServiceUrl}/send-email`, {
      email,
      message,
    });

    // Check if the email service returned a success status code
    if (response.status === 200) {
      console.log("Email sent successfully");
    } else {
      console.error("Email service returned an error:", response.data);
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
    // You can handle retries or other error handling logic here
  }
}

module.exports = {
  sendEmail,
};
