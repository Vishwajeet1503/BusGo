const pool = require("../db/database");

const searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    if (!from || !to || !date) {
      return res.status(400).json({
        success: false,
        message: "From, to and date are required",
      });
    }

    const selectedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid travel date",
      });
    }

    const dayOfWeek = selectedDate.getDay();

    const result = await pool.query(
      `
      SELECT
        bs.id AS schedule_id,
        bo.id AS operator_id,
        bo.name AS operator_name,
        bo.rating AS operator_rating,
        b.id AS bus_id,
        b.bus_number,
        b.bus_type,
        b.total_seats,
        r.source,
        r.destination,
        bs.departure_time,
        bs.arrival_time,
        bs.base_price
      FROM bus_schedules bs

      JOIN buses b
        ON bs.bus_id = b.id

      JOIN bus_operators bo
        ON b.operator_id = bo.id

      JOIN routes r
        ON bs.route_id = r.id

      WHERE LOWER(r.source) = LOWER($1)
        AND LOWER(r.destination) = LOWER($2)
        AND bs.day_of_week = $3

      ORDER BY bs.base_price ASC
      `,
      [from.trim(), to.trim(), dayOfWeek],
    );

    res.json({
      success: true,
      count: result.rows.length,
      travel_date: date,
      day_of_week: dayOfWeek,
      buses: result.rows,
    });
  } catch (error) {
    console.error("Search buses error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to search buses",
    });
  }
};

module.exports = {
  searchBuses,
};
