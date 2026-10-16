const resultsRepository = require('../repositories/results.repository');

async function getFinishedGames(sinceDate) {
  return await resultsRepository.findFinishedGamePlayers(sinceDate);
}

module.exports = {
  getFinishedGames
};
