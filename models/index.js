//Modified version of Module 14 code, sequelize associations so user posts, comments and user info can be associated with other models etc, foreign keys added
const Comment = require('./Comment');
const User = require('./User');
const Post = require('./Post');

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});
//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = {Post, User, Comment};