'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      { user_id: 1, school_id: 'S001', full_name: 'Player One', email: 'p1@example.com', role: 'student', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, school_id: 'S002', full_name: 'Player Two', email: 'p2@example.com', role: 'student', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, school_id: 'S003', full_name: 'Player Three', email: 'p3@example.com', role: 'student', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('games', [
      { id: 100001, status: 'finished', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('seats', [
      { id: 1, game: 100001, user_id: 1, status: 'completed', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, game: 100001, user_id: 2, status: 'completed', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, game: 100001, user_id: 3, status: 'completed', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('results', [
      { id: 1, game_id: 100001, score: 100, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('results', null, {});
    await queryInterface.bulkDelete('seats', null, {});
    await queryInterface.bulkDelete('games', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
