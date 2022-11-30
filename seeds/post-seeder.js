const { Post } = require('../models');

const pDATA = [
    {
        title: "007",
        post_content: "Shaken Not Stirred Eh?",
        user_id: 7
    }]

const postSeeder = () => Post.bulkCreate(pDATA);
module.exports = postSeeder;