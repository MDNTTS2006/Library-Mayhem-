const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

async function findFinishedGamePlayers(sinceDate) {
  const query = `
    SELECT 
      CAST(g.id AS text) AS session_code,
      g."updatedAt" AS ended_at,
      u.school_id,
      u.full_name AS nickname,
      COALESCE(r.score, 0) AS score,
      (st.status = 'completed') AS completed
    FROM games g
    JOIN seats st ON CAST(st.game AS text) = CAST(g.id AS text)
    JOIN users u ON u.user_id = st.user_id
    LEFT JOIN results r ON CAST(r.game_id AS text) = CAST(g.id AS text)
    WHERE g.status = 'finished'
      AND (:sinceDate IS NULL OR g."updatedAt" > CAST(:sinceDate AS timestamptz))
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
