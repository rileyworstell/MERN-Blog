const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator/check');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route get api/users/approve
// @desc 
// access Private
router.get('/approve/:user_id', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.user_id });
        console.log(user, 'user');
        user.adminLevel = 'Approved';
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', [ // validations below
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Plase enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body; // destructure the request

    try {
        let user = await User.findOne({ email }); // look if the user already exists

        if(user) {
            return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
        }

        user = new User({ // create an instance of User
            name, email, password
        });

        const salt = await bcrypt.genSalt(10); // salting for encryption
        user.password = await bcrypt.hash(password, salt); // hash the password and save it
        await user.save(); // Saves User :)

        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
