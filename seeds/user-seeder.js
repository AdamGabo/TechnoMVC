const { User } = require('../models');

const uDATA = [
    {
        username: "JAMES BOND",
        twitter: "007",
        github: "007HUB",
        email: "joemama@yourmum",
        password: "yeet"
    }]

    const userSeeder = () => User.bulkCreate(uDATA);

module.exports = userSeeder;