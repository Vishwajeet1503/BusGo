const { sendWhatsAppMessage } = require("./whatsapp");
const { sendEmail } = require("./email");

async function sendBookingNotification({
  phone,
  email,
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
}) {
  const [whatsappResult, emailResult] = await Promise.all([
    sendWhatsAppMessage(
      phone,
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
    ),

    sendEmail(
      email,
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
    ),
  ]);

  return {
    whatsapp: whatsappResult,
    email: emailResult,
  };
}

module.exports = {
  sendBookingNotification,
};
