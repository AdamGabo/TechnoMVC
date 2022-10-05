//Module 14 example
const router = require('express').Router();

const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes.js');


router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);


module.exports = router;
