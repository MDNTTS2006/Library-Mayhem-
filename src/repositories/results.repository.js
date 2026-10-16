const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

async function findFinishedGamePlayers(sinceDate) {
  const query = `
    SELECT 
      g.id AS session_code,
      g."updatedAt" AS ended_at,
      u.school_id,
      u.full_name AS nickname,
      COALESCE(r.score, 0) AS score,
      (st.status = 'completed') AS completed
    FROM games g
    JOIN seats st ON CAST(st.game AS integer) = g.id
    JOIN users u ON u.user_id = st.user_id
    LEFT JOIN results r ON CAST(r.game_id AS integer) = g.id
    WHERE g.status = 'finished'
      AND (CAST(:sinceDate AS timestamptz) IS NULL OR g."updatedAt" > :sinceDate)
    ORDER BY g."updatedAt" DESC, r.score DESC;
  `;

  return await sequelize.query(query, {
    replacements: { sinceDate: sinceDate || null },
    type: QueryTypes.SELECT
  });
}

module.exports = {
  findFinishedGamePlayers
};
