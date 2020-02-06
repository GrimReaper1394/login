// authentification of user accounts
// creation of tokens
// hashing of passwords

const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../sequelize');

const bodyParser = require("body-parser")

router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({extended:false}))



//@route                GET api/auth
// @description         get logged in user
// @access              private
router.get('/', auth, async (req,res) => {
    try { 
        const user = await User.find({
        where: {
            id
        }
    }).select('-password')
        res.json(user);
    } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error')
    }
})


//@route                POST api/auth
// @description         auth user and get token
// @access              public
router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'A password is required').exists()
],
async(req,res) => {
    const errors = validationResult(req);
    //checking to see if errors are empty
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({ 
            where:{
                email
            }
         });

        if(!user){
            return res.status(404).json({msg : 'Invalid Email'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(404).json({msg: 'Invalid Password'})
        }

        const payload = {
            user: {
                id: user.id
            }
        }


        // jwt secret needs to be hidden
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;