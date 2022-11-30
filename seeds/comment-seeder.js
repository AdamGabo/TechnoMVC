const { Comment } = require('../models');

const cDATA = [
    {
        user_id: 7,
        post_id: 7,
        comment_text: "Shaken not stirred 007"
    }]

    const commentSeeder = () => Comment.bulkCreate(cDATA);

    module.exports = commentSeeder;