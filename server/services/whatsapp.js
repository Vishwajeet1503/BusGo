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
          name: "busgo_booking_confirmation",
          language: {
            code: "en",
          },

          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  parameter_name: "customer_name",
                  text: customerName,
                },
                {
                  type: "text",
                  parameter_name: "booking_id",
                  text: bookingId,
                },
                {
                  type: "text",
                  parameter_name: "bus_operator",
                  text: busOperator,
                },
                {
                  type: "text",
                  parameter_name: "bus_number",
                  text: busNumber,
                },
                {
                  type: "text",
                  parameter_name: "source",
                  text: source,
                },
                {
                  type: "text",
                  parameter_name: "destination",
                  text: destination,
                },
                {
                  type: "text",
                  parameter_name: "boarding_point",
                  text: boardingPoint,
                },
                {
                  type: "text",
                  parameter_name: "dropping_point",
                  text: droppingPoint,
                },
                {
                  type: "text",
                  parameter_name: "travel_date",
                  text: travelDate,
                },
                {
                  type: "text",
                  parameter_name: "departure_time",
                  text: departureTime,
                },
                {
                  type: "text",
                  parameter_name: "arrival_time",
                  text: arrivalTime,
                },
                {
                  type: "text",
                  parameter_name: "seat_numbers",
                  text: seatNumbers.join(", "),
                },
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

    console.log("WhatsApp booking template sent:", response.data);

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
