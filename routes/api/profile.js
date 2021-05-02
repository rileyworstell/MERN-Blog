const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const multer = require('multer');
const upload = multer({
    dest: 'images',
    storage: multer.memoryStorage(),
    });

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private 
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);
        if(!profile) { return res.status(400).json({ msg: 'There is no profile for this user' }) };

        res.json(profile);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private 
router.post('/', auth, async (req, res) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

    const { website, location, bio, youtube, facebook, twitter, instagram, linkedin } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    try {
        let profile = await Profile.findOne({ user: req.user.id  });
        if (profile) {
            // update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true });
            return res.json(profile);
        }
        // create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }



    // res.send('hello');
});

// @route    POST api/upload
// @desc     upload image
// @access   Private 
router.post('/upload', [auth, upload.single('upload')], async (req, res) => {
    try{
        res.send();
    } catch(err) {
        res.send(err, 'error -- riley');
    }

});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'adminLevel']);
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']);
        if(!profile) { return res.status(400).json({ msg: 'Profile not found' }) }
        res.json(profile);
    } catch(err) {
        console.error(err.message, 'some kind of error');
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/profile/user/:user_id/upload
// @desc     PUT profile by user ID and upload image
// @access   Public
router.put('/user/:user_id/upload', [auth,  upload.single('upload')], async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']);
        // profile not found
        if(!profile) { 
            return res.status(400).json({ msg: 'Profile not found' });
        } else {
            profile.image = await req.file.buffer;
            console.log('profile image', profile.image);
            // console.log('hello', req.file);
            // console.log(upload);
            profile.save()
            return res.status(201).json(profile);
        }
                return res.json(profile);
    } catch(err) {
        console.error(err.message, 'some kind of error');
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error we here');
    }
});

// @route    Get api/profile/user/:user_id/upload
// @desc     Get image for user
// @access   Public
router.get('/user/:user_id/image', auth , async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']);
        // profile not found
        if(!profile) { 
            return res.status(400).json({ msg: 'Profile not found' });
        } else {
            res.set('Content-Type', 'image/png')
            res.status(202).send(profile.image);
        }
    } catch(err) {
        console.error(err.message, 'some kind of error');
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error we here');
    }
});

// @route    DELETE api/profile
// @desc     Delete profile, user, & posts
// @access   Private
router.delete('/', auth,  async (req, res) => {
    try {
        // TODO - REMOVE users posts
        // remove user posts
        await Post.deleteMany({ user: req.user.id });
        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User Deleted' });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

    const { title, company, location, from, to, current, description } = req.body;
    const newExp = {
        title, company, location, from, to, current, description // title is the same as title: title
    };
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);

        await profile.save();
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save()
        res.json(profile);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = {
        school, degree, fieldofstudy, from, to, current, description // title is the same as title: title
    };
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);

        await profile.save();
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save()
        res.json(profile);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {
                'user-agent': 'node.js'
            }
        };
        request(options, (error, response, body) => {
            if(error) console.error(error);
            if(response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github profile found'});
            }
            res.json(JSON.parse(body));
        })
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
