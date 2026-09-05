const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(
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
  try {
    const info = await transporter.sendMail({
      from: `"BusGo Notifications" <${process.env.EMAIL_USER}>`,

      to,

      subject: `BusGo Booking Confirmed - ${bookingId}`,

      text: `
BUSGO - BOOKING CONFIRMED
=========================

Hello ${customerName},

Your BusGo bus booking has been confirmed successfully.

BOOKING DETAILS
---------------
Booking ID       : ${bookingId}
Bus Operator     : ${busOperator}
Bus Number       : ${busNumber}

Route            : ${source} → ${destination}

Boarding Point   : ${boardingPoint}
Dropping Point   : ${droppingPoint}

Travel Date      : ${travelDate}
Departure Time   : ${departureTime}
Arrival Time     : ${arrivalTime}

Seat Number(s)   : ${seatNumbers.join(", ")}

Have a safe and comfortable journey!

Thank you for choosing BusGo.

Regards,
BusGo Team
      `.trim(),
    });

    console.log("Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email error:", error.message);

    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = { sendEmail };
