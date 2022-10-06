//Very Similiar to Module 14 code 
const router = require('express').Router();
//add autherization for user
const withAuth = require('../../utils/auth');
const { User, Post, Comment, Vote } = require('../../models');

// get all users, Module 14 code 
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUser => res.json(dbUser))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_url', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts'
      }
    ]
  })
    .then(dbUser => {
      if (!dbUser) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//post route for user creation once a user logs in 
router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
    .then(dbUser => {
      req.session.save(() => {
        req.session.user_id = dbUser.id;
        req.session.username = dbUser.username;
        res.json(dbUser);
      });
    });
  });

//login route
  router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUser => {
      if (!dbUser) {
        res.status(400).json({ message: 'bruh? ' });
        return;
      }
  
      const validPassword = dbUser.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'bruh?' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUser.id;
        req.session.username = dbUser.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUser, message: 'Logged in' });
      });
    });
  });


  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end(); //204 code to ensure the user stays on the same page 
      });
    }
    else {
      res.status(404).end();
    }
  });

  // delete route
    router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({ message: 'bruh?' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//put route
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(dbUser => {
        if (!dbUser[0]) {
          res.status(404).json({ message: 'bruh?' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
module.exports = router;