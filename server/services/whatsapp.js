const axios = require("axios");

async function sendWhatsAppMessage(
  to,
  customerName,
  bookingId,
  travelDate,
  busOperator,
  busNumber,
  source,
  destination,
  boardingPoint,
  droppingPoint,
  departureTime,
  arrivalTime,
  seatNumbers,
) {
  const url = `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  try {
    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to,
        type: "template",

        template: {
          name: "jaspers_market_order_confirmation_v1",
          language: {
            code: "en_US",
          },

          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: customerName },
                { type: "text", text: bookingId },
                { type: "text", text: travelDate },
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("WhatsApp template message sent:", response.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("WhatsApp error:", error.response?.data || error.message);

    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
}

module.exports = { sendWhatsAppMessage };
