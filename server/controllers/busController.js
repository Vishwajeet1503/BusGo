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
        bs.travel_date,
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
        AND bs.travel_date = $3

      ORDER BY bs.base_price ASC
      `,
      [from.trim(), to.trim(), date],
    );

    res.json({
      success: true,
      count: result.rows.length,
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
