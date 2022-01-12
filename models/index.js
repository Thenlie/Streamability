const User = require('./User');
const Queue = require('./Queue');

User.hasMany(Queue, {
    foreignKey: 'user_id'
})

Queue.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Queue }